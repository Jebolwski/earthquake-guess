import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";
const Navbar = () => {
  const [user, setUser]: any | null = useState();
  const { logout }: any = useContext(AuthContext);

  useEffect(() => {
    setUser(localStorage.getItem("user"));
    console.log("abi");
  }, [localStorage.getItem("user")]);

  return (
    <div className="flex gap-3">
      <Link to={"/"}>Home</Link>
      {user == null ? (
        <>
          <Link to={"/login"}>Login</Link>
          <Link to={"/register"}>Register</Link>
        </>
      ) : (
        <div
          onClick={() => {
            logout();
          }}
        >
          Logout
        </div>
      )}
    </div>
  );
};

export default Navbar;
