import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  return (
    <nav
      className="navbar navbar-expand-lg fixed-top shadow-lg"
      style={{
        background: "linear-gradient(135deg, #0d6efd, #6610f2)", // Solid gradient
        borderBottom: "1px solid rgba(255,255,255,0.2)",
      }}
    >
      <div className="container">
        {/* Brand */}
        <Link
          className="navbar-brand fw-bold fs-4 text-white d-flex align-items-center"
          to="/"
          style={{
            letterSpacing: "1px",
            textShadow: "1px 1px 4px rgba(0,0,0,0.3)",
          }}
        >
          🚀 Challenge App
        </Link>

        {/* Toggler */}
        <button
          className="navbar-toggler text-white border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Nav Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {[
              { name: "Home", path: "/" },
              { name: "Add Challenge", path: "/add" },
              { name: "All Challenges", path: "/list" },
              { name: "Monthly Challenges", path: "/month" },
            ].map((item) => (
              <li className="nav-item" key={item.path}>
                <Link
                  className={`nav-link px-3 fw-semibold ${
                    location.pathname === item.path ? "active-link" : "text-white"
                  }`}
                  to={item.path}
                  style={{
                    borderRadius: "20px",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "rgba(255,255,255,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "transparent";
                  }}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Extra Styles */}
      <style>
        {`
          .active-link {
            background-color: rgba(255,255,255,0.25);
            border-radius: 20px;
            color: white !important;
          }
         
        `}
      </style>
    </nav>
  );
}
