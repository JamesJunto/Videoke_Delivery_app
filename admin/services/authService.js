import { api } from "./api.js";

export const getAuth = async (email, password) => {
  try {
    const response = await api.post("/auth/login", {
      email,
      password
    });
    return response.data;
  } catch (error) {
    console.error("Fetching error:", error);
    throw error;
  }
};

export const registerAccount = async (first_name, last_name, phone, address, email, password) => {
  try {
    const response = await api.post("/auth/register", {first_name, last_name, phone, address, email, password});
    return response.data;

  } catch (error) {
    console.error("Register error:", error);
    throw error;
  }
};
