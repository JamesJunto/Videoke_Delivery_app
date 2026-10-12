import { getAuth, registerAccount } from "../services/authService";
import { useState } from "react";

const useAuth = () => {
  const [credentials, setCredentials] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (email, password) => {
    try {
      setLoading(true);

      const data = await getAuth(email, password);
      setCredentials(data);

      return data;
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async ( first_name,last_name,phone,address,email,password) => {
    try {
      setLoading(true);

      const res = await registerAccount(first_name,last_name,phone,address,email,password );

      return res;
    } finally {
      setLoading(false);
    }
  };

  return {credentials,loading,handleLogin, handleRegister,};
};

export default useAuth;
