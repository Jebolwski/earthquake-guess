const WhatToDo = () => {
  return (
    <div className="px-6 py-4 bg-[#FED260] min-h-[calc(100vh-60px)] font-raleway">
      <img
        src="/src/assets/login.svg"
        alt="login"
        className="w-full lg:scale-[1.0] md:scale-[1.5] sm:scale-[1.75] scale-[2.0] lg:bottom-0 md:bottom-16 sm:bottom-24 bottom-12 absolute bottom-0 left-0 select-none"
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
            <p className="text-lg">
              • Sakin olun: Panik yapmak yerine bulunduğunuz yerde güvenli bir
              pozisyon alın.
            </p>
            <p className="text-lg">
              • Çök-Kapan-Tutun hareketini uygulayın: Masa altı gibi sağlam bir
              nesnenin altına girin, başınızı koruyun ve sabit bir yere tutunun.
            </p>
            <p className="text-lg">
              • Pencerelerden ve devrilebilecek eşyalardan uzak durun.
            </p>
            <p className="text-lg">
              • Açık alandaysanız, binalardan, elektrik direklerinden ve
              ağaçlardan uzak durun.
            </p>
            <p className="text-lg">
              • Asansör kullanmayın. Deprem anında ya da hemen sonrasında
              asansöre binmek tehlikelidir.
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
