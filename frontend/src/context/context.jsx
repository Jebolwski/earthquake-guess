import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios"; // API istekleri için
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AuthContext = createContext({});

export default AuthContext;

export const AuthProvider = ({ children }) => {
  axios.defaults.baseURL = "http://localhost:8000";

  const [user, setUser] = useState(null);
  const [latestPredictions, setLatestPredictions] = useState();
  const [usersLatestPredictions, setUsersLatestPredictions] = useState();
  const [usersLatestAddedBuildings, setUsersLatestAddedBuildings] = useState();
  const [prediction, setPrediction] = useState();
  const [fullBuildingPrediction, setFullBuildingPrediction] = useState();
  const [fullBuildings, setFullBuildings] = useState();
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
        toast.success("Başarıyla giriş yapıldı.");
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
    toast.success("Başarıyla çıkış yapıldı.");
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

  const getLatestPredictions = async () => {
    try {
      const authTokens = JSON.parse(localStorage.getItem("authTokens"));
      const accessToken = authTokens?.access;
      let headers = {
        "Content-Type": "application/json",
      };
      if (accessToken != null) {
        headers = {
          Authorization: `Token ${accessToken}`,
          "Content-Type": "application/json",
        };
      }
      const response = await axios.get("/api/latest-predictions/", {
        headers: headers,
      });
      if (response.status === 200) {
        setLatestPredictions(response.data);
        navigate("/");
      }
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  const getLatestAddedFullBuildings = async () => {
    try {
      const authTokens = JSON.parse(localStorage.getItem("authTokens"));
      const accessToken = authTokens?.access;
      let headers = {
        "Content-Type": "application/json",
      };
      if (accessToken != null) {
        headers = {
          Authorization: `Token ${accessToken}`,
          "Content-Type": "application/json",
        };
      }

      const response = await axios.get("/api/latest-full-buildings/", {
        headers: headers,
      });
      if (response.status === 200) {
        setFullBuildings(response.data);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getAPrediction = async (id) => {
    try {
      const authTokens = JSON.parse(localStorage.getItem("authTokens"));
      const accessToken = authTokens?.access;

      if (!accessToken) {
        return;
      }

      const response = await axios.get(`/api/get-building/${id}`, {
        headers: {
          Authorization: `Token ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setPrediction(response.data);
      }
    } catch (error) {
      console.error("Tahminler alınırken hata:", error);

      if (error.response?.status === 401) {
        return;
        // İsteğe bağlı: kullanıcıyı login sayfasına yönlendirme
        // navigate("/login");
      } else {
        console.log("Bir hata oluştu. Lütfen tekrar deneyin.");
      }
    }
  };

  const getAPredictionFullBuilding = async (id) => {
    try {
      const authTokens = JSON.parse(localStorage.getItem("authTokens"));
      const accessToken = authTokens?.access;

      const response = await axios.get(`/api/get-full-building/${id}`, {
        headers: {
          Authorization: `Token ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setFullBuildingPrediction(response.data);
      }
    } catch (error) {
      console.error("Tahminler alınırken hata:", error);

      if (error.response?.status === 401) {
        toast.error("Erişim hatası.");
        return;
        // İsteğe bağlı: kullanıcıyı login sayfasına yönlendirme
        // navigate("/login");
      } else {
        console.log("Bir hata oluştu. Lütfen tekrar deneyin.");
      }
    }
  };

  const getUsersLastThreePredictions = async () => {
    try {
      const authTokens = JSON.parse(localStorage.getItem("authTokens"));
      const accessToken = authTokens?.access;

      const response = await axios.get(
        `/api/get_users_last_three_predictions/`,
        {
          headers: {
            Authorization: `Token ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setUsersLatestPredictions(response.data);
        console.log(response);
      }
    } catch (error) {
      console.error("Tahminler alınırken hata:", error);

      if (error.response?.status === 401) {
        toast.error("Erişim hatası.");
        return;
        // İsteğe bağlı: kullanıcıyı login sayfasına yönlendirme
        // navigate("/login");
      } else {
        console.log("Bir hata oluştu. Lütfen tekrar deneyin.");
      }
    }
  };

  const getUsersLastThreeAddedBuildings = async () => {
    try {
      const authTokens = JSON.parse(localStorage.getItem("authTokens"));
      const accessToken = authTokens?.access;

      const response = await axios.get(
        `/api/get_users_last_tree_added_buildings/`,
        {
          headers: {
            Authorization: `Token ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setUsersLatestAddedBuildings(response.data);
        console.log(response);
      }
    } catch (error) {
      console.error("Tahminler alınırken hata:", error);

      if (error.response?.status === 401) {
        toast.error("Erişim hatası.");
        return;
        // İsteğe bağlı: kullanıcıyı login sayfasına yönlendirme
        // navigate("/login");
      } else {
        console.log("Bir hata oluştu. Lütfen tekrar deneyin.");
      }
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
    getUserByToken,
    logoutUser,
    socialLoginUser,
    getLatestPredictions,
    latestPredictions,
    getAPrediction,
    prediction,
    fullBuildingPrediction,
    fullBuildings,
    getLatestAddedFullBuildings,
    getAPredictionFullBuilding,
    getUsersLastThreePredictions,
    getUsersLastThreeAddedBuildings,
    usersLatestPredictions,
    usersLatestAddedBuildings,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
