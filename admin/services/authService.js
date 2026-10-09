import { api } from "./api";

export const getAuth = async (email, password) => {
  try {
    const response = await api.post("/login", {
      email,
      password
    });

    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};
