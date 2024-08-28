import { View, Text, Pressable, Alert } from "react-native";
import React from "react";
import moment from "moment";

const IncomeCard = ({ item }) => {
  return (
    <View className="gap-y-3 w-full mb-5">
      <Pressable className="bg-white p-2 px-5 rounded-lg w-full !shadow-2xl shadow-white/20">
        <View className=" flex-row justify-between items-center">
          <Text className="text-indigo-600 text-lg">+ ₹{item?.income}</Text>

          <Text className="text-gray-400 text-xs">
            {/* {moment(item?.date).format("DD MMM YYYY")} */}
            {moment(item?.date).calendar(null, {
              sameDay: "[Today]", // Shows 'Today' if the date is today
              lastDay: "[Yesterday]", // Shows 'Yesterday' if the date is yesterday
            })}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default IncomeCard;
