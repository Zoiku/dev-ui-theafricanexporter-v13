import axios from "axios";

const axiosInstance = () => {
  //TODO: this is not ideal but this is done as a temporary fix while getting value from .env is being worked on.
  const url = "https://theafricanexporter.com/ms/ms/api/v1";

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
