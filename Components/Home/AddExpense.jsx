import { View, Text, Pressable, TextInput } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { Add } from "iconsax-react-native";
import CustomDatePicker from "../Custom/DatePicker";
import { useExpense } from "../../context/useExpense";

const AddExpense = ({ user, activeFolder }) => {
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState(0);
  const [expenseDesc, setExpenseDesc] = useState("");
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);

  const { addExpenseInDB } = useExpense();

  const formValidate =
    expenseName.trim() === "" ||
    expenseAmount === 0 ||
    expenseDesc.trim() === "";

  const handleAddNewExpense = async () => {
    setLoading(true);
    try {
      await addExpenseInDB(
        expenseName,
        expenseAmount,
        expenseDesc,
        date,
        setExpenseName,
        setExpenseAmount,
        setExpenseDesc,
        setDate,
        activeFolder
      );

      setLoading(false);

      refRBSheet.current.close();
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
        height={550}
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
            >
              Add {activeFolder === "Personal" ? "Personal" : "Home"} Expense
            </Text>

            <Text className="mt-5 mb-2">Select Expense Name</Text>
            <TextInput
              className="border border-indigo-700 p-2 rounded-xl"
              placeholder="Enter Expense Name"
              value={expenseName}
              onChangeText={(value) => {
                setExpenseName(value);
              }}
            />

            <Text className="mt-5 mb-2">Select Expense Amount</Text>
            <TextInput
              className="border border-indigo-700 p-2 rounded-xl"
              placeholder="Enter Expense Amount"
              value={expenseAmount}
              onChangeText={(value) => {
                setExpenseAmount(value);
              }}
              keyboardType="numeric"
            />

            <Text className="mt-5 mb-2">Enter Short Description</Text>
            <TextInput
              className="border border-indigo-700 p-2 rounded-xl"
              placeholder="Enter Short Description"
              value={expenseDesc}
              onChangeText={(value) => {
                setExpenseDesc(value);
              }}
            />

            <CustomDatePicker onDateChange={setDate} />

            <Pressable
              onPress={handleAddNewExpense}
              className={`p-4 bg-[#3B47DE] w-full rounded-2xl mt-5 active:bg-indigo-800 ${
                formValidate && "opacity-50"
              }`}
              disabled={formValidate}
            >
              {loading ? (
                <Text className="text-white text-xl text-center">
                  Loading...
                </Text>
              ) : (
                <Text className="text-white text-xl text-center">
                  Add Expense
                </Text>
              )}
            </Pressable>
          </View>
        </View>
      </RBSheet>

      <Pressable
        className="bg-white active:bg-[#f0f0f0] p-3 rounded-full z-50"
        onPress={() => {
          refRBSheet.current.open();
        }}
      >
        <Add className="text-indigo-700" size={"44"} />
      </Pressable>
    </View>
  );
};

export default AddExpense;
