import React, { useEffect } from "react";
import { useProduct } from "../contexts/ProductContextProvider";
import { Box } from "@mui/material";
import ProductCard from "./ProductCard";

const ProductsList = () => {
  const { products, getProducts } = useProduct();

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {products.map((item) => (
          <ProductCard item={item} />
        ))}
      </Box>
    </Box>
  );
};

export default ProductsList;
