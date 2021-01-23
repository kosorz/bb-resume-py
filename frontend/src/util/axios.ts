import axiosBase from "axios";

const axios = axiosBase.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token"),
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
    Expires: "0",
  },
});

axios.interceptors.response.use(
  function (config) {
    return config;
  },
  function (error) {
    if (error.response.status === 401) {
      localStorage.removeItem("token");
    }
    return Promise.reject(error);
  }
);

export default axios;
