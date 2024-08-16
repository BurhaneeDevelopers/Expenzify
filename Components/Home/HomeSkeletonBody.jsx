import { View, Text } from "react-native";
import React from "react";
import Skeleton from "../Custom/Skeleton";

const HomeSkeletonBody = ({ activeFolder }) => {
  return (
    <View className="">
      <View
        // width={100}
        // height={72}
        className={`h-screen !w-full px-5 rounded-t-[30px] shadow-2xl pt-10 overflow-hidden absolute ${
          activeFolder === "Personal" ? "bg-indigo-700" : "bg-green-700"
        }`}
      />
      <View className="flex-col px-5 mt-5">
        <Skeleton
          width={372}
          height={72}
          customClass="p-2 px-5 rounded-lg w-full !shadow-2xl shadow-white/20 overflow-hidden bg-[#f0f0f0] w-full h-20 mt-4"
        />
        <Skeleton
          width={372}
          height={72}
          customClass="p-2 px-5 rounded-lg w-full !shadow-2xl shadow-white/20 overflow-hidden bg-[#fff] w-full h-20 mt-4"
        />
        <Skeleton
          width={372}
          height={72}
          customClass="p-2 px-5 rounded-lg w-96 !shadow-2xl shadow-white/20 overflow-hidden bg-[#fff] w-full h-20 mt-4"
        />
      </View>
    </View>
  );
};

export default HomeSkeletonBody;
