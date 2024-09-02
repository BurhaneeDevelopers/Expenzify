import {
  View,
  Text,
  Pressable,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { Add } from "iconsax-react-native";
import CustomDatePicker from "../Custom/DatePicker";
import { useExpense } from "../../context/useExpense";
import BottomSheet from "react-native-gesture-bottom-sheet";
import { useIncome } from "../../context/useIncome";

const AddIncome = () => {
  const [income, setIncome] = useState(0);
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);

  const { addIncomeInDB } = useIncome();

  const formValidate = income === 0;

  const handleNewIncome = async () => {
    setLoading(true);
    try {
      await addIncomeInDB(income, setIncome, date);

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
              className={"text-xl font-boldtext-indigo-600"}
              numberOfLines={1}
            >
              Add Income
            </Text>

            <Text className="mt-5 mb-2">Select Income Amount</Text>
            <TextInput
              className="border border-indigo-700 p-2 rounded-xl"
              placeholder="Enter Income Amount"
              value={income}
              onChangeText={(value) => {
                setIncome(value);
              }}
              keyboardType="numeric"
            />

            <CustomDatePicker onDateChange={setDate} />

            <Pressable
              onPress={handleNewIncome}
              className={`p-4 bg-[#3B47DE] w-full rounded-2xl mt-5 active:bg-indigo-800 ${
                formValidate && "opacity-50"
              }`}
              disabled={formValidate}
            >
              {loading ? (
                <ActivityIndicator color="#fff" size={28} />
              ) : (
                <Text className="text-white text-xl text-center">
                  Add Income
                </Text>
              )}
            </Pressable>
          </View>
        </View>
      </BottomSheet>

      <Pressable
        className="bg-indigo-600 active:bg-indigo-700 p-2 rounded-full z-50"
        onPress={() => {
          refRBSheet.current.show();
        }}
      >
        <Add className="text-white" size={"32"} />
      </Pressable>
    </View>
  );
};

export default AddIncome;
