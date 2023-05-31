import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useProduct } from "../contexts/ProductContextProvider";
import { useParams } from "react-router-dom";

const EditProduct = () => {
  const { oneProduct, getOneProduct, category, getCategories, editProduct } =
    useProduct();
  const { id } = useParams();
  const [product, setProduct] = useState(oneProduct);

  useEffect(() => {
    getOneProduct(id);
  }, []);

  useEffect(() => {
    setProduct(oneProduct);
  }, [oneProduct]);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setProduct({
        ...product,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setProduct({
        ...product,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSave = () => {
    let formData = new FormData();
    formData.append("title", product.title);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("category", product.category);
    // formData.append("image", product.image);

    editProduct(formData, id);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Box sx={{ width: "40vw", m: "auto" }}>
      <Typography>EDIT PRODUCT - {product.title}</Typography>
      <TextField
        sx={{ m: 1 }}
        label="Title"
        variant="outlined"
        fullWidth
        name="title"
        value={product.title}
        onChange={handleChange}
      />
      <TextField
        sx={{ m: 1 }}
        label="Description"
        variant="outlined"
        fullWidth
        name="description"
        value={product.description}
        onChange={handleChange}
      />
      <TextField
        sx={{ m: 1 }}
        label="Price"
        variant="outlined"
        fullWidth
        name="price"
        value={product.price}
        onChange={handleChange}
      />
      <FormControl fullWidth>
        <InputLabel>Category</InputLabel>
        <Select
          name="category"
          label="Category"
          value={product.category}
          onChange={handleChange}
        >
          {category.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        sx={{ m: 1 }}
        type="file"
        name="image"
        onChange={handleChange}
      />
      <Button
        sx={{ m: 1 }}
        fullWidth
        variant="outlined"
        size="large"
        onClick={handleSave}
      >
        Add product
      </Button>
    </Box>
  );
};

export default EditProduct;
