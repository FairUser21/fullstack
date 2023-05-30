import axios from "axios";
import React, { createContext, useContext, useReducer } from "react";
import { act } from "react-dom/test-utils";
import { API_PRODUCTS } from "./conts";

const productContext = createContext();

export const useProduct = () => useContext(productContext);

const INIT_STATE = {
  products: [],
  oneProduct: {},
  totalPage: 0,
};

function reducer(state = INIT_STATE, action) {
  switch (action.type) {
    case "GET_PRODUCTS":
      return { ...state, products: action.payload };
    case "GET_ONE_PRODUCT":
      return { ...state, oneProduct: action.payload };
    case "GET_TOTAL_PAGE":
      return { ...state, totalPage: action.payload };
    default:
      return state;
  }
}

const ProductContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const getProducts = async () => {
    try {
      const res = await axios(API_PRODUCTS);
      console.warn(res);
      dispatch({
        type: "GET_PRODUCTS",
        payload: res.data.results,
      });
    } catch (error) {
      console.log(error);
    }
  };

  let values = {
    products: state.products,
    getProducts,
  };

  return (
    <productContext.Provider value={values}>{children}</productContext.Provider>
  );
};

export default ProductContextProvider;
