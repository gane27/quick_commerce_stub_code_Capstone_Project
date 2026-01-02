import React, { useState, useEffect } from "react";
import ProductList from "./ProductList";

const HomePage = ({ addToCart }) => {
  const [profile, setProfile] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [recommendations, setRecommendations] = useState([]);
  const [recError, setRecError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [loadingRecommendations, setLoadingRecommendations] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    if (!token) {
      setRecommendations([]);
      return;
    }
    setRecError("");
    setLoadingRecommendations(true);
    fetch("http://localhost:5000/api/recommendations", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.recommendations) setRecommendations(data.recommendations);
        else setRecError(data.message || "No recommendations");
      })
      .catch(() => setRecError("Failed to load recommendations"))
      .finally(() => setLoadingRecommendations(false));
  }, [isLoggedIn]);

  const fetchProfile = async () => {
    if (showProfile) {
      setShowProfile(false);
      return;
    }
    setError("");
    setProfile(null);
    setLoadingProfile(true);
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found. Please log in.");
      setLoadingProfile(false);
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/api/users/profile", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setProfile(data);
        setShowProfile(true);
      } else {
        setError(data.message || "Failed to fetch profile");
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setLoadingProfile(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        setIsLoggedIn(true);
        // Optionally reload recommendations after login
        fetch("http://localhost:5000/api/recommendations", {
          headers: { Authorization: `Bearer ${data.token}` },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.recommendations) setRecommendations(data.recommendations);
            else setRecError(data.message || "No recommendations");
          })
          .catch(() => setRecError("Failed to load recommendations"));
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Network error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white rounded-lg shadow-md p-[20px_10px] text-left">
      <h2 className="text-2xl font-bold mb-4 text-center">Home Page</h2>
      {!isLoggedIn ? (
        <form onSubmit={handleLogin} className="mb-6">
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Email:</label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring focus:border-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Password:</label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring focus:border-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded w-full mb-2"
          >
            Login
          </button>
        </form>
      ) : (
        <>
          <button
            onClick={fetchProfile}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors duration-200 w-full mb-4"
          >
            {showProfile ? "Hide Profile" : "Fetch My Profile (Protected)"}
          </button>
          {error && (
            <div className="text-red-600 text-center mb-4">{error}</div>
          )}
          {loadingProfile && (
            <div className="text-center text-blue-600 my-2">
              Loading profile...
            </div>
          )}
          {profile && showProfile && !loadingProfile && (
            <div className="mt-6 bg-gray-100 rounded p-4">
              <h3 className="text-lg font-semibold mb-2">Profile Data:</h3>
              <pre className="whitespace-pre-wrap break-words text-sm">
                {JSON.stringify(profile, null, 2)}
              </pre>
            </div>
          )}

          {/* Recommendations Section */}
          {loadingRecommendations && (
            <div className="text-center text-blue-600 my-4">
              Loading recommendations...
            </div>
          )}
          {recommendations.length > 0 && !loadingRecommendations && (
            <div className="mt-10">
              <h2 className="text-xl font-bold mb-4 text-center text-blue-700">
                Recommended for You
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {recommendations.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white rounded shadow p-4 flex flex-col items-center"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-32 h-32 object-cover mb-2 rounded-lg border-2 border-gray-200 shadow-md"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/no-image.png";
                      }}
                    />
                    <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                    <p className="text-gray-600 text-sm mb-1">
                      {item.category}
                    </p>
                    <p className="text-gray-800 font-semibold mb-1">
                      ${item.price}
                    </p>
                    <button
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded mt-auto"
                      onClick={() => addToCart(item)}
                    >
                      Add to Cart
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          {recError && (
            <div className="text-red-600 text-center mt-2">{recError}</div>
          )}

          {/* Product Browsing Section */}
          <div className="mt-10">
            <h2 className="text-xl font-bold mb-4 text-center">
              Browse Products
            </h2>
            <ProductList addToCart={addToCart} />
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
