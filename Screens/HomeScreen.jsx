import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import MenuBar from "../Components/MenuBar";
import ExpenseCard from "../Components/Home/ExpenseCard";
import { SafeAreaView } from "react-native-safe-area-context";
import TotalFlowGradient from "../Components/ExpenseDetails/TotalFlowGradient";
import { useExpense } from "../context/useExpense";
import Folders from "../Components/Folders";
import HomeSkeletonBody from "../Components/Home/HomeSkeletonBody";
import { useAuth } from "../context/useAuth";

const HomeScreen = ({ navigation }) => {
  const [activeFolder, setActiveFolder] = useState("Personal");

  const { expenses, fetchExpensesFromDB, loading } = useExpense();
  const { user, handleCheckUserStatus } = useAuth();

  useEffect(() => {
    fetchExpensesFromDB(activeFolder);
  }, [user]); // Empty dependency array ensures this runs only once on initial render

  useEffect(() => {
    fetchExpensesFromDB(activeFolder);
  }, [activeFolder]);

  useEffect(() => {
    handleCheckUserStatus();
  }, []);

  const renderItem = ({ item }) => (
    <ExpenseCard
      navigation={navigation}
      activeFolder={activeFolder}
      item={item}
    />
  );
  return (
    <SafeAreaView className="h-full">
      <MenuBar needUser={true} navigation={navigation} title={"Expenses"} />

      {/* Total Expense Cost  */}
      <TotalFlowGradient loading={loading} activeFolder={activeFolder} />

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
            activeFolder === "Personal" ? "bg-indigo-700" : "bg-[#F43F5E]"
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
