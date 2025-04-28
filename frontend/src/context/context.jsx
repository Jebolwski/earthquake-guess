import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios"; // API istekleri için
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({});

export default AuthContext;

export const AuthProvider = ({ children }) => {
  axios.defaults.baseURL = "http://localhost:8000";

  const [user, setUser] = useState(null);
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  const navigate = useNavigate();

  // Kullanıcı login olunca çağrılacak
  const loginUser = async (identifier, password) => {
    try {
      const response = await axios.post("/api/auth/login/", {
        username: identifier, // veya email
        password,
      });
      if (response.status === 200) {
        const token = response.data.key;
        localStorage.setItem("authTokens", JSON.stringify({ access: token })); // Token'ı localStorage'a kaydediyoruz
        setAuthTokens({ access: token }); // authTokens state'ine kaydediyoruz
        await getUserByToken(token); // Token ile kullanıcı bilgilerini alıp setUser ile kaydediyoruz
        navigate("/"); // Giriş başarılıysa home'a yönlendir
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Giriş başarısız! Kullanıcı adı/email veya şifre yanlış olabilir.");
    }
  };

  const getUserByToken = async (token) => {
    try {
      const response = await axios.post("/api/get-user-by-token/", { token });
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Kullanıcı register olunca çağrılacak
  const registerUser = async (username, email, password, password2) => {
    try {
      const response = await axios.post("/api/auth/register/", {
        username,
        email,
        password,
        password2,
      });
      if (response.status === 201) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Register error:", error);
      alert("Kayıt başarısız oldu!");
    }
  };

  // Google login olduğunda çağrılacak
  const googleLogin = async (credential) => {
    try {
      const response = await axios.post("/api/rest-auth/google/", {
        access_token: credential,
      });
      if (response.status === 200) {
        setAuthTokens(response.data);
        setUser(jwt_decode(response.data.access));
        localStorage.setItem("authTokens", JSON.stringify(response.data));
        navigate("/");
      }
    } catch (error) {
      console.error("Google login error:", error);
      alert("Google ile giriş yapılamadı!");
    }
  };

  // Kullanıcı logout olunca
  const logoutUser = async () => {
    if (authTokens) {
      try {
        await axios.post("/api/logout/", {
          token: authTokens.access,
        });
      } catch (error) {
        console.error("Logout error:", error);
      }
    }

    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate("/login");
  };

  const socialLoginUser = async (token) => {
    try {
      localStorage.setItem("authTokens", JSON.stringify({ access: token }));
      setAuthTokens({ access: token });
      // Token'ı kaydettikten sonra user'ı çekiyoruz
      await getUserByToken(token);

      // Sonra anasayfaya yönlendiriyoruz
      navigate("/");
    } catch (error) {
      console.error("Login sırasında hata oluştu:", error);
    }
  };
  useEffect(() => {
    if (authTokens) {
      getUserByToken(authTokens.access);
    }
  }, [authTokens]);

  let contextData = {
    user,
    authTokens,
    loginUser,
    registerUser,
    googleLogin,
    logoutUser,
    socialLoginUser,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
