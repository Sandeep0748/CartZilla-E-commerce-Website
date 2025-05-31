import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const isInCart = cart.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const handleGoToCart = () => {
    navigate("/cart");
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 text-black">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-40 object-contain mb-2"
      />
      <h3 className="text-lg font-semibold">{product.title}</h3>
      <p className="text-sm text-gray-600 line-clamp-3">{product.description}</p>
      <p className="mt-2 font-bold text-[#FFA725]">${product.price}</p>

      {isInCart ? (
        <button
          onClick={handleGoToCart}
          className="mt-2 w-full bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 transition"
        >
          Go to Cart
        </button>
      ) : (
        <button
          onClick={handleAddToCart}
          className="mt-2 w-full bg-[#FFA725] text-white px-4 py-1 rounded hover:bg-[#C1D8C3] transition"
        >
          Add to Cart
        </button>
      )}
    </div>
  );
};

export default ProductCard;





