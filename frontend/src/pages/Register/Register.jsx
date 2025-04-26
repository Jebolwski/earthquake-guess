import React, { useState, useContext } from "react";
import AuthContext from "../../context/context";

const Register = () => {
  const { registerUser } = useContext(AuthContext);

  const [username, setUsername] = useState(""); // username ekledik
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      alert("Şifreler eşleşmiyor!");
      return;
    }
    registerUser(username, email, password, password2); // username'i de gönderiyoruz
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-6">Kayıt Ol</h1>

      <form
        onSubmit={handleRegisterSubmit}
        className="flex flex-col gap-4 w-full max-w-sm"
      >
        <input
          type="text"
          placeholder="Kullanıcı Adı"
          className="border p-2 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Şifre"
          className="border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Şifre Tekrar"
          className="border p-2 rounded"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          required
        />

        <button
          type="submit"
          className="bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          Kayıt Ol
        </button>
      </form>
    </div>
  );
};

export default Register;
