import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, setSelectedCategory } from "../redux/slices/productSlice";

const ProductCategory = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.products.categories);
  const selectedCategory = useSelector((state) => state.products.selectedCategory);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div
      className="flex gap-4 p-4 overflow-x-auto whitespace-nowrap scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-500 scrollbar-track-gray-300"
      style={{
        scrollBehavior: "smooth",
        WebkitOverflowScrolling: "touch",
      }}
    >
      {/* "All" category button */}
      <button
        className={`inline-block px-4 py-2 rounded-full ${
          selectedCategory === "all" ? "bg-gray-600 text-white" : "bg-gray-200"
        }`}
        onClick={() => dispatch(setSelectedCategory("all"))}
      >
        All
      </button>

      {/* Dynamic category buttons */}
      {categories.map((category) => (
        <button
          key={category}
          className={`inline-block px-4 py-2 rounded-full capitalize ${
            selectedCategory === category ? "bg-gray-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => dispatch(setSelectedCategory(category))}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default ProductCategory;


