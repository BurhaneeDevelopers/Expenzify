import React, { useEffect, useState } from "react";
import MenuBar from "../Components/MenuBar";
import { SafeAreaView } from "react-native-safe-area-context";
import IncomeGradient from "../Components/Wallet/IncomeGradient";
import SectionTitles from "../Components/SectionTitles";
import { View } from "react-native";
import { Text } from "react-native";
import IncomeCard from "../Components/Wallet/IncomeCard";
import { useIncome } from "../context/useIncome";

const WalletScreen = ({ navigation }) => {
  const { income, fetchIncomeFromDB } = useIncome();

  useEffect(() => {
    fetchIncomeFromDB();
  }, []);

  const totalBalance = income.reduce((acc, doc) => {
    return acc + doc.income || 0;
  }, 0);
  return (
    <SafeAreaView className="h-full">
      <MenuBar needUser={false} navigation={navigation} title={"Wallet"} />

      {/* Total Expense Cost  */}
      <IncomeGradient totalBalance={totalBalance} />

      <View className="mt-10 px-5">
        <SectionTitles title={"Recent Incomes"} />

        <View className="mt-4">
          {income.map((item) => {
            return <IncomeCard key={item?.$id} item={item} />;
          })}
        </View>
      </View>

      <View className="mt-10 px-5">
        <SectionTitles title={"Manage Debts"} />

        <Text className="text-xs text-gray-500">(Coming Soon)</Text>
      </View>
    </SafeAreaView>
  );
};

export default WalletScreen;
