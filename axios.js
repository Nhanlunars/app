import axios from "axios";

const baseURL = process.env.EXPO_PUBLIC_API_URL || "http://192.168.110.19:3000";
console.log(baseURL);

const instance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
