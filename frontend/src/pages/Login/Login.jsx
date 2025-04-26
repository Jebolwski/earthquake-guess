import React, { useState, useContext } from "react";
import AuthContext from "../../context/context";
import { Eye, EyeOff } from "lucide-react"; // lucide-react paketinden ikonlar

const Login = () => {
  const { loginUser } = useContext(AuthContext);

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Şifre görünür mü?

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    loginUser(identifier, password);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-6">Giriş Yap</h1>

      <form
        onSubmit={handleLoginSubmit}
        className="flex flex-col gap-4 w-full max-w-sm"
      >
        <input
          type="text"
          placeholder="Kullanıcı adı veya Email"
          className="border p-2 rounded"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          required
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Şifre"
            className="border p-2 rounded w-full pr-10"
            value={password}
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

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Giriş Yap
        </button>
      </form>
    </div>
  );
};

export default Login;
