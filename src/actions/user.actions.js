import axios from "axios";
import { setUser } from "../reducers/userReducer";
import { API_URL } from "../config";

export const register = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        email,
        password,
      });
      return response;
    } catch (error) {
      throw new Error(error.response.data.message);
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
      return response;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };
};

export const auth = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${API_URL}/auth/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      dispatch(setUser(response.data.user));
      return response;
    } catch (error) {
      localStorage.removeItem("token");
      console.error(error.response.data.message)
      // throw new Error(error.response.data.message);
    }
  };
};
