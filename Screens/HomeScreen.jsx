import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import MenuBar from "../Components/MenuBar";
import ExpenseCard from "../Components/Home/ExpenseCard";
import { SafeAreaView } from "react-native-safe-area-context";
import TotalFlowGradient from "../Components/ExpenseDetails/TotalFlowGradient";
import AddExpense from "../Components/Home/AddExpense";
import { useExpense } from "../context/useExpense";
import Folders from "../Components/Folders";
import HomeSkeletonBody from "../Components/Home/HomeSkeletonBody";
import { useAuth } from "../context/useAuth";
import * as Updates from "expo-updates";

const HomeScreen = ({ navigation }) => {
  const [activeFolder, setActiveFolder] = useState("Personal");
  useEffect(() => {
    onfetchUpdateAsync();
  }, []);

  const onfetchUpdateAsync = async () => {
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { expenses, fetchExpensesFromDB, loading } = useExpense();
  const { user, handleCheckUserStatus } = useAuth();

  useEffect(() => {
    fetchExpensesFromDB(user, activeFolder);
  }, [activeFolder]);

  useEffect(() => {
    handleCheckUserStatus();
  }, []);

  const renderItem = ({ item }) => (
    <ExpenseCard
      activeFolder={activeFolder}
      item={item}
      navigation={navigation}
    />
  );
  return (
    <SafeAreaView className="h-full">
      <View className="absolute bottom-5 right-5 z-50">
        <AddExpense
          user={user}
          activeFolder={activeFolder}
          navigation={navigation}
        />
      </View>

      <View className="">
        {/* MENU  */}
        <MenuBar user={user} title={"Expenses"} navigation={navigation} />
      </View>

      {/* Total Expense Cost  */}
      <TotalFlowGradient activeFolder={activeFolder} />

      <Folders activeFolder={activeFolder} setActiveFolder={setActiveFolder} />
      {loading ? (
        <HomeSkeletonBody activeFolder={activeFolder} />
      ) : (
        <FlatList
          data={expenses}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          removeClippedSubviews
          initialNumToRender={1}
          className={`h-full px-5 rounded-t-[30px] shadow-2xl pt-10 ${
            activeFolder === "Personal" ? "bg-indigo-700" : "bg-green-700"
          }`}
          contentContainerStyle={{ paddingBottom: 50 }}
          ListEmptyComponent={
            <View className="flex-1 items-center justify-center">
              <Text className="text-white text-sm">
                Empty as your head... :)
              </Text>
              <Text className="text-white text-sm">
                Get started by adding expenses
              </Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;
