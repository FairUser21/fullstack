import React, { useEffect, useState } from "react";
import { useProduct } from "../contexts/ProductContextProvider";
import { Box, Pagination } from "@mui/material";
import ProductCard from "./ProductCard";
import { useSearchParams } from "react-router-dom";

const ProductsList = () => {
  const { products, getProducts, totalPage } = useProduct();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    setSearchParams({
      page: currentPage,
    });
  }, [currentPage]);

  useEffect(() => {
    getProducts();
  }, [searchParams]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {products.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </Box>
      <Box>
        <Pagination
          count={totalPage}
          page={currentPage}
          variant="outlined"
          onChange={(e, p) => setCurrentPage(p)}
        />
      </Box>
    </Box>
  );
};

export default ProductsList;
