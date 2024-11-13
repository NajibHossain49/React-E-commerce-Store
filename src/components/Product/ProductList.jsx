// ProductList.jsx
import React from "react";
import { useLoaderData } from "react-router-dom";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const products = useLoaderData(); // Fetch data from the loader

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
