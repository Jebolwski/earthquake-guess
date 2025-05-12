import React, { useState, useContext } from "react";
import AuthContext from "../../context/context";
import { Eye, EyeOff } from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { Link } from "react-router-dom";

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
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-cover">
      <div className="sm:w-3/4 md:w-1/2 lg:1/3 w-full shadow-lg border border-stone-100 p-4 border-stone-200 rounded-xl bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100">
        <h1 className="text-2xl font-bold mb-6">Giriş Yap</h1>
        <form
          onSubmit={handleLoginSubmit}
          className="w-full"
        >
          <div className="w-full">
            <p className="mb-1">Kullanıcı Adı</p>
            <input
              type="text"
              className="border w-full p-2 rounded-md shadow-md focus:outline-none"
              value={identifier}
              name="username"
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />
          </div>
          <div className="w-full mt-2">
            <p className="mb-1">Şifre</p>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="border p-2 rounded-md shadow-md focus:outline-none w-full pr-10"
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
            className="bg-blue-400 shadow-md text-white py-2 mt-2 w-full rounded-md hover:bg-blue-500 duration-300"
          >
            Giriş Yap
          </button>
          <div className="flex flex-wrap justify-between my-2">
            <div className="flex gap-2">
              <p>Dont have an account?</p>
              <Link
                to={"/register"}
                className="underline text-blue-500"
              >
                Register
              </Link>
            </div>
            <div className="flex gap-2">
              <p>Forgot your password?</p>
              <Link
                to={"/password-reset"}
                className="underline text-green-500"
              >
                Reset Password
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
