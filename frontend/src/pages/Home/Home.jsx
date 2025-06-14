import { useContext, useEffect } from "react";
import AuthContext from "../../context/context";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const Home = () => {
  const {
    user,
    logoutUser,
    getLatestPredictions,
    latestPredictions,
    getLatestAddedFullBuildings,
    fullBuildings,
    getUsersLastThreePredictions,
    usersLatestPredictions,
    getUsersLastThreeAddedBuildings,
    usersLatestAddedBuildings,
  } = useContext(AuthContext);

  useEffect(() => {
    getLatestPredictions();
    getLatestAddedFullBuildings();
    getUsersLastThreePredictions();
    getUsersLastThreeAddedBuildings();
  }, []);

  return (
    <div className="lg:px-6 px-3 py-4 bg-[#FED260] min-h-[calc(100vh-60px)] font-raleway">
      <Helmet>
        <title>Guerthquake</title>
      </Helmet>
      <img
        src="/src/assets/clouds.svg"
        alt="clouds1"
        className="w-fit fixed left-6 top-16 z-10"
      />
      <img
        src="/src/assets/clouds.svg"
        alt="clouds2"
        className="w-fit fixed right-0 bottom-12 z-10"
      />
      <img
        src="/src/assets/left-bottom-home.svg"
        alt="clouds2"
        className="w-fit fixed left-0 bottom-0 z-10"
      />
      <img
        src="/src/assets/clouds.svg"
        alt="clouds2"
        className="w-fit absolute right-0 top-12 z-10 scale-x-[-1]"
      />

      <div className="flex lg:flex-nowrap flex-wrap justify-between lg:gap-3 gap-0 mt-5">
        <div className="lg:w-5/12 w-full z-20">
          <div className="border-2 border-black rounded-3xl px-4 py-2 bg-[#ececec]">
            <h2 className="text-2xl text-center font-extrabold text-[#ce636f] border-text">
              GUERTHQUAKE NEDİR?
            </h2>
            <p className="mt-3 font-semibold text-[18px]">
              2015 yılında Nepal'de gerçekleşen Gorkha depremine ait gerçek
              verilerle eğitilen bir makine öğrenimi modeli geliştirilmiştir. Bu
              model, kullanıcıların sağladığı bina bilgilerine göre, olası bir
              depremde yapının ne düzeyde hasar alabileceğini tahmin etmektedir.
            </p>
            <p className="mt-3 font-semibold text-[18px]">
              Web uygulamamız üzerinden bina bilgilerinizi (kat sayısı, yapı
              tipi, bina yaşı vb.) kolayca girerek, binanızın potansiyel risk
              durumunu anında öğrenebilirsiniz. Böylece, afetlere karşı daha
              bilinçli kararlar almanıza ve önlem planlamanıza katkı sağlamayı
              amaçlıyoruz.
            </p>
          </div>
          <div className="border-2 border-black rounded-3xl px-4 py-2 bg-[#ececec] mt-2">
            <h2 className="text-center text-2xl font-extrabold text-[#ce636f] border-text">
              DEPREM ANINDA NE YAPILMALI?
            </h2>
            <p className="mt-2 font-semibold text-[18px]">
              • Sakin olun: Panik yapmak yerine bulunduğunuz yerde güvenli bir
              pozisyon alın.
            </p>
            <p className="font-semibold text-[18px]">
              • Çök-Kapan-Tutun hareketini uygulayın: Masa altı gibi sağlam bir
              nesnenin altına girin, başınızı koruyun ve sabit bir yere tutunun.
            </p>
            <p className="font-semibold text-[18px]">
              • Pencerelerden ve devrilebilecek eşyalardan uzak durun.
            </p>
            <p className="font-semibold text-[18px]">
              • Açık alandaysanız, binalardan, elektrik direklerinden ve
              ağaçlardan uzak durun.
            </p>
            <p className="font-semibold text-[18px]">
              • Asansör kullanmayın. Deprem anında ya da hemen sonrasında
              asansöre binmek tehlikelidir.
            </p>
            <div className="flex">
              <Link
                to={"/what-to-do"}
                className="text-red-600 bg-red-500 hover:bg-red-700 duration-200 cursor-pointer text-white border-2 border-black px-2 py-1 rounded-xl font-semibold mt-1"
              >
                Daha detaylı bilgi almak için tıklayın.
              </Link>
            </div>
          </div>
          {usersLatestPredictions && usersLatestPredictions.length > 0 ? (
            <div className="border-2 border-black rounded-3xl px-4 py-2 bg-[#ececec] mt-2">
              <h2 className="text-center text-2xl font-extrabold text-[#ce636f] border-text">
                YAPTIĞINIZ SON TAHMİNLER
              </h2>

              {usersLatestPredictions?.map((data) => {
                return (
                  <Link
                    to={`/prediciton-detail/${data.id}`}
                    key={data.id}
                    className="flex bg-stone-50 border-2 border-[#e5e7eb] font-semibold px-2 py-1 cursor-pointer rounded-xl items-center justify-between mt-2"
                  >
                    <div className="flex flex-wrap items-center gap-3">
                      {/* YK Tooltip */}
                      <div className="relative group">
                        <p>
                          Yükseklik:{" "}
                          {parseFloat(
                            data.building_height / 3.28083989501
                          ).toFixed(1)}
                        </p>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:flex bg-black text-white text-xs px-2 py-1 rounded-md z-20 whitespace-nowrap">
                          Bina Yüksekliği (metre)
                        </div>
                      </div>

                      {/* YŞ Tooltip */}
                      <div className="relative group">
                        <p>Yaş: {data.building_age}</p>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:flex bg-black text-white text-xs px-2 py-1 rounded-md z-20 whitespace-nowrap">
                          Bina Yaşı
                        </div>
                      </div>

                      {/* BY Tooltip */}
                      <div className="relative group">
                        <p>Deprem: {data.earthquake_magnitude}</p>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:flex bg-black text-white text-xs px-2 py-1 rounded-md z-20 whitespace-nowrap">
                          Deprem Büyüklüğü
                        </div>
                      </div>
                    </div>

                    <div className="font-bold">
                      Pred:{" "}
                      <span
                        className={`font-extrabold ${
                          data.prediction < 1.5
                            ? "text-green-500"
                            : data.prediction < 2.5
                            ? "text-orange-500"
                            : "text-red-500"
                        }`}
                      >
                        {data.prediction.toFixed(2)}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : null}
        </div>
        <div className="lg:w-1/4 md:w-[49%] w-full z-20 lg:mt-0 mt-3">
          <div className="border-2 border-black rounded-3xl px-4 py-2 bg-[#ececec]">
            <div>
              <Link
                to={"/predict-damage"}
                className="flex flex-col justify-center my-3"
              >
                <h2 className="text-2xl hover:text-red-400 cursor-pointer duration-300 text-center font-extrabold text-[#ce636f] border-text">
                  TIKLA, HASAR TAHMİN ET
                </h2>
                <img
                  src="/src/assets/building.svg"
                  className="w-full mt-3"
                />
              </Link>
              {/* <p className="mt-2 font-semibold">
                “Deprem tahmini yapmak için tıklayınız” bağlantısı, kullanıcıyı
                bina özelliklerini ve çevresel faktörleri girerek olası deprem
                hasar seviyesini tahmin edebileceği özel bir sayfaya
                yönlendirir. Bu sayfada, yapay zeka modelleri aracılığıyla
                girilen verilere göre binanın deprem karşısında maruz
                kalabileceği hasar seviyesi belirlenir ve kullanıcıya detaylı
                sonuçlar sunulur.
              </p>

              <Link
                to={"/predict-damage"}
                className="text-red-600 text-lg underline font-semibold mt-2"
              >
                Bina hasar tahmini yapmak için tıklayınız.
              </Link> */}
            </div>
          </div>
          {usersLatestAddedBuildings && usersLatestAddedBuildings.length > 0 ? (
            <div className="border-2 border-black rounded-3xl px-4 py-2 bg-[#ececec] mt-2">
              <h2 className="text-center text-2xl font-extrabold text-[#ce636f] border-text">
                EKLEDİĞİNİZ SON BİNALAR
              </h2>

              {usersLatestAddedBuildings?.map((data) => {
                return (
                  <Link
                    to={`/full-building-prediction-detail/${data.id}`}
                    key={data.id}
                    className="flex bg-stone-50 border-2 border-[#e5e7eb] font-semibold px-2 py-1 cursor-pointer rounded-xl items-center justify-between mt-2"
                  >
                    <div className="flex flex-wrap items-center gap-3">
                      {/* YK Tooltip */}
                      <div className="relative group">
                        <p>
                          Yükseklik:{" "}
                          {parseFloat(
                            data.building_height_pre_eq / 3.28083989501
                          ).toFixed(1)}
                        </p>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:flex bg-black text-white text-xs px-2 py-1 rounded-md z-10 whitespace-nowrap">
                          Bina Yüksekliği (metre)
                        </div>
                      </div>

                      {/* YŞ Tooltip */}
                      <div className="relative group">
                        <p>Yaş: {data.building_age}</p>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:flex bg-black text-white text-xs px-2 py-1 rounded-md z-10 whitespace-nowrap">
                          Bina Yaşı
                        </div>
                      </div>

                      {/* BY Tooltip */}
                      <div className="relative group">
                        <p>Deprem : {data.earthquake_magnitude}</p>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:flex bg-black text-white text-xs px-2 py-1 rounded-md z-10 whitespace-nowrap">
                          Deprem Büyüklüğü
                        </div>
                      </div>
                    </div>

                    <div className="font-bold">
                      Pred:{" "}
                      <span
                        className={`font-extrabold ${
                          data.felt_damage < 1.5
                            ? "text-green-500"
                            : data.felt_damage < 2.5
                            ? "text-orange-500"
                            : "text-red-500"
                        }`}
                      >
                        {data.felt_damage.toFixed(2)}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : null}
        </div>
        <div className="lg:w-4/12 md:w-[49%] w-full z-20 lg:mt-0 mt-3">
          <div className="border-2 border-black rounded-3xl p-2 bg-[#ececec]">
            <h2 className="text-2xl text-center font-extrabold text-[#ce636f] border-text">
              SON TAHMİNLER
            </h2>
            <p className="font-semibold mt-1 text-center">
              Uygulama üzerinden gerçekleştirilen son tahminlerdir.
            </p>
            {latestPredictions?.map((data) => {
              return (
                <Link
                  to={`/prediciton-detail/${data.id}`}
                  key={data.id}
                  className="flex bg-stone-50 border-2 border-[#e5e7eb] font-semibold px-2 py-1 cursor-pointer rounded-xl items-center justify-between mt-2"
                >
                  <div className="flex flex-wrap items-center gap-3">
                    {/* YK Tooltip */}
                    <div className="relative group">
                      <p>
                        Yükseklik:{" "}
                        {parseFloat(
                          data.building_height / 3.28083989501
                        ).toFixed(1)}
                      </p>
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:flex bg-black text-white text-xs px-2 py-1 rounded-md z-10 whitespace-nowrap">
                        Bina Yüksekliği (metre)
                      </div>
                    </div>

                    {/* YŞ Tooltip */}
                    <div className="relative group">
                      <p>Yaş: {data.building_age}</p>
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:flex bg-black text-white text-xs px-2 py-1 rounded-md z-10 whitespace-nowrap">
                        Bina Yaşı
                      </div>
                    </div>

                    {/* BY Tooltip */}
                    <div className="relative group">
                      <p>Deprem: {data.earthquake_magnitude}</p>
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:flex bg-black text-white text-xs px-2 py-1 rounded-md z-10 whitespace-nowrap">
                        Deprem Büyüklüğü
                      </div>
                    </div>
                  </div>

                  <div className="font-bold">
                    Pred:{" "}
                    <span
                      className={`font-extrabold ${
                        data.prediction < 1.5
                          ? "text-green-500"
                          : data.prediction < 2.5
                          ? "text-orange-500"
                          : "text-red-500"
                      }`}
                    >
                      {data.prediction.toFixed(2)}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="border-2 border-black rounded-3xl p-2 bg-[#ececec] mt-2">
            <h2 className="text-2xl text-center font-extrabold text-[#ce636f] border-text">
              KAYDEDİLMİŞ VERİLER
            </h2>
            <Link to={"/add-building-data"}>
              <p className="text-center font-semibold hover:text-[#ce636f] duration-200">
                Gireceğiniz veriler ile bize destek olabilirsiniz, tıklayın ve
                binanızın bilgilerini girerek hasar bilgilerini girin.
              </p>
            </Link>
            {fullBuildings?.map((data) => {
              return (
                <Link
                  to={`/full-building-prediction-detail/${data.id}`}
                  key={data.id}
                  className="flex bg-stone-50 border-2 border-[#e5e7eb] font-semibold px-2 py-1 cursor-pointer rounded-xl items-center justify-between mt-2"
                >
                  <div className="flex flex-wrap items-center gap-3">
                    {/* YK Tooltip */}
                    <div className="relative group">
                      <p>
                        Yükseklik:{" "}
                        {parseFloat(
                          data.building_height_pre_eq / 3.28083989501
                        ).toFixed(2)}
                      </p>
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:flex bg-black text-white text-xs px-2 py-1 rounded-md z-20 whitespace-nowrap">
                        Bina Yüksekliği (metre)
                      </div>
                    </div>

                    {/* YŞ Tooltip */}
                    <div className="relative group">
                      <p>Yaş: {data.building_age}</p>
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:flex bg-black text-white text-xs px-2 py-1 rounded-md z-20 whitespace-nowrap">
                        Bina Yaşı
                      </div>
                    </div>

                    {/* BY Tooltip */}
                    <div className="relative group">
                      <p>Deprem: {data.earthquake_magnitude}</p>
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:flex bg-black text-white text-xs px-2 py-1 rounded-md z-20 whitespace-nowrap">
                        Deprem Büyüklüğü
                      </div>
                    </div>
                  </div>

                  <div className="font-bold">
                    Pred:{" "}
                    <span
                      className={`font-extrabold ${
                        data.felt_damage < 1.5
                          ? "text-green-500"
                          : data.felt_damage < 2.5
                          ? "text-orange-500"
                          : "text-red-500"
                      }`}
                    >
                      {data.felt_damage.toFixed(2)}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
