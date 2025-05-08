import React, { useState, useContext } from "react";
import AuthContext from "../../context/context";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const Register = () => {
  const { registerUser } = useContext(AuthContext);

  const [username, setUsername] = useState(""); // username ekledik
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      alert("Şifreler eşleşmiyor!");
      return;
    }
    registerUser(username, email, password, password2); // username'i de gönderiyoruz
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="sm:w-3/4 md:w-1/2 lg:1/3 w-full shadow-lg border border-stone-100 p-4 border-stone-200 rounded-xl bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100">
        <h1 className="text-2xl font-bold mb-6">Kayıt Ol</h1>
        <form
          onSubmit={handleRegisterSubmit}
          className="flex flex-col gap-4 w-full"
        >
          <div className="w-full">
            <p className="mb-1">Kullanıcı Adı</p>
            <input
              type="text"
              className="border w-full p-2 rounded-md shadow-md focus:outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="w-full">
            <p className="mb-1">Email</p>
            <input
              type="text"
              className="border w-full p-2 rounded-md shadow-md focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <p className="mb-1">Şifre</p>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Şifre"
                className="border p-2 rounded-md shadow-md focus:outline-none w-full pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div
                className="absolute inset-y-0 right-2 flex items-center cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
            </div>
          </div>

          <div>
            <p className="mb-1">Şifre</p>
            <div className="relative">
              <input
                type={showPassword2 ? "text" : "password"}
                placeholder="Şifre"
                className="border p-2 rounded-md shadow-md focus:outline-none w-full pr-10"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                required
              />
              <div
                className="absolute inset-y-0 right-2 flex items-center cursor-pointer"
                onClick={() => setShowPassword2(!showPassword2)}
              >
                {showPassword2 ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <p>Do you already have an account?</p>
            <Link
              to={"/login"}
              className="underline text-green-500"
            >
              Login
            </Link>
          </div>
          <button
            type="submit"
            className="bg-green-400 text-white py-2 rounded hover:bg-green-500 duration-300"
          >
            Kayıt Ol
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
