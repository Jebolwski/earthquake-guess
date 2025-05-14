import React, { useState } from "react";
import axios from "axios";

function PasswordResetRequest() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:8000/api/user/password/reset/",
        { email }, // JSON formatında veri gönderiyoruz
        {
          headers: {
            "Content-Type": "application/json", // JSON olarak gönderdiğimiz için content type'ı belirtmeliyiz
          },
        }
      );
      setMessage("Şifre sıfırlama linki e-posta adresine gönderildi!");
    } catch (error) {
      setMessage("Bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  return (
    <div className="flex items-center justify-center h-[100vh] bg-[#FED260] px-4">
      <img
        src="/src/assets/login.svg"
        alt="login"
        className="w-full lg:scale-[1.0] md:scale-[1.5] sm:scale-[1.75] scale-[2.0] lg:bottom-0 md:bottom-16 sm:bottom-24 bottom-12 absolute bottom-0 left-0"
      />
      <div className="border-2 border-black rounded-xl shadow-md p-2 max-w-[500px] w-full -mt-32 bg-white z-20">
        <h2 className="font-semibold text-2xl">Şifre Sıfırlama İsteği</h2>
        <form
          onSubmit={handleSubmit}
          className="mt-2"
        >
          <div className="mt-2">
            <p className="font-semibold text-xl">E-posta</p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border-2 border-black focus:outline-none rounded-md px-2 text-lg py-1 w-full mt-1 font-semibold"
            />
          </div>
          <button
            type="submit"
            className="bg-green-400 border-2 text-lg font-semibold py-1 px-2 shadow-md border-black mt-2 rounded-md text-white w-full"
          >
            Sıfırlama Linki Gönder
          </button>
        </form>
        {message && (
          <p className="mt-1 font-semibold text-blue-500">{message}</p>
        )}
      </div>
    </div>
  );
}

export default PasswordResetRequest;
