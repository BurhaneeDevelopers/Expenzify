import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import { useAuth } from "../context/useAuth";
import Skeleton from "./Custom/Skeleton";
import LogOut from "./LogOut";

const MenuBar = ({ navigation, title, needUser }) => {
  const { user, loading } = useAuth();
  return (
    <View className="flex-row w-full justify-between items-center p-5">
      <Image
        source={require("../assets/bgless-logo.png")}
        className="w-10 h-10 absolute top-3 left-5 rounded-full"
      />

      {!loading ? (
        <Text
          className="text-lg text-indigo-600 font-bold mx-auto max-w-[210px]"
          numberOfLines={1}
        >
          {needUser ? `${user?.name}'s ${title}` : title}
        </Text>
      ) : (
        <Skeleton
          width={44}
          height={4}
          customClass="p-2 px-5 rounded-lg w-96 !shadow-2xl shadow-white/20 overflow-hidden bg-[#fff] w-full h-20 mt-4"
        />
      )}

      <LogOut navigation={navigation} />
    </View>
  );
};

export default MenuBar;
