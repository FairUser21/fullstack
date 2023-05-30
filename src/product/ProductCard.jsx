import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function ProductCard({ item }) {
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
        <Button size="small">Delete</Button>
        <Button size="small">Edit</Button>
      </CardActions>
    </Card>
  );
}