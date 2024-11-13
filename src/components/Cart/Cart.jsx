import React, { useContext } from 'react';
import { ShoppingCart, X } from 'lucide-react';
import { CartContext } from '../contexts/CartProvider';

const Cart = () => {
  const { cartItems, removeFromCart, total } = useContext(CartContext); // Access cartItems, removeFromCart, total from CartContext

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="border-b border-gray-200 pb-4 mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <ShoppingCart className="h-6 w-6" />
          Your Shopping Cart
        </h2>
      </div>

      {/* Content */}
      <div className="space-y-4">
        {cartItems.length === 0 ? (
          <div className="text-center py-8">
            <ShoppingCart className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">Your Shopping cart is empty</p>
          </div>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-200 mb-4"
            >
              <img
                src={item.image_url}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-md"
              />
              <div className="flex-1">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-gray-500">Brand: {item.brand}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="font-bold">${item.price.toFixed(2)}</span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="flex items-center gap-1 px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
                  >
                    <X className="h-4 w-4" />
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Total */}
      {cartItems.length > 0 && (
        <div className="border-t border-gray-200 pt-4 mt-6">
          <div className="flex justify-between items-center mb-6">
            <span className="text-lg font-medium">Total:</span>
            <span className="text-2xl font-bold">${total().toFixed(2)}</span>
          </div>
          <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors">
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;