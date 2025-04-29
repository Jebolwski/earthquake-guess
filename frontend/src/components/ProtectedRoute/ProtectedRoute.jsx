// src/components/ProtectedRoute.jsx
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../../context/context";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    // User yoksa login sayfasına gönder
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  // User varsa children'ı göster
  return children;
};

export default ProtectedRoute;
