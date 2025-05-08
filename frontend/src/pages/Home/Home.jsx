import React, { useContext } from "react";
import AuthContext from "../../context/context";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const { user, logoutUser } = useContext(AuthContext);

  return (
    <div className="px-6 py-4 bg-stone-200 min-h-[100vh]">
      <div className="bg-stone-50 border border-stone-200 rounded-lg p-2 shadow-md flex justify-between items-center">
        <div className="flex items-center gap-1">
          <img
            src="https://cdn-icons-png.flaticon.com/512/9140/9140425.png"
            className="w-8"
            alt="Logo"
          />
          <p>Guerthquake</p>
        </div>
        <div>{user?.username}</div>
        <button
          onClick={logoutUser}
          className="bg-stone-100/30 border border-stone-200/70 py-1 px-2 rounded-lg shadow-md"
        >
          Logout
        </button>
      </div>
      <div className="flex gap-3 mt-5">
        <div className="w-1/3">
          <div className="shadow-md border border-stone-200 rounded-lg px-4 py-2 bg-stone-50">
            <p className="font-semibold">Last Predictions</p>
            <div className="flex bg-stone-200/50 border border-stone-200 px-2 rounded-md items-center justify-between shadow-md mt-2">
              <div className="flex items-center gap-3">
                <p>BL : 22</p>
                <p>BS : 2.4</p>
                <p>BA : 13</p>
              </div>
              <div className="text-green-500">Pred : 1.21</div>
            </div>
            <div className="flex bg-stone-200/50 border border-stone-200 px-2 rounded-md items-center justify-between shadow-md mt-2">
              <div className="flex items-center gap-3">
                <p>BL : 22</p>
                <p>BS : 2.4</p>
                <p>BA : 13</p>
              </div>
              <div className="text-orange-500">Pred : 2.21</div>
            </div>
            <div className="flex bg-stone-200/50 border border-stone-200 px-2 rounded-md items-center justify-between shadow-md mt-2">
              <div className="flex items-center gap-3">
                <p>BL : 22</p>
                <p>BS : 2.4</p>
                <p>BA : 13</p>
              </div>
              <div className="text-red-500">Pred : 2.53</div>
            </div>
            <div className="flex bg-stone-200/50 border border-stone-200 px-2 rounded-md items-center justify-between shadow-md mt-2">
              <div className="flex items-center gap-3">
                <p>BL : 22</p>
                <p>BS : 2.4</p>
                <p>BA : 13</p>
              </div>
              <div className="text-green-500">Pred : 1.48</div>
            </div>
            <div className="flex bg-stone-200/50 border border-stone-200 px-2 rounded-md items-center justify-between shadow-md mt-2">
              <div className="flex items-center gap-3">
                <p>BL : 22</p>
                <p>BS : 2.4</p>
                <p>BA : 13</p>
              </div>
              <div className="text-orange-500">Pred : 1.68</div>
            </div>
          </div>
          <div className="shadow-md border border-stone-200 rounded-lg px-4 py-2 bg-stone-50 mt-2">
            <p className="font-semibold">Saved Buildings</p>
            <div className="flex bg-stone-200/50 border border-stone-200 px-2 rounded-md items-center justify-between shadow-md mt-2">
              <div className="flex items-center gap-3">
                <p>BL : 22</p>
                <p>BS : 2.4</p>
                <p>BA : 13</p>
              </div>
              <div className="text-orange-500">Pred : 1.68</div>
            </div>
            <div className="flex bg-stone-200/50 border border-stone-200 px-2 rounded-md items-center justify-between shadow-md mt-2">
              <div className="flex items-center gap-3">
                <p>BL : 22</p>
                <p>BS : 2.4</p>
                <p>BA : 13</p>
              </div>
              <div className="text-orange-500">Pred : 1.68</div>
            </div>
            <div className="flex bg-stone-200/50 border border-stone-200 px-2 rounded-md items-center justify-between shadow-md mt-2">
              <div className="flex items-center gap-3">
                <p>BL : 22</p>
                <p>BS : 2.4</p>
                <p>BA : 13</p>
              </div>
              <div className="text-orange-500">Pred : 1.68</div>
            </div>
          </div>
        </div>
        <div className="w-1/4">
          <div className="shadow-md border border-stone-200 rounded-lg px-2 py-2 bg-stone-50">
            <p className="text-lg font-semibold mb-2">Guess Building Damage</p>
            <Link to={"/predict-damage"}>
              <div className="relative h-96 w-full overflow-hidden rounded-lg shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-b from-sky-300 to-sky-500">
                  <div className="absolute top-6 right-8 h-16 w-16 rounded-full bg-yellow-300 shadow-lg"></div>

                  <div className="absolute top-12 left-16 h-8 w-24 rounded-full bg-white opacity-90"></div>
                  <div className="absolute top-20 left-32 h-6 w-16 rounded-full bg-white opacity-80"></div>
                </div>

                <div className="absolute bottom-0 h-16 w-full bg-[#8B4513]"></div>

                <div className="absolute bottom-16 left-1/2 flex -translate-x-1/2 transform flex-col items-center">
                  <div className="h-6 w-48 bg-gray-700"></div>
                  <div className="flex h-20 w-44 items-center justify-around border border-gray-400 bg-gray-200">
                    <div className="h-8 w-6 border border-gray-500 bg-blue-200"></div>
                    <div className="h-8 w-6 border border-gray-500 bg-blue-200"></div>
                    <div className="h-8 w-6 border border-gray-500 bg-blue-200"></div>
                  </div>
                  <div className="flex h-20 w-44 items-center justify-around border-b-4 border-[#8B4513] border-l border-r border-gray-400 bg-gray-100">
                    <div className="h-8 w-6 border border-gray-500 bg-blue-200"></div>
                    <div className="h-8 w-6 border border-gray-500 bg-blue-200"></div>
                    <div className="h-8 w-6 border border-gray-500 bg-blue-200"></div>
                  </div>
                  <div className="h-6 w-48 bg-gray-600"></div>
                </div>
              </div>
            </Link>
          </div>
          <div className="shadow-md border border-stone-200 rounded-lg px-4 py-2 bg-stone-50 mt-2">
            <p>bölüm 1</p>
          </div>
        </div>
        <div className="w-5/12">
          <div className="shadow-md border border-stone-200 rounded-lg px-4 py-2 bg-stone-50">
            <p>bölüm 2</p>
          </div>
          <div className="shadow-md border border-stone-200 rounded-lg px-4 py-2 bg-stone-50 mt-2">
            <p>bölüm 3 </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
