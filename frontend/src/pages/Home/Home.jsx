import React, { useContext } from "react";
import AuthContext from "../../context/context";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // Eğer kullanıcı giriş yapmamışsa, login sayfasına yönlendir
  if (!user) {
    navigate("/login");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-6">
        Hoş Geldiniz, {user ? user.username : "Misafir"}
      </h1>

      {/* Profil Bilgileri */}
      {user && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6 w-full max-w-sm text-center">
          <p className="text-xl font-semibold">
            Kullanıcı Adı: {user.username}
          </p>
          <p className="text-md text-gray-600">Email: {user.email}</p>
          <button
            onClick={logoutUser}
            className="mt-4 bg-red-500 text-white px-2 py-2 rounded hover:bg-red-600"
          >
            Çıkış Yap
          </button>
        </div>
      )}

      {/* Kullanıcı giriş yapmamışsa, giriş butonu */}
      {!user && (
        <div className="text-center">
          <p className="mb-4">Henüz giriş yapmadınız. Lütfen giriş yapın.</p>
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Giriş Yap
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
