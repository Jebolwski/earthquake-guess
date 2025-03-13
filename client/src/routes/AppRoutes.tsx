import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Login from "../pages/Login";
import HomePage from "../pages/HomePage";
import Footer from "../components/Footer";

const AppRoutes = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/"
          element={<HomePage />}
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default AppRoutes;
