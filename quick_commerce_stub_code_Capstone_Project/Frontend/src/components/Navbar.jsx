import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ isLoggedIn, userEmail, handleLogout }) => (
  <nav
    style={{
      marginBottom: 5,
      display: "flex",
      alignItems: "center",
      gap: 10,
    }}
  >
    <Link to="/home" style={{ marginRight: 10 }}>
      Home
    </Link>
    {!isLoggedIn && (
      <>
        <Link to="/signin" style={{ marginRight: 10 }}>
          Sign In
        </Link>
        <Link to="/signup" style={{ marginRight: 10 }}>
          Sign Up
        </Link>
      </>
    )}
    {isLoggedIn && (
      <>
        <Link to="/profile" style={{ marginRight: 10 }}>
          Profile
        </Link>
        <button
          onClick={handleLogout}
          style={{
            color: "#dc2626",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Logout
        </button>
        {userEmail && (
          <span
            style={{ marginLeft: 10, color: "#2563eb", fontWeight: "bold" }}
          >
            Welcome, {userEmail}
          </span>
        )}
      </>
    )}
  </nav>
);

export default Navbar;
