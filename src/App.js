import { Route, Routes } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import ProductsList from "./product/ProductsList";
import AddProduct from "./product/AddProduct";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<ProductsList />} />
        <Route path="/add" element={<AddProduct />} />
      </Routes>
    </div>
  );
}

export default App;
