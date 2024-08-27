import React, { useEffect, useState } from "react";
import MenuBar from "../Components/MenuBar";
import { SafeAreaView } from "react-native-safe-area-context";
import IncomeGradient from "../Components/Wallet/IncomeGradient";
import SectionTitles from "../Components/SectionTitles";
import { View } from "react-native";
import { Text } from "react-native";

const WalletScreen = ({ navigation }) => {
  return (
    <SafeAreaView className="h-full">
      <MenuBar needUser={false} navigation={navigation} title={"Wallet"} />

      {/* Total Expense Cost  */}
      <IncomeGradient />

      <View className="mt-10 px-5">
        <SectionTitles title={"Manage Family Wallets"} />

        <Text className="text-xs text-gray-500">(Coming Soon)</Text>
      </View>

      <View className="mt-10 px-5">
        <SectionTitles title={"Manage Debts"} />

        <Text className="text-xs text-gray-500">(Coming Soon)</Text>
      </View>
    </SafeAreaView>
  );
};

export default WalletScreen;
