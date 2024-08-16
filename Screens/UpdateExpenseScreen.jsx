import {
  View,
  Text,
  Pressable,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useRef, useState } from "react";
import { useExpense } from "../context/useExpense";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import MenuBar from "../Components/MenuBar";
import {
  SuccessToast,
  navigateAfterAccountCreated,
} from "../Components/Toast/SuccessToast";

const UpdateExpenseScreen = ({ navigation }) => {
  const {
    params: { item, activeFolder },
  } = useRoute();

  const [expenseName, setExpenseName] = useState(item?.expenseName);
  const [expenseAmount, setExpenseAmount] = useState(item?.expenseAmount);
  const [expenseDesc, setExpenseDesc] = useState(item?.expenseDesc);
  const [loading, setLoading] = useState(false);

  const { updateExpenseInDB } = useExpense();

  const formValidate =
    expenseName === item?.expenseName &&
    expenseAmount === item?.expenseAmount &&
    expenseDesc === item?.expenseDesc;

  const handleAddNewExpense = async () => {
    setLoading(true);
    try {
      await updateExpenseInDB(
        expenseName,
        expenseAmount,
        expenseDesc,
        item?.$id,
        activeFolder
      );

      setLoading(false);

      navigateAfterAccountCreated(navigation, "Index");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="bg-[#f9f9f9] rounded-t-3xl pt-4">
      <MenuBar navigation={navigation} title={"Update Expense"} />

      <SuccessToast msg={"Yayy! Expense Edited Successfuly"} />

      <View className="px-5">
        <Text
          className={`text-xl font-bold ${
            activeFolder === "Personal" ? "text-indigo-600" : "text-green-600"
          }`}
          numberOfLines={1}
        >
          Update <Text className="text-[#ff0000]">'{item?.expenseName}'</Text>{" "}
          Expense
        </Text>

        <View>
          <Text className="mt-5 mb-2">Update Expense Name</Text>
          <TextInput
            className="border border-indigo-700 p-2 rounded-xl"
            placeholder="Update Expense Name"
            value={expenseName}
            onChangeText={(value) => {
              setExpenseName(value);
            }}
          />
        </View>

        <View>
          <Text className="mt-5 mb-2">Update Expense Amount</Text>
          <TextInput
            className="border border-indigo-700 p-2 rounded-xl"
            placeholder="Update Expense Amount"
            value={expenseAmount}
            onChangeText={(value) => {
              setExpenseAmount(value);
            }}
            keyboardType="numeric"
          />
        </View>

        <View>
          <Text className="mt-5 mb-2">Update Short Description</Text>
          <TextInput
            className="border border-indigo-700 p-2 rounded-xl"
            placeholder="Enter Short Description"
            value={expenseDesc}
            onChangeText={(value) => {
              setExpenseDesc(value);
            }}
          />
        </View>

        <Pressable
          onPress={handleAddNewExpense}
          className={`p-4 bg-[#3B47DE] w-full rounded-2xl mt-5 active:bg-indigo-800 ${
            formValidate && "opacity-50"
          }`}
          disabled={formValidate}
        >
          {loading ? (
            <ActivityIndicator color="#fff" size={28} />
          ) : (
            <Text className="text-white text-xl text-center">
              Update Expense
            </Text>
          )}
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default UpdateExpenseScreen;
