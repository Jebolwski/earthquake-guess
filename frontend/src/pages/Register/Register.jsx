import React, { useState, useContext } from "react";
import AuthContext from "../../context/context";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { Helmet } from "react-helmet";

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
    <div className="flex flex-col lg:items-end items-center min-h-screen lg:px-12 px-4 bg-cover bg-[#FED260]">
      <Helmet>
        <title>Kayıt Ol</title>
      </Helmet>
      <img
        src="/src/assets/login.svg"
        alt="login"
        className="w-full lg:scale-[1.0] md:scale-[1.5] sm:scale-[1.75] scale-[2.0] lg:bottom-0 md:bottom-16 sm:bottom-24 bottom-12 fixed bottom-0 left-0 select-none"
      />
      <div className="sm:w-3/4 md:w-2/3 lg:w-6/12 w-full shadow-lg mt-28 p-4 rounded-xl bg-[#ececec] border-2 border-black z-20">
        <h1 className="text-2xl font-bold mb-6">Kayıt Ol</h1>
        <form
          onSubmit={handleRegisterSubmit}
          className="w-full"
        >
          <div className="w-full">
            <p className="mb-1 text-lg font-semibold">Kullanıcı Adı</p>
            <input
              type="text"
              className="border-2 border-black w-full p-2 rounded-md focus:outline-none"
              value={username}
              name="username"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="w-full mt-2">
            <p className="mb-1 text-lg font-semibold">Email</p>
            <input
              type="text"
              className="border-2 border-black w-full p-2 rounded-md focus:outline-none"
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="w-full mt-2">
            <p className="mb-1 text-lg font-semibold">Şifre</p>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="border-2 border-black p-2 rounded-md focus:outline-none w-full pr-10"
                value={password}
                name="password"
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
          <div className="w-full mt-2">
            <p className="mb-1 text-lg font-semibold">Şifre</p>
            <div className="relative">
              <input
                type={showPassword2 ? "text" : "password"}
                className="border-2 border-black p-2 rounded-md focus:outline-none w-full pr-10"
                value={password2}
                name="password"
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
          <button
            type="submit"
            className="bg-green-400 hover:bg-green-500 border-2 border-black text-white font-semibold text-lg py-2 mt-3 w-full rounded-md duration-300"
          >
            Kayıt Ol
          </button>
          <div className="flex flex-wrap justify-between my-2">
            <div className="flex gap-2 font-semibold">
              <p>Hesabın mı var?</p>
              <Link
                to={"/login"}
                className="underline text-blue-500"
              >
                Giriş Yap
              </Link>
            </div>
            <div className="flex gap-2 font-semibold">
              <p>Şifreni mi unuttun?</p>
              <Link
                to={"/password-reset"}
                className="underline text-green-500"
              >
                Şifre Sıfırla
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
