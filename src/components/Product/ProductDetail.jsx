// ProductDetail.jsx
import React from "react";
import { useParams, useLoaderData, Link } from "react-router-dom";
import { Star, ArrowLeft } from "lucide-react";

const ProductDetail = () => {
  // Access dynamic URL parameter
  const { productId } = useParams();

  // Load products data
  const products = useLoaderData();
  // Confirm data loading in console (for troubleshooting)
  console.log(products); // Remove this in production

  // Find the product by matching ID types
  const product = products?.find((p) => p.id == Number(productId));

  // Render 'Product Not Found' if no matching product is found
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <Link to="/" className="text-blue-600 hover:underline">
            Return to Products
          </Link>
        </div>
      </div>
    );
  }

  // Destructure product details
  const {
    name,
    price,
    brand,
    description,
    rating,
    stock,
    category,
    image_url,
  } = product;

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        to="/"
        className="inline-flex items-center text-blue-600 hover:underline mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Products
      </Link>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="rounded-lg overflow-hidden">
          <img
            src={image_url}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Details */}
        <div>
          <span className="inline-block bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm mb-4">
            {category}
          </span>
          <h1 className="text-3xl font-bold mb-4">{name}</h1>
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <span className="text-lg font-medium">{rating}</span>
          </div>

          <div className="space-y-4 mb-6">
            <p className="text-2xl font-bold">${price.toFixed(2)}</p>
            <p className="text-gray-600">{description}</p>
            <p className="text-gray-600">
              Brand: <span className="font-medium">{brand}</span>
            </p>
            <p className="text-gray-600">
              Stock: <span className="font-medium">{stock} units</span>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button className="flex-grow py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Add to Cart
            </button>
            <button className="px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
              Save for Later
            </button>
          </div>

          {/* Additional Details */}
          <div className="mt-8 border-t border-gray-200 pt-8">
            <h2 className="font-bold text-xl mb-4">Product Details</h2>
            <ul className="space-y-3">
              <li className="flex">
                <span className="w-32 text-gray-500">Category:</span>
                <span>{category}</span>
              </li>
              <li className="flex">
                <span className="w-32 text-gray-500">Brand:</span>
                <span>{brand}</span>
              </li>
              <li className="flex">
                <span className="w-32 text-gray-500">Stock Status:</span>
                <span className={stock > 0 ? "text-green-600" : "text-red-600"}>
                  {stock > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </li>
              <li className="flex">
                <span className="w-32 text-gray-500">Rating:</span>
                <span>{rating} / 5</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
