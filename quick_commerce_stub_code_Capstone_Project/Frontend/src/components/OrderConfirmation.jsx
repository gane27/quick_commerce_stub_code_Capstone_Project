import React from "react";

const OrderConfirmation = ({ order, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-green-700">
          Order Confirmed!
        </h2>
        <p className="mb-2">Thank you for your purchase.</p>
        <div className="mb-4">
          <div className="font-semibold">Order Summary:</div>
          <ul className="text-sm mt-2 mb-2">
            {order.items.map((item) => (
              <li key={item._id} className="mb-1">
                {item.name} x {item.qty} (${item.price} each)
              </li>
            ))}
          </ul>
          <div className="font-bold">Total: ${order.total.toFixed(2)}</div>
        </div>
        {order.orderId && (
          <div className="mb-2 text-sm">
            <div>
              <span className="font-semibold">Order ID:</span> {order.orderId}
            </div>
            {order.warehouse && (
              <div>
                <span className="font-semibold">Warehouse:</span>{" "}
                {order.warehouse.name}
              </div>
            )}
            {order.hotspot && (
              <div>
                <span className="font-semibold">Hotspot:</span>{" "}
                {order.hotspot.name}
              </div>
            )}
            {order.pickingDelaySec !== undefined && (
              <div>
                <span className="font-semibold">Picking Delay:</span>{" "}
                {order.pickingDelaySec}s
              </div>
            )}
            {order.deliveryDelaySec !== undefined && (
              <div>
                <span className="font-semibold">Delivery Delay:</span>{" "}
                {order.deliveryDelaySec}s
              </div>
            )}
            {order.totalDeliveryTimeSec !== undefined && (
              <div>
                <span className="font-semibold">Total Delivery Time:</span>{" "}
                {order.totalDeliveryTimeSec}s
              </div>
            )}
          </div>
        )}
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
