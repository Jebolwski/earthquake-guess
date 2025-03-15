import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { register }: any = useContext(AuthContext);

  return (
    <div className="bg-amber-50 font-opensans h-full flex justify-center items-center p-4">
      <div className="flex items-center bg-amber-100  border border-amber-200 shadow-md rounded-lg w-fit">
        <div className="p-3">
          <p className="text-lg">
            <label className="text-xl font-semibold">Register</label> to see
            your building
          </p>
          <div className="mt-4">
            <p className="text-sm">Username</p>
            <input
              type="text"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              className="focus:outline-0 focus:shadow-lg w-full shadow-md duration-200 px-2 py-1 rounded-md bg-white border border-amber-300"
            />
          </div>
          <div className="mt-4">
            <p className="text-sm mt-2">Password</p>
            <input
              type="text"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              className="focus:outline-0 focus:shadow-lg w-full shadow-md duration-200 px-2 py-1 rounded-md bg-white border border-amber-300"
            />
          </div>
          <button
            className="bg-yellow-500 mt-4 cursor-pointer text-white hover:shadow-lg shadow-md duration-200 px-4 rounded-md border border-amber-300 font-semibold py-1 px-2 mt-2"
            onClick={() => {
              register({ username, password });
            }}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
