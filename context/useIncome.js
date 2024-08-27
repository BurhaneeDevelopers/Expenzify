import { createContext, useState, useContext, useEffect } from "react";
import {
  AddNewExpenseApi,
  AddNewIncomeApi,
  listExpenseApi,
  listIncomeApi,
} from "../Appwrite/Services";
import { useAuth } from "./useAuth";

const IncomeContext = createContext();

export const IncomeProvider = ({ children }) => {
  const [income, setIncome] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const fetchIncomeFromDB = async () => {
    setLoading(true);
    try {
      if (user?.$id) {
        const response = await listIncomeApi(user?.$id);
        setIncome(response?.documents);
        setLoading(false);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const addIncomeInDB = async (income, setIncome, date) => {
    try {
      const res = await AddNewIncomeApi(user?.$id, Number(income), date);
      await fetchIncomeFromDB();

      if (res) {
        setIncome("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <IncomeContext.Provider
      value={{
        fetchIncomeFromDB,
        income,
        addIncomeInDB,
        loading,
      }}
    >
      {children}
    </IncomeContext.Provider>
  );
};

export const useIncome = () => useContext(IncomeContext);
