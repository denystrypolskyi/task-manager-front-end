import axios from "axios";
import { setError, setUser } from "../reducers/userReducer";
import { API_URL } from "../config"

const handleErrors = (dispatch, e) => {
  const error = {
    isError: true,
    message: e.response?.data?.message || "An error occurred",
  };
  dispatch(setError(error));
};

export const registration = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${API_URL}/auth/registration`, {
        email,
        password,
      });
    } catch (e) {
      handleErrors(dispatch, e);
    }
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });
      const { user, token } = response.data;
      dispatch(setUser(user));
      localStorage.setItem("token", token);
    } catch (e) {
      handleErrors(dispatch, e);
    }
  };
};

export const auth = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${API_URL}/auth/auth`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const { user, token } = response.data;
      dispatch(setUser(user));
      localStorage.setItem("token", token);
    } catch (e) {
      localStorage.removeItem("token");
    }
  };
};
