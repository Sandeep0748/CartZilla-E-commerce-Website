import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/slices/productSlice";
import { addToCart } from "../redux/slices/cartSlice";
import { setBuyNowItem } from "../redux/slices/buyNowSlice";
import { addToWishlist, removeFromWishlist } from "../redux/slices/wishlistSlice";

import {
  ShoppingCartIcon as ShoppingCartSolid,
  ShoppingBagIcon,
  HeartIcon as HeartOutline,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items, status } = useSelector((state) => state.products);
  const cart = useSelector((state) => state.cart);
  const wishlist = useSelector((state) => state.wishlist.items);

  const product = items.find((item) => item.id.toString() === id);

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, items.length]);

  if (status === "loading") {
    return <p className="text-center mt-10 text-gray-500 text-xl">Loading product details...</p>;
  }

  if (!product) {
    return <p className="text-center mt-10 text-red-500 text-xl">Product not found.</p>;
  }

  const isInCart = cart.some((item) => item.id === product.id);
  const isInWishlist = wishlist.some((item) => item.id === product.id);

  const reviews = { rating: 4.5, count: 134 };
  const paymentOptions = ["Credit Card", "Debit Card", "Cash on Delivery", "UPI"];
  const offers = [
    "10% off on using ABC bank credit card",
    "Free shipping on orders over $50",
  ];
  const deliveryBy = "Delivered by June 5, 2025";
  const keyFeatures = [
    "High-quality material",
    "Eco-friendly packaging",
    "2-year warranty",
    "Available in multiple colors",
  ];

  return (
    <div className="container mx-auto p-6">
      <div className="relative flex flex-col md:flex-row gap-8 items-start border border-[#C1D8C3] bg-[#FFF5E4] p-6 rounded-lg shadow-lg">

        {/* Wishlist Heart Icon */}
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={() =>
              isInWishlist
                ? dispatch(removeFromWishlist(product.id))
                : dispatch(addToWishlist(product))
            }
            className="transition duration-200"
          >
            {isInWishlist ? (
              <HeartSolid className="h-8 w-8 text-pink-500 hover:scale-110 transition-transform duration-200" />
            ) : (
              <HeartOutline className="h-8 w-8 text-gray-400 hover:text-pink-500 hover:scale-110 transition-transform duration-200" />
            )}
          </button>
        </div>

        <img
          src={product.image}
          alt={product.title}
          className="w-full md:w-1/2 h-96 object-contain"
        />

        <div className="flex-1 flex flex-col gap-4">
          <h2 className="text-3xl font-bold mb-2 text-[#6A9C89]">{product.title}</h2>
          <p className="text-[#FFA725] font-bold text-2xl">${product.price}</p>
          {product.units && <p className="text-gray-600">Units available: {product.units}</p>}

          <div className="flex items-center gap-2">
            <span className="text-yellow-500 font-bold">
              {"★".repeat(Math.floor(reviews.rating))}
              {reviews.rating % 1 ? "½" : ""}
            </span>
            <span className="text-gray-700">({reviews.count} reviews)</span>
          </div>

          <div className="bg-yellow-100 p-3 rounded-md">
            <h3 className="font-semibold text-lg mb-1">Offers:</h3>
            <ul className="list-disc list-inside text-sm text-[#6A9C89]">
              {offers.map((offer, idx) => (
                <li key={idx}>{offer}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-1">Payment Options:</h3>
            <div className="flex flex-wrap gap-3 text-sm">
              {paymentOptions.map((option, idx) => (
                <span
                  key={idx}
                  className="bg-green-200 text-green-800 px-3 py-1 rounded-full"
                >
                  {option}
                </span>
              ))}
            </div>
          </div>

          <p className="text-gray-700 italic">{deliveryBy}</p>

          <div>
            <h3 className="font-semibold text-lg mb-1">Product Description:</h3>
            <p className="text-gray-700">{product.description}</p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-1">Key Features:</h3>
            <ul className="list-disc list-inside text-gray-700">
              {keyFeatures.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-4 flex-wrap">
            {isInCart ? (
              <button
                onClick={() => navigate("/cart")}
                className="bg-teal-600 text-white px-5 py-2 rounded-md hover:bg-teal-700 transition flex items-center justify-center gap-2"
              >
                <span>Go to Cart</span>
                <ShoppingCartSolid className="h-5 w-5 text-white" />
              </button>
            ) : (
              <button
                onClick={() => dispatch(addToCart(product))}
                className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700 transition flex items-center justify-center gap-2"
              >
                <ShoppingCartSolid className="h-5 w-5 text-white" />
                <span>Add to Cart</span>
              </button>
            )}

            <button
              onClick={() => {
                dispatch(setBuyNowItem({ ...product, quantity: 1 }));
                navigate("/checkout");
              }}
              className="bg-yellow-500 text-white px-5 py-2 rounded-md hover:bg-yellow-600 transition flex items-center justify-center gap-2"
            >
              <ShoppingBagIcon className="h-5 w-5" />
              <span>Buy Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;




