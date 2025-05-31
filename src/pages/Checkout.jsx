import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { clearCart, removeFromCart } from "../redux/slices/cartSlice";
import { clearBuyNow } from "../redux/slices/buyNowSlice";

const Checkout = () => {
  const cart = useSelector((state) => state.cart);
  const buyNowItem = useSelector((state) => state.buyNow); // Single product for buy now
  const token = useSelector((state) => state.auth.token);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [orderPlaced, setOrderPlaced] = useState(false);

  // If buyNowItem exists, only checkout that item; else checkout all cart items
  const productsToBuy = buyNowItem ? [buyNowItem] : cart;

  const total = productsToBuy.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  useEffect(() => {
    if (!token) {
      toast.info("Please log in to proceed to checkout.");
      navigate("/login", { state: { from: location.pathname } });
    }

    if (!orderPlaced && productsToBuy.length === 0) {
      navigate("/cart");
    }
  }, [token, productsToBuy.length, navigate, location.pathname, orderPlaced]);

  const handleConfirmOrder = () => {
    if (!token) {
      toast.warning("You must log in to place an order.");
      navigate("/login", { state: { from: location.pathname } });
      return;
    }

    if (buyNowItem) {
      dispatch(removeFromCart(buyNowItem.id)); // Remove only this item from cart
    } else {
      dispatch(clearCart()); // If it's a cart checkout, clear all
    }

    dispatch(clearBuyNow());

    setOrderPlaced(true);
    navigate("/order-success");
  };

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <h2 className="text-3xl font-bold text-center mb-6 text-[#FFA725]">
        Checkout
      </h2>

      {productsToBuy.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">Your cart is empty.</p>
      ) : (
        <>
          <ul className="divide-y divide-gray-300 mb-6">
            {productsToBuy.map((item) => (
              <li key={item.id} className="py-4 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-[#6A9C89]">
                    {item.title}
                  </h3>
                  <p className="text-[#FFA725] font-bold">
                    {item.quantity} x ${item.price}
                  </p>
                </div>
                <span className="text-lg font-semibold text-gray-700">
                  ${(item.quantity * item.price).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>

          <div className="mb-6 border-t border-gray-300 pt-4">
            <h3 className="text-xl font-bold text-right text-[#FFA725]">
              Total: ${total.toFixed(2)}
            </h3>
          </div>

          <div className="bg-[#FFF5E4] p-6 rounded-lg shadow-md border border-[#C1D8C3]">
            <p className="text-center text-gray-600">
              Payment and shipping details form will go here.
            </p>

            <button
              onClick={handleConfirmOrder}
              className="mt-6 w-full bg-[#FFA725] text-[#FFF5E4] px-4 py-2 rounded-md hover:bg-[#6A9C89] transition"
            >
              Confirm Order
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Checkout;

