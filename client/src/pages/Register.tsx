import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { register }: any = useContext(AuthContext);

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
            register({ username, password });
          }}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;
