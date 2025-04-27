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
    <div className="password-reset-request">
      <h2>Şifre Sıfırlama İsteği</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="E-posta adresiniz"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Sıfırlama Linki Gönder</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default PasswordResetRequest;
