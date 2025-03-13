import React from "react";
import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Login from "../pages/Login";
import HomePage from "../pages/HomePage";
import Register from "../pages/Register";

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes
        location={location}
        key={location.pathname}
      >
        <Route
          path="/"
          element={<HomePage />}
        />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/register"
          element={<Register />}
        />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
