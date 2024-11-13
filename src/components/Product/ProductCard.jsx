// ProductCard.jsx
import React, { useContext } from "react";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import { CartContext } from "../contexts/CartProvider";

const ProductCard = ({ product }) => {
  const {
    id,
    name,
    price,
    brand,
    description,
    rating,
    stock,
    category,
    image_url,
  } = product;

  const { addToCart } = useContext(CartContext); // Access addToCart from CartContext

   // Add product to the cart when the button is clicked
   const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="bg-white rounded-lg shadow-md flex flex-col h-full border border-gray-200">
      <div className="relative h-48 overflow-hidden rounded-t-lg">
        <img
          src={image_url}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <span className="absolute top-2 right-2 bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm">
          {category}
        </span>
      </div>

      <div className="p-4 flex-grow">
        <h2 className="text-lg font-bold line-clamp-2 mb-2">{name}</h2>
        <p className="text-sm text-gray-500 mb-2">Brand: {brand}</p>
        <p className="text-sm text-gray-600 line-clamp-2 mb-4">{description}</p>
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm">{rating}</span>
          <span className="text-sm text-gray-500 ml-4">Stock: {stock}</span>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-3 border-t border-gray-100">
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold">${price.toFixed(2)}</span>
          {/* Add to Cart onClick handler */}
          <button onClick={handleAddToCart} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Add to Cart
          </button>
        </div>
        <Link
          to={`/product/${id}`}
          className="block w-full text-center py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
