import React from "react";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#FFF5E4]">
      <div className="bg-white p-8 rounded shadow-md border border-[#C1D8C3] text-center">
        <h2 className="text-3xl font-bold text-[#6A9C89] mb-4">🎉 Order Placed!</h2>
        <p className="text-[#FFA725] text-lg mb-6">Thank you for your purchase.</p>
        <Link
          to="/"
          className="inline-block bg-[#FFA725] text-white px-6 py-2 rounded hover:bg-[#6A9C89] transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
