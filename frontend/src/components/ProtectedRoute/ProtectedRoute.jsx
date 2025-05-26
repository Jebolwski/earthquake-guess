import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../../context/context";
import toast from "react-hot-toast";

let toastShown = false;

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (user == null && localStorage.getItem("authTokens") == null) {
    if (!toastShown) {
      toast.error("Giriş yapmalısınız.");
      console.log("Giriş yapma uyarısı gösterildi");
      toastShown = true;

      setTimeout(() => {
        toastShown = false;
      }, 2000);
    }
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  toastShown = false;
  return children;
};

export default ProtectedRoute;
