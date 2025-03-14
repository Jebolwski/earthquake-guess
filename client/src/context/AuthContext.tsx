import { createContext, useState } from "react";
const AuthContext = createContext({});
import { useNavigate } from "react-router-dom";

export default AuthContext;

export const AuthProvider = ({ children }: any) => {
  const navigate = useNavigate();

  const login = async (body: { username: string; password: string }) => {
    let response = await fetch("http://127.0.0.1:8000/api/login", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(body),
    });
    let data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      console.log(data.user);

      navigate("/");
    } else {
      console.error("Login failed:", data);
    }
  };

  const register = async (body: { username: string; password: string }) => {
    let response = await fetch("http://127.0.0.1:8000/api/signup", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(body),
    });
    let data = await response.json();

    if (response.ok) {
      navigate("/login");
    } else {
      console.error("Login failed:", data);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  let contextData = {
    login: login,
    logout: logout,
    register: register,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
