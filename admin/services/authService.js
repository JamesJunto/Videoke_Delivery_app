import { api } from "./api.js";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAuth = async (email, password) => {
  try {
    const response = await api.post("/auth/login", { email, password });

    //dapat asyncStorage
    localStorage.setItem('accessToken', response.data.accessToken);
    return response.data;
  } catch (error) {
     console.log("Res:", error.response?.data);
    throw error;
  }
};

export const registerAccount = async (email, password) => {
  try {
    const response = await api.post("/auth/register", {email, password});
    return response.data;

  } catch (error) {
    console.error("Register error:", error);
    throw error;
  }
};
