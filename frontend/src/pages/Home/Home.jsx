import React, { useContext } from "react";
import AuthContext from "../../context/context";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const { user, logoutUser } = useContext(AuthContext);

  return (
    <div className="px-6 py-4 bg-[#FED260] min-h-[100vh]">
      <img
        src="/src/assets/clouds.svg"
        alt="clouds1"
        className="w-fit absolute left-6 top-16 z-10"
      />
      <img
        src="/src/assets/clouds.svg"
        alt="clouds2"
        className="w-fit absolute right-0 bottom-12 z-10"
      />
      <img
        src="/src/assets/left-bottom-home.svg"
        alt="clouds2"
        className="w-fit absolute left-0 bottom-0 z-10"
      />
      <img
        src="/src/assets/clouds.svg"
        alt="clouds2"
        className="w-fit absolute right-0 top-12 z-10 scale-x-[-1]"
      />

      <div className="bg-white border-2 border-black rounded-3xl p-2 flex justify-between items-center relative z-20">
        <div className="flex items-center gap-1 z-30">
          <img
            src="https://cdn-icons-png.flaticon.com/512/9140/9140425.png"
            className="w-10"
            alt="Logo"
          />
          <h1 className="text-2xl font-extrabold text-[#ce636f] border-text">
            GUERTHQUAKE
          </h1>
        </div>
        <div>{user?.username}</div>
        <button
          onClick={logoutUser}
          className="bg-stone-500 font-semibold text-white border-2 border-black py-1 px-2 rounded-xl shadow-md"
        >
          Logout
        </button>
      </div>
      <div className="flex lg:flex-nowrap flex-wrap justify-between lg:gap-3 gap-0 mt-5">
        <div className="lg:w-1/3 w-full z-20">
          <div className="border-2 border-black rounded-3xl px-4 py-2 bg-white">
            <h2 className="text-2xl text-center font-extrabold text-[#ce636f] border-text">
              GUERTHQUAKE NEDİR?
            </h2>
            <p className="mt-3 font-semibold">
              2015 yılında Nepal'de gerçekleşen Gorkha depremine ait gerçek
              verilerle eğitilen bir makine öğrenimi modeli geliştirilmiştir. Bu
              model, kullanıcıların sağladığı bina bilgilerine göre, olası bir
              depremde yapının ne düzeyde hasar alabileceğini tahmin etmektedir.
            </p>
            <p className="mt-3 font-semibold">
              Web uygulamamız üzerinden bina bilgilerinizi (kat sayısı, yapı
              tipi, bina yaşı vb.) kolayca girerek, binanızın potansiyel risk
              durumunu anında öğrenebilirsiniz. Böylece, afetlere karşı daha
              bilinçli kararlar almanıza ve önlem planlamanıza katkı sağlamayı
              amaçlıyoruz.
            </p>
          </div>
          <div className="border-2 border-black rounded-3xl px-4 py-2 bg-white mt-2">
            <h2 className="text-center text-2xl font-extrabold text-[#ce636f] border-text">
              DEPREM ANINDA NE YAPILMALI?
            </h2>
            <p className="mt-2 font-semibold">
              • Sakin olun: Panik yapmak yerine bulunduğunuz yerde güvenli bir
              pozisyon alın.
            </p>
            <p className="font-semibold">
              • Çök-Kapan-Tutun hareketini uygulayın: Masa altı gibi sağlam bir
              nesnenin altına girin, başınızı koruyun ve sabit bir yere tutunun.
            </p>
            <p className="font-semibold">
              • Pencerelerden ve devrilebilecek eşyalardan uzak durun.
            </p>
            <p className="font-semibold">
              • Açık alandaysanız, binalardan, elektrik direklerinden ve
              ağaçlardan uzak durun.
            </p>
            <p className="font-semibold">
              • Asansör kullanmayın. Deprem anında ya da hemen sonrasında
              asansöre binmek tehlikelidir.
            </p>
            <p className="text-red-600 underline font-semibold mt-1">
              Daha detaylı bilgi almak için tıklayın.
            </p>
          </div>
        </div>
        <div className="lg:w-1/3 md:w-[49%] w-full z-20 lg:mt-0 mt-3">
          <div className="border-2 border-black rounded-3xl px-4 py-2 bg-white">
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
        </div>
        <div className="lg:w-1/3 md:w-[49%] w-full z-20 lg:mt-0 mt-3">
          <div className="border-2 border-black rounded-3xl p-2 bg-white">
            <h2 className="text-2xl text-center font-extrabold text-[#ce636f] border-text">
              SON TAHMİNLER
            </h2>
            <div className="flex bg-stone-50 border-2 border-black font-semibold px-2 py-1 cursor-pointer rounded-xl items-center justify-between mt-2">
              <div className="flex items-center gap-3">
                <p>BL : 22</p>
                <p>BS : 2.4</p>
                <p>BA : 13</p>
              </div>
              <div className="text-green-500 font-bold">Pred : 1.21</div>
            </div>
            <div className="flex bg-stone-50 border-2 border-black font-semibold px-2 py-1 cursor-pointer rounded-xl items-center justify-between mt-2">
              <div className="flex items-center gap-3">
                <p>BL : 22</p>
                <p>BS : 2.4</p>
                <p>BA : 13</p>
              </div>
              <div className="text-orange-500 font-bold">Pred : 2.21</div>
            </div>
            <div className="flex bg-stone-50 border-2 border-black font-semibold px-2 py-1 cursor-pointer rounded-xl items-center justify-between mt-2">
              <div className="flex items-center gap-3">
                <p>BL : 22</p>
                <p>BS : 2.4</p>
                <p>BA : 13</p>
              </div>
              <div className="text-red-500 font-bold">Pred : 2.53</div>
            </div>
            <div className="flex bg-stone-50 border-2 border-black font-semibold px-2 py-1 cursor-pointer rounded-xl items-center justify-between mt-2">
              <div className="flex items-center gap-3">
                <p>BL : 22</p>
                <p>BS : 2.4</p>
                <p>BA : 13</p>
              </div>
              <div className="text-green-500 font-bold">Pred : 1.48</div>
            </div>
            <div className="flex bg-stone-50 border-2 border-black font-semibold px-2 py-1 cursor-pointer rounded-xl items-center justify-between mt-2">
              <div className="flex items-center gap-3">
                <p>BL : 22</p>
                <p>BS : 2.4</p>
                <p>BA : 13</p>
              </div>
              <div className="text-orange-500 font-bold">Pred : 1.68</div>
            </div>
          </div>
          <div className="border-2 border-black rounded-3xl p-2 bg-white mt-2">
            <h2 className="text-2xl text-center font-extrabold text-[#ce636f] border-text">
              KAYDEDİLMİŞ VERİLER
            </h2>
            <div className="flex bg-stone-50 border-2 border-black font-semibold px-2 py-1 cursor-pointer rounded-xl items-center justify-between mt-2">
              <div className="flex items-center gap-3">
                <p>BL : 22</p>
                <p>BS : 2.4</p>
                <p>BA : 13</p>
              </div>
              <div className="text-orange-500 font-bold">Pred : 1.68</div>
            </div>
            <div className="flex bg-stone-50 border-2 border-black font-semibold px-2 py-1 cursor-pointer rounded-xl items-center justify-between mt-2">
              <div className="flex items-center gap-3">
                <p>BL : 22</p>
                <p>BS : 2.4</p>
                <p>BA : 13</p>
              </div>
              <div className="text-green-500 font-bold">Pred : 1.48</div>
            </div>
            <div className="flex bg-stone-50 border-2 border-black font-semibold px-2 py-1 cursor-pointer rounded-xl items-center justify-between mt-2">
              <div className="flex items-center gap-3">
                <p>BL : 22</p>
                <p>BS : 2.4</p>
                <p>BA : 13</p>
              </div>
              <div className="text-orange-500 font-bold">Pred : 1.68</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
