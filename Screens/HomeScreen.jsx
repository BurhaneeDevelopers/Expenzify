import { View, Text, FlatList, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import MenuBar from "../Components/MenuBar";
import ExpenseCard from "../Components/Home/ExpenseCard";
import { SafeAreaView } from "react-native-safe-area-context";
import TotalFlowGradient from "../Components/ExpenseDetails/TotalFlowGradient";
import { useExpense } from "../context/useExpense";
import Folders from "../Components/Folders";
import HomeSkeletonBody from "../Components/Home/HomeSkeletonBody";
import { useAuth } from "../context/useAuth";
import { ArrowDown2 } from "iconsax-react-native";
import moment from "moment";
import Filter from "../Components/Blocks/Filter";

const HomeScreen = ({ navigation }) => {
  const [activeFolder, setActiveFolder] = useState("Personal");
  const [showAll, setShowAll] = useState(false); // State to toggle view
  const { expenses, fetchExpensesFromDB, loading } = useExpense();
  const { user, handleCheckUserStatus } = useAuth();

  // FOR MONTH FILTER
  const [selectedMonth, setSelectedMonth] = useState(moment().format("MM"));

  useEffect(() => {
    if (expenses.length === 0) {
      fetchExpensesFromDB(activeFolder);
    }
  }, [user]);

  useEffect(() => {
    if (expenses.length === 0) {
      fetchExpensesFromDB(activeFolder);
    }
  }, [activeFolder]);

  useEffect(() => {
    if (!user || expenses.length === 0) {
      handleCheckUserStatus();
    }
  }, [user]);

  const renderItem = ({ item }) => (
    <ExpenseCard
      navigation={navigation}
      activeFolder={activeFolder}
      item={item}
    />
  );

  const toggleView = () => {
    setShowAll(!showAll);
  };

  // ----------- TO FILTER ACCORDING TO MONTH --------
  const filterExpenses = (expenses) => {
    return expenses.filter((expense) => {
      const expenseDate = moment(expense.date, "YYYY-MM-DD");

      // Filter by selected month
      if (selectedMonth && expenseDate.format("MM") !== selectedMonth) {
        return false;
      }

      return true; // Return all expenses if no filter is applied
    });
  };
  // ----------- TO FILTER ACCORDING TO MONTH --------

  const displayedExpenses = showAll
    ? filterExpenses(expenses)
    : filterExpenses(expenses).slice(0, 5);

  return (
    <SafeAreaView className="h-full">
      <MenuBar needUser={true} navigation={navigation} title={"Expenses"} />

      <Filter
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
      />

      <TotalFlowGradient
        loading={loading}
        activeFolder={activeFolder}
        filterExpenses={filterExpenses}
      />

      <Folders activeFolder={activeFolder} setActiveFolder={setActiveFolder} />

      {loading ? (
        <HomeSkeletonBody activeFolder={activeFolder} />
      ) : (
        <>
          <FlatList
            data={displayedExpenses}
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
            ListFooterComponent={
              <View className="flex-row justify-center items-center">
                {expenses.length > 10 && (
                  <Pressable
                    onPress={toggleView}
                    className="p-2 !w-fit bg-[#F43F5E] rounded-md px-5"
                  >
                    <View className="flex-row gap-x-2 items-center">
                      <Text className="text-center text-white text-sm">
                        {showAll ? "View Less" : "View All"}
                      </Text>
                      <ArrowDown2 color="#fff" size={18} />
                    </View>
                  </Pressable>
                )}
              </View>
            }
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;
