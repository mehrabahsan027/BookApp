import { Link } from "react-router";
import { useBooks } from "../../context/BookContext";

const Cart = () => {
  const { cartItems, removeFromCart,cartNumber } = useBooks();

  
  

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Shopping Cart</h2>
        
        {cartItems.length === 0 ? (
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <p className="text-gray-600 text-lg">Your cart is empty.</p>
            <Link
              to={"/books"}
              className="mt-4 inline-block bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {cartItems.map(item => (
                <li
                  key={item._id}
                  className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-6 hover:bg-gray-50"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-16 h-24 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
                    <div className="mt-1 flex items-center gap-4">
                      <p className="text-gray-600">
                        ${item.price.toFixed(2)} × {item.quantity}
                      </p>
                      <p className="text-indigo-600 font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <div className="border-t border-gray-200 p-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900">Total</h3>
                <p className="text-2xl font-bold text-indigo-600">
                  ${totalPrice.toFixed(2)}
                </p>
              </div>
              <button className="mt-4 w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition-colors">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;