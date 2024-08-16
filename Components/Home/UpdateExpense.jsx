import {
  View,
  Text,
  Pressable,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { useExpense } from "../../context/useExpense";
import { Edit } from "iconsax-react-native";

const UpdateExpense = ({ activeFolder, item }) => {
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

      refRBSheet?.current?.close();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const refRBSheet = useRef();
  return (
    <View className="">
      <RBSheet
        customStyles={{
          draggableIcon: { display: "none" },
          container: {
            backgroundColor: "transparent",
          },
        }}
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={450}
      >
        <View className="bg-[#f9f9f9] h-full rounded-t-3xl">
          <Pressable
            className="bg-[#E2E3F0] mx-auto top-3 h-1.5 w-12 rounded-full"
            onPress={() => refRBSheet.current.close()}
          ></Pressable>

          <View className="my-auto px-5">
            <Text
              className={`text-xl font-bold ${
                activeFolder === "Personal"
                  ? "text-indigo-600"
                  : "text-green-600"
              }`}
              numberOfLines={1}
            >
              Update{" "}
              <Text className="text-[#ff0000]">'{item?.expenseName}'</Text>{" "}
              Expense
            </Text>

            <Text className="mt-5 mb-2">Update Expense Name</Text>
            <TextInput
              className="border border-indigo-700 p-2 rounded-xl"
              placeholder="Update Expense Name"
              value={expenseName}
              onChangeText={(value) => {
                setExpenseName(value);
              }}
            />

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

            <Text className="mt-5 mb-2">Update Short Description</Text>
            <TextInput
              className="border border-indigo-700 p-2 rounded-xl"
              placeholder="Enter Short Description"
              value={expenseDesc}
              onChangeText={(value) => {
                setExpenseDesc(value);
              }}
            />

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
        </View>
      </RBSheet>

      <Pressable
        className=""
        onPress={() => {
          refRBSheet.current.open();
        }}
      >
        <Edit size={24} color="#fff" />
      </Pressable>
    </View>
  );
};

export default UpdateExpense;
