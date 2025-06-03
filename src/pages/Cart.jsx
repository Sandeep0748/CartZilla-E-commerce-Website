import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// TODO: Import removeFromCart, increaseQuantity, and decreaseQuantity actions from cartSlice
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../redux/slices/cartSlice";

const Cart = () => {
  // TODO: Get cart items from Redux Store using useSelector
  const cart = useSelector((state) => state.cart);
  // TODO: Initialize useDispatch for dispatching actions
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Calculate total quantity of items in cart
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6 text-[#FFA725]">Shopping Cart</h2>

      {cart.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">Your cart is empty.</p>
      ) : (
        <>
          <div className="flex flex-col gap-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-[#FFF5E4] p-4 rounded-lg shadow-md border border-[#C1D8C3]"
              >
                {/* Product Image & Details */}
                <div className="flex items-center gap-4 w-2/3">
                  <img
                    src={item.image}
                    alt={item.title || "Product image"}
                    className="w-16 h-16 object-contain"
                  />
                  <div className="flex flex-col">
                    <h3 className="text-lg font-semibold text-[#6A9C89] h-[48px] overflow-hidden">
                      {item.title}
                    </h3>
                    <p className="text-[#FFA725] font-bold">${item.price}</p>
                  </div>
                </div>

                {/* TODO: Implement Quantity Controls - Increase & Decrease */}
                <div className="flex items-center gap-2 w-1/3 justify-center">
                  <button
                    onClick={() => dispatch(decreaseQuantity(item.id))}
                    disabled={item.quantity === 1}
                    className={`px-3 py-1 rounded-md transition text-white ${
                      item.quantity === 1
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-[#FFA725] hover:bg-[#C1D8C3]"
                    }`}
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="text-lg font-bold w-6 text-center">{item.quantity}</span>
                  <button
                    onClick={() => dispatch(increaseQuantity(item.id))}
                    className="bg-[#FFA725] text-white px-3 py-1 rounded-md hover:bg-[#C1D8C3] transition"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* TODO: Implement Remove Button Functionality */}
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
                  aria-label="Remove item"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Proceed to Buy button with item count */}
          <div className="mt-10 bg-[#FFF5E4] p-6 rounded-lg shadow-md border border-[#C1D8C3] max-w-lg mx-auto text-center">
            <button
              onClick={() => navigate("/checkout")}
              className="w-full bg-[#FFA725] text-[#FFF5E4] px-4 py-3 rounded-md hover:bg-[#6A9C89] transition"
            >
              Proceed to Buy ({totalItems})
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;





