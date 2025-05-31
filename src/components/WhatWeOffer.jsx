import React from "react";

const WhatWeOffer = () => {
  return (
    <div className="bg-[#fefcf3] py-12 px-4 sm:px-6 lg:px-8 mt-10 border-t border-[#C1D8C3]">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-10 text-[#6A9C89]">Why Shop With Us</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md border border-[#C1D8C3]">
            <h3 className="text-xl font-semibold text-[#FFA725] mb-2">🚚 Free Shipping</h3>
            <p className="text-gray-600">Free shipping on all orders. No minimum spend!</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border border-[#C1D8C3]">
            <h3 className="text-xl font-semibold text-[#FFA725] mb-2">🔄 Free Returns</h3>
            <p className="text-gray-600">Return any product within 30 days—no questions asked.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border border-[#C1D8C3]">
            <h3 className="text-xl font-semibold text-[#FFA725] mb-2">📞 24/7 Support</h3>
            <p className="text-gray-600">We’re here for you anytime, day or night.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatWeOffer;

