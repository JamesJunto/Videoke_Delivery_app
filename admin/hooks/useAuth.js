import { getAuth, registerAccount } from "../services/authService";
import { useState } from "react";
const useAuth = () => {
  const [credentials, setCredentials] = useState(null);

  const handleLogin = async (email, password) => {
    const data = await getAuth(email, password);
    setCredentials(data);
    return data;
  };

  const handleRegister = async (first_name, last_name, phone, address, email, password) => {
    const res = await registerAccount(first_name, last_name, phone, address, email, password);
    return res
  };

  return { credentials, handleLogin, handleRegister };
};
export default useAuth;
