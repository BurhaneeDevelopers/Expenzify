import { Account, Client, Databases } from "react-native-appwrite";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("66bdbe0e001b28f5e20e");

export const account = new Account(client);
// export const users = new sdk.Users(client);
// export const storage = new sdk.Storage(client);
export const databases = new Databases(client);
