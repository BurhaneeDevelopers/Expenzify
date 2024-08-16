import { View, Text } from "react-native";
import React, { useState, useRef, useEffect } from "react";

let toastRef = null;

const navigateAfterAccountCreated = (navigation, redirectTo) => {
  if (toastRef && toastRef.current) {
    toastRef.current(true);

    setTimeout(() => {
      if (toastRef && toastRef.current) {
        toastRef.current(false);
      }
      // Navigate to the next screen (e.g., EmailConfirmation)
      navigation.replace(redirectTo);
    }, 1000); // Adjust the timeout as needed
  }
};

const SuccessToast = ({ msg }) => {
  const [toast, setToast] = useState(false);
  toastRef = useRef(setToast);

  useEffect(() => {
    toastRef.current = setToast;
    return () => {
      toastRef.current = null;
    };
  }, []);

  return (
    <View className="absolute -bottom-16 right-5">
      {toast && (
        <Text className="text-[#fff] p-2 rounded-lg px-10 bg-indigo-600 z-50">
          {msg}
        </Text>
      )}
    </View>
  );
};

export { SuccessToast, navigateAfterAccountCreated };
