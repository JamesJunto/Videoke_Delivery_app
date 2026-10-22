import { api } from "./api.js";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getAuth = async (email, password) => {
  const response = await api.post("/auth/login", { email, password });

  await AsyncStorage.setItem("accessToken", response.data.accessToken);

  return response.data;
};

export const registerAccount = async (email, password) => {
  const response = await api.post("/auth/register", { email, password });
  return response.data;
};
