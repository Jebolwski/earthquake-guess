import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";

const ResetPasswordConfirm = () => {
  const { uid, token } = useParams();
  const navigate = useNavigate();

  const [newPassword1, setNewPassword1] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword1 !== newPassword2) {
      setError("Şifreler eşleşmiyor.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8000/api/user/password/reset/confirm/${uid}/${token}/`,
        {
          new_password1: newPassword1,
          new_password2: newPassword2,
        }
      );

      console.log(response.data);
      setSuccess(true);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError("Bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-[#FED260]">
      <Helmet>
        <title>Şifre Sıfırlama</title>
      </Helmet>
      <img
        src="/src/assets/login.svg"
        alt="login"
        className="w-full lg:scale-[1.0] md:scale-[1.5] sm:scale-[1.75] scale-[2.0] lg:bottom-0 md:bottom-16 sm:bottom-24 bottom-12 absolute bottom-0 left-0"
      />

      {success ? (
        <p className="text-green-500 bg-white border-2 border-black bg-white rounded-xl px-3 py-2 font-semibold text-xl z-20">
          Şifren başarıyla değiştirildi! Giriş sayfasına yönlendiriliyorsun...
        </p>
      ) : (
        <div className="border-2 border-black p-3 rounded-xl bg-white z-20 max-w-[500px] w-full">
          <form
            onSubmit={handleSubmit}
            className="w-full"
          >
            <h2 className="text-2xl font-semibold mb-4">Şifreyi Sıfırla</h2>
            <p className="font-semibold text-xl">Yeni Şifre</p>
            <input
              type="password"
              value={newPassword1}
              onChange={(e) => setNewPassword1(e.target.value)}
              className="border-2 border-black focus:outline-none rounded-md px-2 text-lg py-1 w-full font-semibold mt-1"
              required
            />
            <p className="font-semibold text-xl mt-2">Yeni Şifre (Tekrar)</p>
            <input
              type="password"
              value={newPassword2}
              onChange={(e) => setNewPassword2(e.target.value)}
              className="border-2 border-black focus:outline-none rounded-md px-2 text-lg py-1 w-full font-semibold mt-1"
              required
            />
            {error && (
              <p className="text-red-500 font-semibold mt-1">{error}</p>
            )}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-lg text-lg hover:bg-blue-600 border-2 border-black font-semibold mt-3"
            >
              Şifreyi Güncelle
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ResetPasswordConfirm;
