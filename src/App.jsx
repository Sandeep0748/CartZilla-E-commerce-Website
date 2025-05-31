import React from "react";
import { Routes, Route } from "react-router-dom";

// Layout Components
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import Footer from "./components/Footer";
import WhatWeOffer from "./components/WhatWeOffer";
import ProductCategory from "./components/ProductCategory";

// Page Components
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Wishlist from "./pages/Wishlist";
import SearchResults from "./components/SearchResults";
import OrderSuccess from "./pages/OrderSuccess";
import Notifications from "./components/Notification";

const App = () => {
  return (
    <div className="bg-[#f5f5f5] min-h-screen text-black">
      {/* Global Navbar */}
      <Navbar />

      {/* Routes */}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Banner />
              <ProductCategory />
              <Products />
              <WhatWeOffer />
              <Footer />
            </>
          }
        />

        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/notifications" element={<Notifications />} />
      </Routes>
    </div>
  );
};

export default App;








