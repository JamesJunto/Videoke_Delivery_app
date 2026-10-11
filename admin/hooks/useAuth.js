import { getAuth } from "../services/authService";
import { useState } from "react";
const useAuth = () => {
  const [credentials, setCredentials] = useState(null);

  const handleLogin = async (email, password) => {
    const data = await getAuth(email, password);
    setCredentials(data);
    return data;
  };

  return { credentials, handleLogin };
};
export default useAuth
