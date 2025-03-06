import axios from "axios";

// const BASE_URL = "https://fresh-car-express.onrender.com";
// const BASE_URL = "http://127.0.0.1:3005";
const BASE_URL = "http://159.255.179.162:3005";

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
