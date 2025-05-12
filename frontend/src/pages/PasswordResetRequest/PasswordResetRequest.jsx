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
    <div className="flex items-center justify-center h-[100vh]">
      <div className="border-2  rounded-md shadow-md p-2 w-96 -mt-24">
        <h2 className="font-semibold text-xl">Şifre Sıfırlama İsteği</h2>
        <form
          onSubmit={handleSubmit}
          className="mt-2"
        >
          <div>
            <input
              type="email"
              placeholder="E-posta adresiniz"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border-2 border-black focus:outline-none rounded-md px-2 py-1 w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 border-2 py-1 px-2 shadow-md border-black mt-2 rounded-md w-full"
          >
            Sıfırlama Linki Gönder
          </button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default PasswordResetRequest;
