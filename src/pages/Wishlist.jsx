 import React from "react";
import { useDispatch, useSelector } from "react-redux";
// TODO: Import removeFromWishlist and moveToCart actions from wishlistSlice
import { removeFromWishlist, moveToCart } from "../redux/slices/wishlistSlice";

const Wishlist = () => {
  // TODO: Get wishlist items from Redux Store using useSelector
  const wishlist = useSelector((state) => state.wishlist.items);

  // TODO: Initialize useDispatch for dispatching actions
  const dispatch = useDispatch();

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6 text-[#FFA725]">My Wishlist</h2>

      {wishlist.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">Your wishlist is empty.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-[#E9F8F9] p-4 rounded-lg shadow-md border border-[#C1D8C3]"
            >
              {/* Product Image & Details */}
              <div className="flex items-center gap-4 w-2/3">
                <img src={item.image} alt={item.title} className="w-16 h-16 object-contain" />
                <div className="flex flex-col">
                  <h3 className="text-lg font-semibold text-[#6A9C89] h-[48px] overflow-hidden">{item.title}</h3>
                  <p className="text-[#FFA725] font-bold">${item.price}</p>
                </div>
              </div>

              {/* Move to Cart Button */}
              <button
                onClick={() => dispatch(moveToCart(item))}
                className="bg-[#FFA725] text-white px-4 py-2 rounded-md hover:bg-[#C1D8C3] transition"
              >
                Move to Cart
              </button>

              {/* Remove Button */}
              <button
                onClick={() => dispatch(removeFromWishlist(item.id))}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
