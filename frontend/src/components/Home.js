import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav style={{ padding: "10px", backgroundColor: "#0f3460" }}>
    <Link to="/" style={{ marginRight: "20px", color: "#ffcc29" }}>
      Home
    </Link>
    <Link to="/reports" style={{ color: "#ffcc29" }}>
      Reports
    </Link>
  </nav>
);

export default Navbar;
