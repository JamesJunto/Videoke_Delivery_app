import { api } from "./api.js";

export const getAuth = async (email, password) => {
  try {
    const response = await api.post("/login", {
      email,
      password
    });
    return response.data;
  } catch (error) {
    console.error("Fetching error:", error);
    throw error;
  }
};
