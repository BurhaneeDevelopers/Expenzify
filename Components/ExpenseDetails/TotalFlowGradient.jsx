import { View, Text } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useExpense } from "../../context/useExpense";
import Skeleton from "../Custom/Skeleton";
import AddExpense from "../Home/AddExpense";

const TotalFlowGradient = ({ loading, activeFolder, user, navigation }) => {
  const { expenses } = useExpense();

  const totalExpense = expenses.reduce((acc, doc) => {
    return acc + (Number(doc.expenseAmount) || 0);
  }, 0);
  return (
    <View>
      <View className="flex-row gap-x-3 justify-center items-center">
        {/* Gradient with Balance  */}
        <LinearGradient
          colors={
            activeFolder === "Personal"
              ? ["#6366F1", "#3730A3"]
              : ["#16A34A", "#065F46"]
          } // Example gradient colors
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="flex-row rounded-full justify-center items-center w-40 h-40"
        >
          <View className="bg-white rounded-full w-36 h-36 flex-row justify-center items-center">
            <Text
              className="text-[#ff0000] font-bold text-2xl"
              numberOfLines={1}
            >
              {loading ? (
                <Skeleton
                  width={60}
                  height={25}
                  customClass="p-2 px-5 rounded-lg w-96 !shadow-2xl shadow-white/20 overflow-hidden bg-[#f9f9f9] w-full h-20 mt-4"
                />
              ) : (
                `- ₹${totalExpense.toLocaleString("IN")}`
              )}
            </Text>
          </View>
        </LinearGradient>

        <View className="z-50">
          <AddExpense
            user={user}
            activeFolder={activeFolder}
            navigation={navigation}
          />
        </View>
      </View>

      <View className="flex-row justify-center mt-3">
        <Text className="text-gray-800 font-semibold mb-3 text-xs">
          Total {activeFolder === "Personal" ? "Personal" : "Home"} Expense
        </Text>
      </View>
    </View>
  );
};

export default TotalFlowGradient;
