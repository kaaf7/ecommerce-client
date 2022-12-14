import React from "react";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Register from "./pages/Register";
import Favorites from "./pages/Favorites";
import { useSelector } from "react-redux";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const user = useSelector((state) => state.user.currentUser);
  const registeration = useSelector((state) => state.user.registerationSuccess);
  user ? console.log(user.username) : console.log("user is not logged in");

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="products/:id" element={<ProductPage />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/products/men" element={<Products />} />
        <Route exact path="/products/women" element={<Products />} />
        <Route exact path="/products/favorite" element={<Favorites />} />
        <Route exact path="/products/new" element={<Products />} />
        <Route exact path="/cart/:id" element={<Cart />} />
        <Route exact path="/login" element={user ? <Home /> : <Login />} />
        <Route
          exact path="/register"
          element={registeration ? <Products /> : <Register />}
        />
      </Routes>
    </Router>
  );
}

export default App;
