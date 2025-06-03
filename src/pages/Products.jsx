import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// TODO: Import fetchProducts action from productSlice
import { fetchProducts } from "../redux/slices/productSlice";
// TODO: Import addToCart action from cartSlice
import { addToCart } from "../redux/slices/cartSlice";
import { addToWishlist, removeFromWishlist } from "../redux/slices/wishlistSlice";
import { setBuyNowItem } from "../redux/slices/buyNowSlice";
import { Link, useNavigate } from "react-router-dom";

import {
  ShoppingCartIcon as ShoppingCartSolid,
  HeartIcon as HeartOutline,
  ShoppingBagIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";

const Products = () => {
  // TODO: Initialize useDispatch for dispatching actions
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // TODO: Get products data and status from Redux store using useSelector
  const { items, status, selectedCategory } = useSelector((state) => state.products);
  const cart = useSelector((state) => state.cart);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  // TODO: Fetch products from API when component mounts
  useEffect(() => {
    // Dispatch fetchProducts action
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredProducts =
    selectedCategory === "all"
      ? items
      : items.filter((product) => product.category === selectedCategory);

  return (
    <div id="products-section" className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6 text-[#FFA725]">Products</h2>

      {/* Loading State */}
      {status === "loading" && <p className="text-center text-gray-500">Loading...</p>}
      {filteredProducts.length === 0 && status === "succeeded" && (
        <p className="text-center text-gray-500">No products found in this category.</p>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => {
          const isInCart = cart.some((item) => item.id === product.id);
          const isInWishlist = wishlistItems.some((item) => item.id === product.id);

          return (
            <div
              key={product.id}
              className="relative bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition flex flex-col justify-between border border-[#C1D8C3]"
            >
              {/* Favorite Icon (larger and better hover effect) */}
              <button
                onClick={() =>
                  isInWishlist
                    ? dispatch(removeFromWishlist(product.id))
                    : dispatch(addToWishlist(product))
                }
                className="absolute top-2 right-2 z-10 p-1 rounded-full hover:bg-pink-100 transition"
                aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
              >
                {isInWishlist ? (
                  <HeartSolid className="h-8 w-8 text-pink-500" />
                ) : (
                  <HeartOutline className="h-8 w-8 text-gray-400 hover:text-pink-400 transition" />
                )}
              </button>

              <div>
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-40 object-contain mb-4"
                />
                <h3 className="text-lg font-semibold h-14 overflow-hidden text-[#6A9C89]">
                  {product.title}
                </h3>
                <p className="text-[#FFA725] font-bold">${product.price}</p>
              </div>

              <div className="mt-3 flex flex-col gap-3">
                {/* View Details */}
                <Link to={`/products/${product.id}`}>
                  <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition flex items-center justify-center gap-2">
                    <MagnifyingGlassIcon className="h-5 w-5" />
                    <span>View Details</span>
                  </button>
                </Link>

                {/* TODO: Implement Add to Cart / Go to Cart functionality */}
                {isInCart ? (
                  <button
                    onClick={() => navigate("/cart")}
                    className="w-full bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition flex items-center justify-center gap-2"
                  >
                    <ShoppingCartSolid className="h-5 w-5 text-white" />
                    <span>Go to Cart</span>
                  </button>
                ) : (
                  <button
                    onClick={() => dispatch(addToCart(product))}
                    className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition flex items-center justify-center gap-2"
                  >
                    <ShoppingCartSolid className="h-5 w-5 text-white" />
                    <span>Add to Cart</span>
                  </button>
                )}

                {/* Buy Now */}
                <button
                  onClick={() => {
                    dispatch(setBuyNowItem({ ...product, quantity: 1 }));
                    navigate("/checkout");
                  }}
                  className="w-full bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition flex items-center justify-center gap-2"
                >
                  <ShoppingBagIcon className="h-5 w-5" />
                  <span>Buy Now</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;










