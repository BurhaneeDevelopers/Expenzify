import { createContext, useState, useContext, useEffect } from "react";
import {
  AddNewExpenseApi,
  DeleteExpenseApi,
  listExpenseApi,
} from "../Appwrite/Services";

const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchExpensesFromDB = async (user, activeFolder) => {
    setLoading(true);
    try {
      const response = await listExpenseApi(user?.$id, activeFolder);
      setExpenses(response?.documents);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const addExpenseInDB = async (
    user,
    expenseName,
    expenseAmount,
    expenseDesc,
    date,
    setExpenseName,
    setExpenseAmount,
    setExpenseDesc,
    setDate,
    activeFolder
  ) => {
    try {
      const res = await AddNewExpenseApi(
        user?.$id,
        expenseName,
        expenseAmount,
        expenseDesc,
        date,
        activeFolder
      );
      await fetchExpensesFromDB(activeFolder);

      if (res) {
        setExpenseName("");
        setExpenseAmount("");
        setExpenseDesc("");
        setDate("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteExpenseFromDB = async (docId) => {
    try {
      const response = await DeleteExpenseApi(docId);

      await fetchExpensesFromDB();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ExpenseContext.Provider
      value={{
        fetchExpensesFromDB,
        expenses,
        addExpenseInDB,
        deleteExpenseFromDB,
        loading,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpense = () => useContext(ExpenseContext);
