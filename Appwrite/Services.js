import { ID, Query } from "react-native-appwrite";
import { account, databases } from "./appwrite";

// -------------------- EXPENSES

// LIST ALL Expenses
export const listExpenseApi = async (userId, activeFolder) => {
  const result = await databases.listDocuments(
    "66bdbed7003993b45121", // databaseId
    activeFolder === "Personal"
      ? "66be27bd0008c787725e"
      : "66be27c500242eeb7e04", // collectionId
    [Query.equal("userId", userId)]
  );
  return result;
};

// Add Expenses to DB
export const AddNewExpenseApi = async (
  userId,
  expenseName,
  expenseAmount,
  expenseDesc,
  date,
  activeFolder
) => {
  const result = await databases.createDocument(
    "66bdbed7003993b45121", // databaseId
    activeFolder === "Personal"
      ? "66be27bd0008c787725e"
      : "66be27c500242eeb7e04", // collectionId
    ID.unique(), // name
    {
      userId: userId,
      expenseName: expenseName,
      expenseAmount: expenseAmount,
      expenseDesc: expenseDesc,
      date: date,
    }, // data
    ['read("any")'] // permissions (optional)
  );

  return result;
};

// Delete Any Expense
export const DeleteExpenseApi = async (docId, activeFolder) => {
  const result = await databases.deleteDocument(
    "66bdbed7003993b45121", // databaseId
    activeFolder === "Personal"
      ? "66be27bd0008c787725e"
      : "66be27c500242eeb7e04",
    docId
  );

  return result;
};

// EDIT EXPENSES
export const UpdateExpenseApi = async (
  expenseName,
  expenseAmount,
  expenseDesc,
  docId,
  activeFolder
) => {
  const result = await databases.updateDocument(
    "66bdbed7003993b45121", // databaseId
    activeFolder === "Personal"
      ? "66be27bd0008c787725e"
      : "66be27c500242eeb7e04",
    docId,
    {
      expenseName: expenseName,
      expenseAmount: expenseAmount,
      expenseDesc: expenseDesc,
    }, // data
    ['read("any")'] // permissions (optional)
  );

  return result;
};

// ---------------------- SIGN IN ------------------

export const signInUserApi = async (email, password) => {
  const result = await account.createEmailPasswordSession(
    email, // email
    password // password
  );

  return result;
};

// ---------------------------- INCOME ----------------

// LIST ALL INCOMES
export const listIncomeApi = async (userId) => {
  const result = await databases.listDocuments(
    "66bdbed7003993b45121", // databaseId
    "66ce172c00077875f56c",
    [Query.equal("userId", userId)]
  );
  return result;
};

// Add Expenses to DB
export const AddNewIncomeApi = async (userId, income, date) => {
  const result = await databases.createDocument(
    "66bdbed7003993b45121", // databaseId
    "66ce172c00077875f56c",
    ID.unique(), // name
    {
      income: income,
      date: date,
      userId: userId,
    }, // data
    ['read("any")'] // permissions (optional)
  );

  return result;
};
