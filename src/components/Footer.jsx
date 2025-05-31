import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      className="bg-gray-900 text-white py-10 px-6"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-4">Quick Links</h3>
          <ul>
            <li><a href="/" className="hover:text-yellow-400">Products</a></li>
            <li><a href="/wishlist" className="hover:text-yellow-400">Wishlist</a></li>
            <li><a href="/cart" className="hover:text-yellow-400">Cart</a></li>
          </ul>
        </div>

        {/* About */}
        <div>
          <h3 className="font-semibold mb-4">About Us</h3>
          <p className="text-gray-400">
            We are committed to providing the best products and shopping experience. Shop with confidence and style!
          </p>
        </div>

        {/* Newsletter Subscribe */}
        <div>
          <h3 className="font-semibold mb-4">Subscribe to our Newsletter</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Subscribed!");
            }}
          >
            <input
              type="email"
              placeholder="Your email"
              required
              className="w-full p-2 rounded mb-2 text-white"
            />
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded font-semibold"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-4">Contact Us</h3>
          <p>Phone: +1 234 567 890</p>
          <p>Email: supportcartzilla@example.com</p>
          <p>Address: 123 Park St, Banglore, India</p>
        </div>
      </div>

      <div className="text-center text-gray-500 mt-8">
        &copy; {new Date().getFullYear()} CartZilla. All rights reserved.
      </div>
    </motion.footer>
  );
};

export default Footer;

