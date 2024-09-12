import {
  View,
  Text,
  Pressable,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Add, Calendar } from "iconsax-react-native";
import CustomDatePicker from "../Custom/DatePicker";
import { useExpense } from "../../context/useExpense";
import BottomSheet from "react-native-gesture-bottom-sheet";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const AddExpense = ({ user, activeFolder }) => {
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState(0);
  const [expenseDesc, setExpenseDesc] = useState("");
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);

  const [isDateRangePickerVisible, setDateRangePickerVisible] = useState(false);

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

      refRBSheet?.current?.close();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const refRBSheet = useRef();
  return (
    <View className="">
      <BottomSheet
        // customStyles={{
        //   draggableIcon: { display: "none" },
        //   container: {
        //     backgroundColor: "transparent",
        //   },
        // }}
        ref={refRBSheet}
        height={550}
        draggableIcon
      >
        <View className="bg-[#f9f9f9] rounded-t-3xl">
          <Pressable
            className="bg-[#E2E3F0] mx-auto top-3 h-1.5 w-12 rounded-full"
            // onPress={() => refRBSheet.current.close()}
          ></Pressable>

          <View className="px-5 pt-4">
            <Text
              className={`text-xl font-bold ${
                activeFolder === "Personal"
                  ? "text-indigo-600"
                  : "text-green-600"
              }`}
              numberOfLines={1}
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

            {/* <CustomDatePicker onDateChange={setDate} /> */}
            <View className="flex-col justify-start items-start">
              <Text className="mt-5 mb-2">Select Date</Text>

              <Pressable
                onPress={() => setDateRangePickerVisible(true)}
                className="bg-[#3B47DE] p-2 rounded-md flex-row items-center gap-x-2 ml-0.5"
              >
                <Text className="text-white">{date.toDateString()}</Text>
                <Calendar color="#fff" size={18} />
              </Pressable>
            </View>

            <DateTimePickerModal
              isVisible={isDateRangePickerVisible}
              mode="date"
              onConfirm={(e) => {
                setDateRangePickerVisible(false);
                setDate(e);
              }}
              onCancel={() => setDateRangePickerVisible(false)}
              isRangePicker // Ensure the date picker supports range selection
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
                  Add Expense
                </Text>
              )}
            </Pressable>
          </View>
        </View>
      </BottomSheet>

      <Pressable
        className="bg-[#F43F5E] active:bg-[#BE123C] p-2 rounded-full z-50"
        onPress={() => {
          refRBSheet.current.show();
        }}
      >
        <Add className="text-white" size={"32"} />
      </Pressable>
    </View>
  );
};

export default AddExpense;
