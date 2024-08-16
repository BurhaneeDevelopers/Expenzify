import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import MenuBar from "../Components/MenuBar";

const ExpenseDetailsScreen = ({ navigation }) => {
  return (
    <SafeAreaView className="h-full">
      <MenuBar title={"Expense Details"} navigation={navigation} />

      <View className="p-5">
        {/* Time Filter - Filters whether to show data monthly, daily or yearly  */}
        <View className="flex-row justify-between items-center mb-10">
          {/* <TimeFilter /> */}

          <Text
            className="text-white font-semibold text-base"
            // onPress={() =>
            //   navigation.navigate(
            //     isInFlowActive && isAdmin ? "InflowInput" : "OutflowInput",
            //     {
            //       item: item,
            //       totalInflow,
            //       totalOutflow,
            //     }
            //   )
            // }
          >
            + Add Expense
          </Text>
        </View>

        {/* Total Flow Gradient - Shows total inflow or outflow for filtered time set  */}
        <TotalFlowGradient />

        {/* Flow Switch to change Flows from inflow to outflow  */}
      </View>

      {/* <TotalBalance /> */}
      <ScrollView className="rounded-t-3xl bg-[#101010] h-full">
        <View className="">
          {/* {isInFlowActive ? (
      <InflowData item={item} />
    ) : (
      <OutflowData item={item} />
    )} */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ExpenseDetailsScreen;
