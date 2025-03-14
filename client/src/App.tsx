import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useState } from "react";
import AnimatedRoutes from "./components/AnimatedRoutes";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <AnimatedRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
