import React from "react";
import * as jwt_decode from "jwt-decode";
import { Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import upGradLogo from "/upgrad_logo.png";
import "./App.css";

import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import HomePage from "./components/HomePage";
import Profile from "./components/Profile";
import Cart from "./components/Cart";
import { useEffect, useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [userEmail, setUserEmail] = useState("");
  const [cart, setCart] = useState(() => {
    try {
      const stored = localStorage.getItem("cart");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    const updateLoginState = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
      if (token) {
        try {
          const decoded = jwt_decode(token);
          setUserEmail(decoded.user?.email || "");
        } catch {
          setUserEmail("");
        }
      } else {
        setUserEmail("");
      }
    };
    updateLoginState();
    window.addEventListener("storage", updateLoginState);
    return () => window.removeEventListener("storage", updateLoginState);
  }, []);

  // Cart logic
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const found = prev.find((item) => item._id === product._id);
      if (found) {
        return prev.map((item) =>
          item._id === product._id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setShowCart(true);
  };
  const removeFromCart = (id) => {
    setCart((prev) => {
      const updated = prev.filter((item) => item._id !== id);
      if (updated.length === 0) setShowCart(false);
      return updated;
    });
  };

  const subtractFromCart = (id) => {
    setCart((prev) => {
      return prev.map((item) =>
        item._id === id && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item
      );
    });
  };
  const clearCart = () => {
    setCart([]);
    setShowCart(false);
  };

  // Logout logic
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserEmail("");
    setCart([]);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          justifyContent: "center",
          marginBottom: 10,
        }}
      >
        <a href="/" target="_self">
          <img src={upGradLogo} className="logo" border="0" alt="upGrad logo" />
        </a>
        <h1 style={{ margin: 0 }}>upGrad</h1>
      </div>
      <Navbar
        isLoggedIn={isLoggedIn}
        userEmail={userEmail}
        handleLogout={handleLogout}
      />
      <button
        className="fixed top-4 right-4 z-50 bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
        onClick={() => setShowCart((v) => !v)}
        style={{ display: isLoggedIn ? "block" : "none" }}
      >
        Cart ({cart.reduce((sum, item) => sum + item.qty, 0)})
      </button>
      {showCart && (
        <Cart
          cartItems={cart}
          onRemove={removeFromCart}
          onClear={clearCart}
          onSubtract={subtractFromCart}
        />
      )}
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/signin"
          element={<SignIn onLoginSuccess={() => setIsLoggedIn(true)} />}
        />
        <Route
          path="/home"
          element={
            isLoggedIn ? (
              <HomePage addToCart={addToCart} />
            ) : (
              <SignIn onLoginSuccess={() => setIsLoggedIn(true)} />
            )
          }
        />
        <Route
          path="/profile"
          element={
            isLoggedIn ? (
              <Profile />
            ) : (
              <SignIn onLoginSuccess={() => setIsLoggedIn(true)} />
            )
          }
        />
        <Route
          path="/"
          element={
            <div className="card">Welcome to upGrad Quick Commerce App!</div>
          }
        />
      </Routes>
    </>
  );
}

export default App;
