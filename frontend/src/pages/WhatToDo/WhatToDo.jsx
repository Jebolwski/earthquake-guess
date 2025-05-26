import { Helmet } from "react-helmet";

const WhatToDo = () => {
  return (
    <div className="px-6 py-4 bg-[#FED260] min-h-[calc(100vh-60px)] font-raleway">
      <Helmet>
        <title>Deprem Anında Ne Yapılmalı?</title>
      </Helmet>
      <img
        src="/src/assets/login.svg"
        alt="login"
        className="w-full lg:scale-[1.0] md:scale-[1.5] sm:scale-[1.75] scale-[2.0] lg:bottom-0 md:bottom-16 sm:bottom-24 bottom-12 fixed bottom-0 left-0 select-none"
      />
      <div>
        <div className="flex justify-center">
          <div className="font-bold mb-6 text-center bg-white border-2 border-black rounded-xl p-2 px-4 z-20 w-fit">
            <h2 className="text-3xl text-center font-extrabold text-[#ce636f] border-text">
              DEPREM ANINDA NE YAPILMALI?
            </h2>
          </div>
        </div>
      </div>
      <div>
        <div className="flex justify-center lg:flex-nowrap flex-wrap gap-3">
          <div className="mb-6 lg:w-1/2 w-full font-semibold bg-white border-2 border-black rounded-xl p-2 px-4 z-20 w-fit z-20">
            <p>
              Depremler aniden gerçekleştiği için, ne yapılacağını önceden
              bilmek ve bu bilgileri uygulamaya hazır olmak hayati önem taşır.
              Özellikle okullarda, evlerde ve iş yerlerinde yapılan deprem
              tatbikatları, hem bireylerin hem de toplulukların reflekslerini
              geliştirir. Deprem anında ve sonrasında dikkat edilmesi gereken
              bazı önemli durumlar ise şunlardır:
            </p>

            <div className="mt-3">
              <div className="mt-5 font-normal">
                <h2 className="font-bold text-red-500">
                  Sakin olun ve panik yapmayın
                </h2>
                Panik yapmak doğru düşünmeyi engeller. Sakin kalmak, doğru ve
                hızlı hareket etmenizi sağlar.
              </div>
              <div className="mt-5 font-normal">
                <h2 className="font-bold text-red-500">
                  Güvenli bir yerde “çök-kapan-tutun” pozisyonu alın
                </h2>

                <p>
                  Sağlam bir masa, sıra, koltuk gibi eşyaların altına girin. Diz
                  çökerek kapanın, baş ve boynunuzu koruyun ve eşyaya sıkıca
                  tutunun. Bu yöntem, düşen cisimlerden korunmanıza yardımcı
                  olur.
                </p>
              </div>
              <div className="mt-5 font-normal">
                <h2 className="font-bold text-red-500">
                  Pencerelerden ve camlı eşyalardan uzak durun
                </h2>
                Camlar kırılarak sizi yaralayabilir. Bu nedenle pencere
                kenarlarından ve camlı dolaplardan uzak durmak gerekir.
              </div>
              <div className="mt-5 font-normal">
                <h2 className="font-bold text-red-500">
                  Açıkta kalmışsanız duvar diplerine veya iç köşelere geçin
                </h2>
                Güvenli bir siper bulamazsanız, iç duvar kenarına ya da odanın
                köşe noktalarına çömelerek başınızı koruyun. Üzerinize düşecek
                eşyalardan uzak durmaya çalışın.
              </div>
              <div className="mt-5 font-normal">
                <h2 className="font-bold text-red-500">
                  Asansör kullanmayın ve merdivenlere yönelmeyin
                </h2>
                Deprem sırasında veya hemen sonrasında asansör kullanmak çok
                tehlikelidir. Elektrik kesintisi veya mekanik arıza durumunda
                asansörde mahsur kalabilirsiniz. Merdivenler, binanın en zayıf
                bölümleri arasında sayılır.
              </div>

              <div className="mt-5 font-normal">
                <h2 className="font-bold text-red-500">
                  Deprem bitene kadar yerinizde kalın
                </h2>
                Sarsıntı devam ederken hareket etmeyin. Yer değiştirmek daha
                büyük riskler doğurabilir. Sarsıntı geçene kadar güvenli
                pozisyonda kalın.
              </div>
              <div className="mt-5 font-normal">
                <h2 className="font-bold text-red-500">
                  Sarsıntı durduktan sonra binayı dikkatli şekilde terk edin
                </h2>
                Artçı sarsıntılara karşı dikkatli olun. Çıkış yollarının güvenli
                olduğundan emin olun ve mümkünse ayakkabınızı giyin, çantanızı
                alarak açık ve güvenli bir alana yönelin.
              </div>
            </div>

            <p className="mt-3">
              Unutulmamalıdır ki, deprem yalnızca sarsıntı anıyla sınırlı bir
              tehlike değildir; sonrasında meydana gelebilecek artçı
              sarsıntılar, gaz kaçakları, yangınlar ve iletişim kesintileri gibi
              riskler de bulunmaktadır. Bu nedenle, deprem sonrası için de plan
              yapmak gerekir. Örneğin, iletişim hatları çöktüğünde aile
              bireylerinin bir araya gelebileceği güvenli bir yer belirlemek ve
              herkesin bunu bilmesini sağlamak önemlidir. Bilinçli ve hazırlıklı
              olmak, deprem sırasında ve sonrasında hayatta kalma ve başkalarına
              yardım etme şansını büyük ölçüde artırır.
            </p>
          </div>
          <iframe
            className="lg:h-[500px] md:h-[350px] h-[200px] w-full rounded-xl border-2 border-black lg:w-1/2 w-full z-20"
            src="https://www.youtube.com/embed/oZeI0X40EEY?si=5m1rfM9YYzdkIcOO&autoplay=1&mute=1&rel=0"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default WhatToDo;
