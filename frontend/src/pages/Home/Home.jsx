import { useContext, useEffect } from "react";
import AuthContext from "../../context/context";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const {
    user,
    logoutUser,
    getLatestPredictions,
    latestPredictions,
    getLatestAddedFullBuildings,
    fullBuildings,
  } = useContext(AuthContext);

  useEffect(() => {
    getLatestPredictions();
    getLatestAddedFullBuildings();
  }, []);

  return (
    <div className="px-6 py-4 bg-[#FED260] min-h-[calc(100vh-60px)] font-raleway">
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
                  className="flex bg-stone-50 border-2 border-black font-semibold px-2 py-1 cursor-pointer rounded-xl items-center justify-between mt-2"
                >
                  <div className="flex items-center gap-3">
                    <p>BH : {data.building_height}</p>
                    <p>BA : {data.building_age}</p>
                    <p>MAG : {data.earthquake_magnitude}</p>
                  </div>
                  <div className="text-green-500 font-bold">
                    Pred :{" "}
                    <span className="font-extrabold">
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
              <p className="text-center font-semibold">
                Gireceğiniz veriler ile bize destek olabilirsiniz, tıklayın ve
                binanızın bilgilerini girerek hasar bilgilerini girin.
              </p>
            </Link>
            {fullBuildings?.map((data) => {
              return (
                <Link
                  to={`/prediciton-detail/${data.id}`}
                  key={data.id}
                  className="flex bg-stone-50 border-2 border-black font-semibold px-2 py-1 cursor-pointer rounded-xl items-center justify-between mt-2"
                >
                  <div className="flex items-center gap-3">
                    <p>BH : {data.building_height_pre_eq}</p>
                    <p>BA : {data.building_age}</p>
                    <p>MAG : {data.earthquake_magnitude}</p>
                  </div>
                  <div className="text-green-500 font-bold">
                    Pred :{" "}
                    <span className="font-extrabold">
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
