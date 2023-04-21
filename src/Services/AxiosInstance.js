import axios from "axios";

const axiosInstance = () => {
  // const url = "https://dev-msafricanexporter-com.onrender.com/ms/api/v1/";
  const url = "https://theafricanexporter.com/ms/api/v1";

  let headers = {
    "Content-Type": "application/json",
    Accept: "application/json"
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
    headers
  });

  return axiosInstance;
};

export default axiosInstance;
