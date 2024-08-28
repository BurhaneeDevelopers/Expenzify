import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Skeleton from "../Custom/Skeleton";
import AddIncome from "./AddIncome";
import { useIncome } from "../../context/useIncome";

const IncomeGradient = ({ loading, totalBalance }) => {
  return (
    <View>
      <View className="flex-row gap-x-3 justify-center items-center">
        {/* Gradient with Balance  */}
        <LinearGradient
          colors={["#16A34A", "#365314"]} // Example gradient colors
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="flex-row rounded-full justify-center items-center w-40 h-40"
        >
          <View className="bg-white rounded-full w-36 h-36 flex-row justify-center items-center">
            <Text
              className="text-indigo-600 font-bold text-2xl"
              numberOfLines={1}
            >
              {loading ? (
                <Skeleton
                  width={60}
                  height={25}
                  customClass="p-2 px-5 rounded-lg w-96 !shadow-2xl shadow-white/20 overflow-hidden bg-[#f9f9f9] w-full h-20 mt-4"
                />
              ) : (
                `₹${totalBalance.toLocaleString("IN")}`
              )}
            </Text>
          </View>
        </LinearGradient>

        <View className="z-50">
          <AddIncome />
        </View>
      </View>

      <View className="flex-row justify-center mt-3">
        <Text className="text-gray-800 font-semibold mb-3 text-xs">
          Total Balance
        </Text>
      </View>
    </View>
  );
};

export default IncomeGradient;
