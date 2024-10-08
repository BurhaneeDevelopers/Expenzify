import { createContext, useState, useContext, useEffect } from "react";
import {
  AddNewExpenseApi,
  DeleteExpenseApi,
  UpdateExpenseApi,
  listExpenseApi,
} from "../Appwrite/Services";
import { useAuth } from "./useAuth";

const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const fetchExpensesFromDB = async (activeFolder) => {
    setLoading(true);
    try {
      if (user?.$id) {
        const response = await listExpenseApi(user?.$id, activeFolder);
        setExpenses(response?.documents);
        setLoading(false);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const addExpenseInDB = async (
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

  const updateExpenseInDB = async (
    expenseName,
    expenseAmount,
    expenseDesc,
    docId,
    activeFolder
  ) => {
    try {
      const res = await UpdateExpenseApi(
        expenseName,
        expenseAmount,
        expenseDesc,
        docId,
        activeFolder
      );
      await fetchExpensesFromDB(activeFolder);
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
        updateExpenseInDB,
        deleteExpenseFromDB,
        loading,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpense = () => useContext(ExpenseContext);
