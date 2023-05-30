import React, { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import { API_AUTH } from "./conts";
import { useNavigate } from "react-router-dom";

const authContext = createContext();

export const useAuth = () => useContext(authContext);

const INIT_STATE = {
  user: {},
  error: null,
};

function reducer(state = INIT_STATE, action) {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const navigate = useNavigate();

  const register = async (user) => {
    try {
      const res = await axios.post(`${API_AUTH}/register/`, user);
      console.log(`${API_AUTH}/register/`);
      console.log(res);
      navigate("/login");
    } catch (error) {
      console.log(error, "error");
      dispatch({
        type: "SET_ERROR",
        payload: error.response.data,
      });
    }
  };

  const login = async (user) => {
    try {
      let res = await axios.post(`${API_AUTH}/login/`, user);
      console.log(res);
      localStorage.setItem("token", JSON.stringify(res.data));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const checkAuth = async () => {
    try {
      let token = JSON.parse(localStorage.getItem("token"));
      let res = await axios.post(`${API_AUTH}/token/refresh/`, {
        refresh: token.refresh,
      });
      console.log(res.data);
      localStorage.setItem(
        "token",
        JSON.stringify({ refresh: token.refresh, access: res.data.access })
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      checkAuth();
    }
  }, []);

  function logout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  let values = {
    register,
    login,
    logout,
  };

  return <authContext.Provider value={values}>{children}</authContext.Provider>;
};

export default AuthContextProvider;
