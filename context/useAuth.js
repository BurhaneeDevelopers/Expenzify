import { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { account } from "../Appwrite/appwrite";
import { signInUserApi } from "../Appwrite/Services";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheckUserStatus = async () => {
    try {
      const session = AsyncStorage.getItem("sessionId");
      if (session) {
        const userData = await account.get();
        setUser(userData);
      }

      if (!session) {
        const email = AsyncStorage.getItem("email");
        const pass = AsyncStorage.getItem("pass");

        const res = await signInUserApi(email, pass);
        const userDetails = await account.get();
        const sessionId = await account.getSession("current");
        AsyncStorage.setItem("sessionId", JSON.stringify(sessionId));
        setUser(userDetails);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        loading,
        handleCheckUserStatus,
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
