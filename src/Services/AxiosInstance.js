import axios from "axios";

require('dotenv').config();

const axiosInstance = () => {
  const url = process.env.BASE_URL_PRODUCTION;

  console.log("base url from .env file : "+ url);

  let headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const getToken = () => {
    const token =
      sessionStorage.getItem("token") !== null
        ? sessionStorage.getItem("token")
        : null;

    if (token) {
      return token;
    } else {
      return null;
    }
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
