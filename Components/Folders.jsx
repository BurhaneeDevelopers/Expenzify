import { View, Text, Pressable } from "react-native";
import React from "react";

const Folders = ({ activeFolder, setActiveFolder }) => {
  return (
    <View className="flex-row justify-center gap-x-10 items-center px-10 mt-5">
      <Pressable
        onPress={() => setActiveFolder("Personal")}
        className={`p-2 px-7 ${
          activeFolder === "Personal"
            ? "bg-indigo-700 rounded-t-lg h-10"
            : "bg-indigo-700 rounded-full"
        }`}
      >
        <Text className="text-white">Personal</Text>
      </Pressable>

      <Pressable
        onPress={() => setActiveFolder("Home")}
        className={`p-2 px-7 ${
          activeFolder === "Home"
            ? "bg-green-700 rounded-t-lg h-10"
            : "bg-green-700 rounded-full"
        }`}
      >
        <Text className="text-white">Home</Text>
      </Pressable>
    </View>
  );
};

export default Folders;
