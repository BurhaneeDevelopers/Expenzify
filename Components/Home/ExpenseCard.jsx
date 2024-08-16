import { View, Text, Pressable, Alert } from "react-native";
import React from "react";
import moment from "moment";
import { Edit, Trash } from "iconsax-react-native";
import { useExpense } from "../../context/useExpense";

const ExpenseCard = ({ item, activeFolder }) => {
  const { deleteExpenseFromDB } = useExpense();

  const confirmDelete = (id) => {
    Alert.alert(
      "Delete Expense",
      "Are you sure you want to delete this expense?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Delete canceled"),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => deleteExpenseFromDB(id),
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };
  return (
    <View className="gap-y-3 w-full mb-5">
      <Pressable className="bg-white p-2 px-5 rounded-lg w-full !shadow-2xl shadow-white/20">
        <View className=" flex-row justify-between items-center">
          <Text
            className={`text-lg font-bold ${
              activeFolder === "Personal" ? "text-indigo-600" : "text-green-600"
            }`}
          >
            {item?.expenseName}
          </Text>
          <Text className="text-[#ff0000] text-lg">
            - ₹{item?.expenseAmount}
          </Text>
        </View>

        <View className=" flex-row justify-between items-center mt-3">
          <Text className="text-gray-500 text-xs font-bold">
            {item?.expenseDesc}
          </Text>
          <Text className="text-gray-400 text-xs">
            {moment(item?.date).format("DD MMM YYYY")}
          </Text>
        </View>
      </Pressable>

      <View className="flex-row justify-between items-center">
        <Edit size={24} color="#fff" />

        <Pressable onPress={() => confirmDelete(item?.$id)}>
          <Trash size={24} color="#ff0000" />
        </Pressable>
      </View>
    </View>
  );
};

export default ExpenseCard;
