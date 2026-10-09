import { useEffect, useState, useState } from "react";
import { getAuth } from '../services/authService'

const useAuth = async () => {
  const [credentials, setCredentials] = useState()

  useEffect(() => {
    const fetchCredentials = async () => {
        const data = await getAuth();
        setCredentials(data);
    };
    fetchCredentials()

  }, [])

  return credentials;
}
export default useAuth
