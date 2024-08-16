import { View, Text, Pressable } from "react-native";
import React from "react";
import { LogoutCurve } from "iconsax-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { account } from "../Appwrite/appwrite";

const LogOut = ({ navigation }) => {
  const logOut = async () => {
    try {
      await AsyncStorage.removeItem("sessionId");
      await AsyncStorage.removeItem("email");
      await AsyncStorage.removeItem("pass");
      await AsyncStorage.clear();

      await account.deleteSession("current");
      navigation.replace("UnAuthenticate");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Pressable className="absolute right-5 top-5" onPress={logOut}>
      <LogoutCurve className="text-[#ff0000]" size={24} />
    </Pressable>
  );
};

export default LogOut;
