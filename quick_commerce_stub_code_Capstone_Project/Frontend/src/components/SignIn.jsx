import React, { useState } from "react";

const SignIn = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        // Store token in localStorage
        localStorage.setItem("token", data.token);
        if (onLoginSuccess) onLoginSuccess();
      } else {
        setError(data.message || "Login failed");
      }
    } catch (_) {
      // eslint-disable-next-line no-unused-vars
      setError("Network error");
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 p-[20px_10px] bg-white rounded-lg shadow-md text-left"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>
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
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <button
        type="submit"
        disabled={loading}
        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded w-full"
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
};

export default SignIn;
