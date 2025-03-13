import { createContext, useState, useEffect } from "react";
const AuthContext = createContext({});
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default AuthContext;

export const AuthProvider = ({ children }: any) => {
  const [profile, setProfile] = useState();
  const [googleDataState, setGoogleDataState] = useState();
  const [key, setKey] = useState<string>();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const login = (body: { username: string; password: string }) => {
    const requestOptions: any = {
      method: "POST",
      headers: myHeaders,
      body: body,
      redirect: "follow",
    };

    fetch("http://127.0.0.1:8000/api/login", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  };

  let contextData = {
    profile: profile,
    login: login,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
