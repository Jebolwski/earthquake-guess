import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex gap-3">
      <Link to={"/"}>Home</Link>
      <Link to={"/login"}>Login</Link>
      <Link to={"/register"}>Register</Link>
    </div>
  );
};

export default Navbar;
