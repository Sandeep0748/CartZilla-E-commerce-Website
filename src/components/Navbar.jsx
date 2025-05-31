import React, { useState } from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { clearCart } from "../redux/slices/cartSlice";

import {
  BellIcon as BellSolid,
  Squares2X2Icon,
  HeartIcon as HeartSolid,
  ShoppingCartIcon as ShoppingCartSolid,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
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
  const [menuOpen, setMenuOpen] = useState(false);

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
      setMenuOpen(false);
    }
  };

  return (
    <nav className="bg-[#FFA725] text-[#FFF5E4] py-4 px-4 shadow-md">
      <div className="container mx-auto max-w-screen-xl flex justify-between items-center flex-wrap">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img src={logo} alt="Logo" className="w-20 rounded-2xl" />
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <XMarkIcon className="h-8 w-8" />
          ) : (
            <Bars3Icon className="h-8 w-8" />
          )}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {/* Search */}
          <form onSubmit={handleSearchSubmit} className="flex items-center w-full max-w-md">
            <input
              type="text"
              placeholder="Search Products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#FFF5E4] px-3 py-2 w-full rounded-l-md text-black hover:bg-[#C1D8C3] transition outline-none focus:ring-2 focus:ring-[#FFA725]"
            />
            <button
              type="submit"
              className="bg-[#FFF5E4] text-[#FFA725] px-3 py-2 rounded-r-md hover:bg-[#C1D8C3] transition -ml-1"
            >
              <MagnifyingGlassIcon className="w-6 h-6 text-current" />
            </button>
          </form>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <Link to="/" title="Products" className="p-1.5 rounded-full hover:bg-[#C1D8C3]">
              <Squares2X2Icon className="h-6 w-6" />
            </Link>

            <Link to="/notifications" className="relative p-1.5 rounded-full hover:bg-[#C1D8C3]">
              <BellSolid className="h-6 w-6" />
              {unreadCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </Link>

            <Link to="/wishlist" className="relative p-1.5 rounded-full hover:bg-[#C1D8C3]">
              <HeartSolid className="h-6 w-6" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-pink-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link to="/cart" className="relative p-1.5 rounded-full hover:bg-[#C1D8C3]">
              <ShoppingCartSolid className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-green-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>

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
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden z-50 mt-4 space-y-4 text-center py-4 px-4 rounded-lg shadow-lg bg-[#FFA725]">
          {/* Search */}
          <form onSubmit={handleSearchSubmit} className="flex justify-center">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#FFF5E4] text-black px-3 py-2 w-5/6 max-w-xs rounded-l-md"
            />
            <button
              type="submit"
              className="bg-[#FFF5E4] text-[#FFA725] px-3 py-2 rounded-r-md -ml-1"
            >
              <MagnifyingGlassIcon className="w-6 h-6" />
            </button>
          </form>

          {/* Icons */}
          <div className="flex justify-center gap-6 text-white">
            <Link to="/" onClick={() => setMenuOpen(false)}>
              <Squares2X2Icon className="h-7 w-7" />
            </Link>
            <Link to="/notifications" onClick={() => setMenuOpen(false)} className="relative">
              <BellSolid className="h-7 w-7" />
              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </Link>
            <Link to="/wishlist" onClick={() => setMenuOpen(false)} className="relative">
              <HeartSolid className="h-7 w-7" />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link to="/cart" onClick={() => setMenuOpen(false)} className="relative">
              <ShoppingCartSolid className="h-7 w-7" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </div>

          {/* Auth */}
          <div>
            {!token ? (
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="inline-block bg-[#FFF5E4] text-[#FFA725] px-4 py-2 rounded-md hover:bg-[#C1D8C3] transition"
              >
                Login
              </Link>
            ) : (
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="bg-[#6A9C89] px-4 py-2 rounded-md hover:bg-[#C1D8C3] transition"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;












