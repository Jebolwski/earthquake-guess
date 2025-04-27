import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

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
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-4">Şifreyi Sıfırla</h2>
      {success ? (
        <p className="text-green-500">
          Şifren başarıyla değiştirildi! Giriş sayfasına yönlendiriliyorsun...
        </p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm space-y-4"
        >
          <input
            type="password"
            placeholder="Yeni Şifre"
            value={newPassword1}
            onChange={(e) => setNewPassword1(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Yeni Şifre (Tekrar)"
            value={newPassword2}
            onChange={(e) => setNewPassword2(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Şifreyi Güncelle
          </button>
        </form>
      )}
    </div>
  );
};

export default ResetPasswordConfirm;
