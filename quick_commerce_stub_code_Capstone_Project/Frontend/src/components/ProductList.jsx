import React, { useEffect, useState } from "react";

const ProductList = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("http://localhost:5000/api/items");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError("Error loading products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <div>Loading products...</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (products.length === 0) return <div>No products found.</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
      {products.map((item) => (
        <div
          key={item._id}
          className="bg-white rounded shadow p-4 flex flex-col items-center"
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-32 h-32 object-cover mb-2 rounded-lg border-2 border-gray-200 shadow-md transition-transform duration-200 hover:scale-105 hover:border-blue-400"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/no-image.png";
            }}
          />
          <h3 className="font-bold text-lg mb-1">{item.name}</h3>
          <p className="text-gray-600 text-sm mb-1">{item.category}</p>
          <p className="text-gray-800 font-semibold mb-1">${item.price}</p>
          <p className="text-xs text-gray-500 mb-2">Stock: {item.stock}</p>
          <p className="text-yellow-500 text-sm mb-2">Rating: {item.rating}</p>
          <button
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded mt-auto"
            onClick={() => addToCart(item)}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
