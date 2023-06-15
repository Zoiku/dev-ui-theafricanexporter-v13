// import axios from "axios";

// const axiosInstance = () => {
//   const url = process.env.REACT_APP_BASE_URL_BASE_URL_DEVELOPMENT;

// let headers = {
//   "Content-Type": "application/json",
//   Accept: "application/json",
// };

//   const getToken = () => {
// const token =
//   sessionStorage.getItem("token") !== null
//     ? sessionStorage.getItem("token")
//     : null;

// if (token) {
//   return token;
// } else {
//   return null;
// }
//   };

//   const token = getToken();

//   if (token) {
//     headers.authorization = `Bearer ${token}`;
//   }

// const axiosInstance = axios.create({
//   baseURL: url,
//   headers,
// });

//   return axiosInstance;
// };

// export default axiosInstance;

import axios from "axios";
import { getToken } from "../Components/Functions";

const url = process.env.REACT_APP_BASE_URL_BASE_URL_DEVELOPMENT;
const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};
const token = getToken();

if (token) {
  headers.authorization = `Bearer ${token}`;
}

export default axios.create({
  baseURL: url,
  headers,
});