import axios from "./axios";
import decodeJwt from "jwt-decode";
import { DateTime } from "luxon";
import Timeout from "smart-timeout";

import { normalizeEmail } from "./fns";

export const isAuthenticated = () => {
  const token = localStorage.getItem("token");

  if (token) {
    const decodedToken: { exp: number; sub: string } = decodeJwt(token);
    const expiryDate = DateTime.fromMillis(decodedToken.exp * 1000);

    if (expiryDate > DateTime.local()) {
      if (!Timeout.pending("logout")) {
        Timeout.set(
          "logout",
          () => {
            window.location.reload();
          },
          expiryDate.diff(DateTime.local())
        );
      }

      return true;
    }

    localStorage.removeItem("token");
  }

  return false;
};

export const register = async (
  username: string,
  password: string,
  password_confirm: string
) => {
  return axios
    .post("/join", {
      username: normalizeEmail(username),
      password,
      password_confirm,
    })
    .then((res) => {
      localStorage.setItem("token", res.data["access_token"]);
      window.location.reload();
    });
};

export const login = async (username: string, password: string) => {
  const formData = new FormData();
  formData.append("username", normalizeEmail(username));
  formData.append("password", password);

  return axios
    .post("/token", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      localStorage.setItem("token", res.data["access_token"]);
      window.location.reload();
    });
};

export const logout = () => {
  if (Timeout.pending("logout")) {
    Timeout.clear("logout");
  }

  localStorage.removeItem("token");
  window.location.reload();
};
