import React, { useState, useContext } from "react";
import AuthContext from "../../context/context";
import { Eye, EyeOff } from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const Login = () => {
  const { loginUser, socialLoginUser } = useContext(AuthContext);

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    loginUser(identifier, password);
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    const accessToken = credentialResponse.credential;

    try {
      const response = await axios.post(
        "http://localhost:8000/api/rest-auth/google/",
        {
          token: accessToken,
        }
      );

      console.log(response.data);

      // şimdi navigate'i de gönderiyoruz
      socialLoginUser(response.data.token);
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  const handleGoogleLoginError = () => {
    console.error("Google login failed");
  };

  return (
    <div className="flex flex-col lg:items-end items-center min-h-screen lg:px-12 px-4 bg-cover bg-[#FED260]">
      <Helmet>
        <title>Giriş Yap</title>
      </Helmet>
      <img
        src="/src/assets/login.svg"
        alt="login"
        className="w-full lg:scale-[1.0] md:scale-[1.5] sm:scale-[1.75] scale-[2.0] lg:bottom-0 md:bottom-16 sm:bottom-24 bottom-12 fixed bottom-0 left-0 select-none"
      />
      <div className="sm:w-3/4 md:w-2/3 lg:w-6/12 w-full shadow-lg mt-28 p-4 rounded-xl bg-[#ececec] border-2 border-black z-20">
        <h1 className="text-2xl font-bold mb-6">Giriş Yap</h1>
        <form
          onSubmit={handleLoginSubmit}
          className="w-full"
        >
          <div className="w-full">
            <p className="mb-1 text-lg font-semibold">Kullanıcı Adı</p>
            <input
              type="text"
              className="border-2 border-black w-full p-2 rounded-md focus:outline-none"
              value={identifier}
              name="username"
              onChange={(e) => setIdentifier(e.target.value)}
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

          <button
            type="submit"
            className="bg-blue-400 border-2 border-black text-white font-semibold text-lg py-2 mt-2 w-full rounded-md hover:bg-blue-500 duration-300"
          >
            Giriş Yap
          </button>
          <Link
            to={"/"}
            className="bg-orange-400 hover:bg-orange-500 block text-center border-2 border-black text-white font-semibold text-lg py-2 mt-2 w-full rounded-md duration-300"
          >
            Misafir Olarak Devam Et
          </Link>
          <div className="flex flex-wrap justify-between my-2">
            <div className="flex gap-2 font-semibold">
              <p>Hesabın yok mu?</p>
              <Link
                to={"/register"}
                className="underline text-blue-500"
              >
                Kayıt Ol
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

          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={handleGoogleLoginError}
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
