import { View, Text } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useExpense } from "../../context/useExpense";

const TotalFlowGradient = ({ activeFolder }) => {
  const { expenses } = useExpense();

  const totalExpense = expenses.reduce((acc, doc) => {
    return acc + (Number(doc.expenseAmount) || 0);
  }, 0);
  return (
    <View>
      {/* Gradient with Balance  */}
      <LinearGradient
        colors={
          activeFolder === "Personal"
            ? ["#6366F1", "#3730A3"]
            : ["#16A34A", "#065F46"]
        } // Example gradient colors
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="flex-row rounded-full justify-center items-center w-40 h-40 mx-auto"
      >
        <View className="bg-white rounded-full w-36 h-36 flex-row justify-center items-center">
          <Text className="text-[#ff0000] font-bold text-2xl" numberOfLines={1}>
            - ₹{totalExpense.toLocaleString("IN")}
          </Text>
        </View>
      </LinearGradient>

      <View className="flex-row justify-center mt-3">
        <Text className="text-gray-800 font-semibold mb-3 text-xs">
          Total {activeFolder === "Personal" ? "Personal" : "Home"} Expense
        </Text>
      </View>
    </View>
  );
};

export default TotalFlowGradient;
