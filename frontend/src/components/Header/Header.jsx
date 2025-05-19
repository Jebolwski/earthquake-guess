import { useContext, useEffect } from "react";
import AuthContext from "../../context/context";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const { user, logoutUser } = useContext(AuthContext);

  return (
    <div className="bg-[#FED260]">
      <div className="bg-[#ececec] border-2 border-black rounded-b-3xl p-2 px-3 flex justify-between items-center relative z-20 flex-wrap gap-3">
        <Link
          to={"/"}
          className="flex items-center gap-1 z-30"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/9140/9140425.png"
            className="w-10"
            alt="Logo"
          />
          <h1 className="text-2xl font-extrabold text-[#ce636f] border-text">
            GUERTHQUAKE
          </h1>
        </Link>
        <div className="font-bold text-xl">
          {user?.username} ({user?.email})
        </div>
        <button
          onClick={logoutUser}
          className="bg-red-400 hover:bg-red-500 duration-200 font-semibold text-white border-2 border-black py-1 px-2 rounded-xl shadow-md"
        >
          Çıkış Yap
        </button>
      </div>
    </div>
  );
};

export default Header;
