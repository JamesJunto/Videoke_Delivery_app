import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

//const API_BASE_URL = 'https://videokedeliveryapp-production.up.railway.app/api';
const API_BASE_URL = 'http://192.168.254.100:3000/api';


export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('accessToken');

    //const token = localStorage.getItem('accessToken');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);
