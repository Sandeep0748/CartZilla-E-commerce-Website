import React, { useEffect, useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { ArrowRight } from "lucide-react";

const Banner = () => {
  const [offsetY, setOffsetY] = useState(0);

  const handleScroll = () => {
    setOffsetY(window.pageYOffset);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="relative h-64 sm:h-80 md:h-96 flex flex-col items-center justify-center text-white text-center overflow-hidden"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1350&q=80')`,
        backgroundAttachment: window.innerWidth < 768 ? "scroll" : "fixed",
        backgroundPosition: `center ${offsetY * 0.4}px`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Text + CTA */}
      <div className="relative z-10 px-4">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4">
          Welcome to Our Store
        </h1>

        <ScrollLink
          to="products-section"
          smooth={true}
          duration={600}
          offset={-60}
        >
          <button className="flex items-center gap-2 bg-[#FFA725] text-white px-6 py-3 rounded-md hover:bg-[#6A9C89] transition duration-300">
            Shop Now
            <ArrowRight size={20} />
          </button>
        </ScrollLink>
      </div>
    </div>
  );
};

export default Banner;





