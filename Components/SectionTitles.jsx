import { View, Text } from "react-native";
import React from "react";
import Skeleton from "./Custom/Skeleton";

const SectionTitles = ({ title }) => {
  return (
    <View className="relative justify-center items-center w-full flex-row">
      <HR />
      {title ? (
        <Text className="text-[#FF26B9] text-center mx-auto bg-[#f9f9f9] px-2.5 z-50">
          {title}
        </Text>
      ) : (
        <Skeleton
          width={200}
          height={1}
          customClass="p-2 px-5 rounded-lg w-full !shadow-2xl shadow-white/20 overflow-hidden bg-[#f0f0f0] w-full h-20 mt-4"
        />
      )}
      <HR />
    </View>
  );
};

export default SectionTitles;

const HR = () => {
  return <View className="h-[1px] w-full rounded-full bg-[#FF26B9]" />;
};
