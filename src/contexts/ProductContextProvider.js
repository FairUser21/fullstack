import axios from "axios";
import React, { createContext, useContext, useReducer } from "react";
import { act } from "react-dom/test-utils";
import { API_CATEGORY, API_PRODUCTS } from "./conts";
import { useNavigate } from "react-router-dom";

const productContext = createContext();

export const useProduct = () => useContext(productContext);

const INIT_STATE = {
  products: [],
  oneProduct: {},
  totalPage: 0,
  category: [],
};

function reducer(state = INIT_STATE, action) {
  switch (action.type) {
    case "GET_PRODUCTS":
      return { ...state, products: action.payload };
    case "GET_ONE_PRODUCT":
      return { ...state, oneProduct: action.payload };
    case "GET_TOTAL_PAGE":
      return { ...state, totalPage: action.payload };
    case "GET_CATEGORY":
      return { ...state, category: action.payload };
    default:
      return state;
  }
}

function getAuth() {
  const token = JSON.parse(localStorage.getItem("token"));
  const Authorization = `Bearer ${token.access}`;
  const config = {
    headers: {
      Authorization,
    },
  };
  return config;
}

const ProductContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  const navigate = useNavigate();

  const getProducts = async () => {
    try {
      const config = getAuth();
      const res = await axios(
        `${API_PRODUCTS}/${window.location.search}`,
        config
      );
      console.warn(res.data.results);
      dispatch({
        type: "GET_PRODUCTS",
        payload: res.data.results,
      });

      dispatch({
        type: "GET_TOTAL_PAGE",
        payload: Math.ceil(res.data.count / 6),
      });
    } catch (error) {
      console.log(error);
    }
  };

  async function addProduct(product) {
    try {
      const config = getAuth();
      const res = await axios.post(`${API_PRODUCTS}/`, product, config);

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  async function getCategories() {
    try {
      const res = await axios(`${API_CATEGORY}/list/`);
      dispatch({
        type: "GET_CATEGORY",
        payload: res.data.results,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteProduct(id) {
    try {
      const config = getAuth();
      const res = await axios.delete(`${API_PRODUCTS}/${id}/`, config);

      getProducts();
    } catch (error) {
      console.log(error);
    }
  }

  async function toggleLike(id) {
    try {
      const config = getAuth();
      const res = await axios(`${API_PRODUCTS}/${id}/toggle_like/`, config);
      getProducts();
    } catch (error) {
      console.log(error);
    }
  }

  async function getOneProduct(id) {
    try {
      const res = await axios(`${API_PRODUCTS}/${id}/`);
      dispatch({
        type: "GET_ONE_PRODUCT",
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function editProduct(product, id) {
    try {
      const config = getAuth();
      const res = await axios.patch(`${API_PRODUCTS}/${id}/`, product, config);
      getProducts();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  let values = {
    products: state.products,
    totalPage: state.totalPage,
    category: state.category,
    oneProduct: state.oneProduct,
    getProducts,
    addProduct,
    getCategories,
    deleteProduct,
    toggleLike,
    getOneProduct,
    editProduct,
  };

  return (
    <productContext.Provider value={values}>{children}</productContext.Provider>
  );
};

export default ProductContextProvider;
