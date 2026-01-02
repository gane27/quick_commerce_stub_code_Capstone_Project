import React, { useState } from "react";
import OrderConfirmation from "./OrderConfirmation";

const Cart = ({ cartItems, onRemove, onClear, onSubtract }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleCheckout = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5001/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ items: cartItems, total }),
      });
      const data = await res.json();
      if (res.ok) {
        setOrder({
          items: cartItems,
          total,
          orderId: data.processing?.orderId,
          warehouse: data.processing?.warehouse,
          hotspot: data.processing?.hotspot,
          pickingDelaySec: data.processing?.pickingDelaySec,
          deliveryDelaySec: data.processing?.deliveryDelaySec,
          totalDeliveryTimeSec: data.processing?.totalDeliveryTimeSec,
        });
        setShowConfirm(true);
      } else {
        setError(data.message || "Order failed");
      }
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };
  const handleCloseConfirm = () => {
    setShowConfirm(false);
    setOrder(null);
    onClear();
  };

  return (
    <>
      <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg p-6 z-50 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Cart</h2>
        {cartItems.length === 0 ? (
          <div className="text-gray-500">Your cart is empty.</div>
        ) : (
          <>
            <ul className="mb-4">
              {cartItems.map((item) => (
                <li
                  key={item._id}
                  className="flex items-center mb-2 border-b pb-2"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded mr-2"
                  />
                  <div className="flex-1">
                    <div className="font-semibold">{item.name}</div>
                    <div className="text-sm text-gray-600 flex items-center">
                      Qty: {item.qty}
                      <button
                        className="ml-2 px-2 py-1 bg-gray-200 rounded text-black hover:bg-gray-300"
                        onClick={() => onSubtract(item._id)}
                        disabled={item.qty <= 1}
                      >
                        -
                      </button>
                      <button
                        className="ml-2 px-2 py-1 bg-gray-200 rounded text-black hover:bg-gray-300"
                        onClick={() => onRemove(item._id)}
                      >
                        Remove
                      </button>
                    </div>
                    <div className="text-sm">${item.price} each</div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="font-bold mb-4">Total: ${total.toFixed(2)}</div>
            {error && <div className="text-red-600 mb-2">{error}</div>}
            <button
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded w-full mb-2"
              onClick={onClear}
              disabled={loading}
            >
              Clear Cart
            </button>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full"
              onClick={handleCheckout}
              disabled={loading}
            >
              {loading ? "Placing Order..." : "Checkout"}
            </button>
          </>
        )}
      </div>
      {showConfirm && order && (
        <OrderConfirmation order={order} onClose={handleCloseConfirm} />
      )}
    </>
  );
};

export default Cart;
