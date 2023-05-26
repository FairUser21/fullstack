import React, { createContext, useContext, useReducer } from "react";
import axios from "axios";
import { API_AUTH } from "./conts";

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

  const register = async (user) => {
    const res = await axios.post(`${API_AUTH}/register/`, user);
    console.log(`${API_AUTH}/register/`);
    console.log(res);
  };

  let values = {
    register,
  };

  return <authContext.Provider value={values}>{children}</authContext.Provider>;
};

export default AuthContextProvider;
