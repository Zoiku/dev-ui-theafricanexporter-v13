import axios from "axios";
import { getToken } from "../Components/Functions";

const axiosInstance = () => {
  const url = process.env.REACT_APP_BASE_URL_BASE_URL_DEVELOPMENT;
  let headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  const token = getToken();
  if (token) {
    headers.authorization = `Bearer ${token}`;
  }
  const axiosInstance = axios.create({
    baseURL: url,
    headers,
  });

  return axiosInstance;
};

export default axiosInstance;
