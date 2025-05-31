import React, { useState } from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { clearCart } from "../redux/slices/cartSlice";

import { BellIcon as BellSolid } from "@heroicons/react/24/solid";
import { Squares2X2Icon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { ShoppingCartIcon as ShoppingCartSolid } from "@heroicons/react/24/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state) => state.auth.token);
  const cartItemsCount = useSelector((state) =>
    state.cart.reduce((total, item) => total + item.quantity, 0)
  );
  const wishlistCount = useSelector((state) => state.wishlist.items.length);
  const notifications = useSelector((state) => state.notification.notifications);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate("/login");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  return (
    <nav className="bg-[#FFA725] text-[#FFF5E4] py-4 px-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center flex-wrap gap-4">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img src={logo} alt="Logo" className="w-24 rounded-2xl" />
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="flex items-center">
          <input
            type="text"
            placeholder="Search Products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-[#FFF5E4] px-3 py-2 w-84 rounded-l-md text-black hover:bg-[#C1D8C3] transition outline-none focus:ring-2 focus:ring-[#FFA725]"
          />
          <button
            type="submit"
            className="bg-[#FFF5E4] text-[#FFA725] px-3 py-2 rounded-r-md hover:bg-[#C1D8C3] transition -ml-1"
          >
            <MagnifyingGlassIcon className="w-8 h-6 text-current" />
          </button>
        </form>

        {/* Icons and Auth */}
        <div className="flex items-center space-x-10 text-lg">
          {/* Products */}
          <Link to="/" className="relative hover:text-[#C1D8C3]" title="Products">
            <Squares2X2Icon className="h-8 w-8 text-white-700" />
          </Link>

          {/* Notifications */}
          <Link to="/notifications" className="relative hover:text-[#C1D8C3]" title="Notifications">
            <BellSolid className="h-8 w-8 text-white-700" />
            {unreadCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </Link>

          {/* Wishlist */}
          <Link to="/wishlist" className="relative hover:text-[#C1D8C3]" title="Wishlist">
            <HeartSolid className="h-8 w-8 text-white-700" />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-pink-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link to="/cart" className="relative hover:text-[#C1D8C3]" title="Cart">
            <ShoppingCartSolid className="h-8 w-8 text-white-700" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-green-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}
          </Link>

          {/* Auth Button */}
          {!token ? (
            <Link
              to="/login"
              className="bg-[#FFF5E4] text-[#FFA725] px-4 py-2 rounded-md hover:bg-[#C1D8C3] transition"
            >
              Login
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-[#6A9C89] px-4 py-2 rounded-md hover:bg-[#C1D8C3] transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;











