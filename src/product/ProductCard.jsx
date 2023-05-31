import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useProduct } from "../contexts/ProductContextProvider";
import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";

export default function ProductCard({ item }) {
  const { deleteProduct, toggleLike } = useProduct();

  return (
    <Card sx={{ width: 345, margin: "3%" }}>
      <CardMedia sx={{ height: 140 }} image={item.image} alt={item.title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item.description}
        </Typography>
        <Typography variant="body2" color="error">
          {item.author}
        </Typography>
        <Typography variant="body2">{item.price}</Typography>
      </CardContent>
      <CardActions>
        <Typography variant="body2" color="text.secondary">
          {item.likes}
        </Typography>
        {item.is_author ? (
          <>
            <Button size="small" onClick={() => deleteProduct(item.id)}>
              Delete
            </Button>
            <Link to={`/edit/${item.id}`}>
              <Button size="small">Edit</Button>
            </Link>
          </>
        ) : (
          <IconButton onClick={() => toggleLike(item.id)}>
            <FavoriteIcon color={item.liked_by_user ? "error" : ""} />
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
}
