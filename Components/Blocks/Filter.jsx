import { View, Text } from "react-native";
import React from "react";
import { Picker } from "@react-native-picker/picker";
import { FilterEdit } from "iconsax-react-native";
import moment from "moment";

const Filter = ({ selectedMonth, setSelectedMonth }) => {
  return (
    <View className="flex-row items-center px-5 w-72">
      <FilterEdit color="#F43F5E" size={22} />

      <View className="w-36">
        <Picker
          selectedValue={selectedMonth}
          onValueChange={(itemValue) => setSelectedMonth(itemValue)}
        >
          {moment.months().map((month, index) => (
            <Picker.Item
              label={month}
              value={index + 1 < 10 ? `0${index + 1}` : `${index + 1}`}
              key={index}
              className="text-gray-800"
            />
          ))}
        </Picker>
      </View>
    </View>
  );
};

export default Filter;
