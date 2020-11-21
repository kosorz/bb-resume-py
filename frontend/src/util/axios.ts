import axiosBase from "axios";

const axios = axiosBase.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    Authorization:
      "Bearer " +
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzdHJpbmciLCJleHAiOjE2MzQ1MzUxNjd9.APpdWRQEEk3_LpReJeAF7Z2ifAwBtmZsl6GE1Z-THOA",
  },
});

export default axios;
