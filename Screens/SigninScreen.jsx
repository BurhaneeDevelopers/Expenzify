import React from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  ActivityIndicator,
  Platform,
} from "react-native";

import { useState } from "react";
import { Eye, EyeSlash } from "iconsax-react-native";
import { signInUserApi } from "../Appwrite/Services";
import { account } from "../Appwrite/appwrite";
import { useAuth } from "../context/useAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignInScreen = ({ navigation }) => {
  // Active State for inputs
  const [activeInput, setActiveInput] = useState(0);

  const handleInputFocus = (inputNumber) => {
    setActiveInput(inputNumber);
  };

  const handleInputBlur = () => {
    setActiveInput(null);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    // Toggles Password Visibility and Invisibility
    setIsPasswordVisible(!isPasswordVisible);
  };

  const [toast, setToast] = useState(false);

  const navigateAfterAccountCreated = () => {
    setToast(true);

    // Wait for 1-2 seconds and then navigate
    setTimeout(() => {
      setToast(false);
      // Navigate to the next screen (e.g., EmailConfirmation)
      navigation.replace("Authenticate");
    }, 1000); // Adjust the timeout as needed
  };

  const { setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const SignIn = async () => {
    try {
      setError("");
      setLoading(true);
      const res = await signInUserApi(email, password);
      const userDetails = await account.get();
      const sessionId = await account.getSession("current");
      setUser(userDetails);
      AsyncStorage.setItem("sessionId", JSON.stringify(sessionId));
      AsyncStorage.setItem("email", JSON.stringify(email));
      AsyncStorage.setItem("pass", JSON.stringify(password));
      navigateAfterAccountCreated();
      setLoading(false);
    } catch (error) {
      setLoading(false);

      setError(error.message);
      setLoading(false);
      console.log("Error during sign-in:", error);
      console.log(error.code);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 32 : 0}
      className="w-screen h-screen flex-col justify-center items-center mx-auto px-5 bg-white"
    >
      {toast === true && (
        <Text
          className="text-[#fff] p-2 rounded-lg px-10 absolute top-10 bg-indigo-600 right-5 z-50"
          // style={GlobalStyles.fontBold}
        >
          Yayy! SignIn Successful!
        </Text>
      )}

      {loading ? (
        <View className="p-2 rounded-lg px-2 items-start justify-start absolute top-10 bg-indigo-600 right-5 z-50">
          <ActivityIndicator color="#fff" size={24} />
        </View>
      ) : null}

      <View
        // refreshControl={
        //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        // }
        className="w-full"
      >
        {/* LOGO  */}
        <Image
          source={require("../assets/ai-logo.png")}
          className="w-72 h-44 mx-auto"
        />

        <View className="my-auto items-center justify-center">
          <View className="items-center space-y-2">
            <Text
              className="text-indigo-600 text-4xl text-center font-bold"
              //   style={GlobalStyles.fontBold}
            >
              Sign in!
            </Text>
            <Text
              className="text-indigo-600 text-center w-72 items-center text-sm"
              //   style={GlobalStyles.fontRegular}
            >
              Sign in to <Text className="font-semibold">Taheri Expenzify</Text>
            </Text>
          </View>

          {/* Sign Up And Sign In Switches  */}
          {/* <AuthSwitch navigation={navigation} route={route} /> */}

          <View className="my-5 w-full space-y-3">
            {/* Email Input */}
            <TextInput
              onChangeText={(text) => setEmail(text)}
              value={email}
              placeholder="Enter Your Email..."
              placeholderTextColor={`${activeInput === 1 ? "#fff" : "#c5c5c5"}`}
              className={`border border-indigo-600 w-full p-3 px-5 rounded-full text-black place text-sm ${
                activeInput === 1 ? "bg-indigo-600 text-[#f9f9f9]" : null
              }`}
              onBlur={handleInputBlur}
              onFocus={() => handleInputFocus(1)}
              //   style={GlobalStyles.fontMedium}
            />

            {/* Password Input */}
            <View className="items-end justify-center">
              <TextInput
                onChangeText={(text) => setPassword(text)}
                value={password}
                secureTextEntry={!isPasswordVisible ? true : false}
                placeholder="Enter Your Password..."
                placeholderTextColor={`${
                  activeInput === 2 ? "#fff" : "#c5c5c5"
                }`}
                className={`border border-indigo-600 w-full p-3 px-5 rounded-full text-black place text-sm ${
                  activeInput === 2 ? "bg-indigo-600 text-[#f9f9f9]" : null
                }`}
                onBlur={handleInputBlur}
                onFocus={() => handleInputFocus(2)}
                // style={GlobalStyles.fontMedium}
              />

              <View className="absolute px-5">
                <Pressable onPress={togglePasswordVisibility}>
                  {isPasswordVisible ? (
                    <Eye size="28" color="#f9f9f9" />
                  ) : (
                    <EyeSlash size="28" color="#f9f9f9" />
                  )}
                </Pressable>
              </View>
            </View>
            {/* 
            <View className="flex-row justify-between items-center text-sm mb-5">
              <Text className="text-[#f9f9f9]">Forgot Password?</Text>
              <Text></Text>
            </View> */}

            {error && (
              <>
                <Text
                  className="text-[#c22121] text-center mt-3 text-base"
                  //   style={GlobalStyles.fontSemiBold}
                >
                  {error}
                </Text>
              </>
            )}

            <Pressable
              // className={`w-full p-3 rounded-lg items-center bg-indigo-600 ${
              //   error ? "bg-indigo-600/70" : ""
              // }`}
              className="w-full p-3 rounded-full items-center bg-indigo-600 active:bg-indigo-700"
              onPress={SignIn}
            >
              <Text className="text-[#f9f9f9] text-lg">Sign In</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignInScreen;
