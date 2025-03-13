import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login }: any = useContext(AuthContext);

  console.log(login);

  return (
    <div>
      <p>{username}</p>
      <p>{password}</p>
      <div className="p-3">
        <div>
          <p>Username</p>
          <input
            type="text"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            className="border border-black"
          />
        </div>
        <div>
          <p>Password</p>
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="border border-black"
          />
        </div>
        <button
          className="bg-red-400 px-2 mt-2"
          onClick={() => {
            login({ username, password });
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
