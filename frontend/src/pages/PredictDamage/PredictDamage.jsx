import { useState, useContext } from "react";
import axios from "axios";
import BuildingVisualization from "../../components/BuildingVisualization/BuildingVisualization";
import AuthContext from "../../context/context";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

const PredictDamage = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    plinth_area_sq_ft: "",
    magnitude: "",
    land_surface_condition: "",
    count_floors_pre_eq: "",
    height_ft_pre_eq: "",
    roof_type: "",
    age_building: "",
    foundation_type: "",
    ground_floor_type: "",
  });

  const [predictions, setPredictions] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showDamage, setShowDamage] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setShowDamage(false);
  };

  const validateForm = () => {
    const requiredFields = [
      "plinth_area_sq_ft",
      "magnitude",
      "land_surface_condition",
      "count_floors_pre_eq",
      "height_ft_pre_eq",
      "roof_type",
      "age_building",
      "foundation_type",
      "ground_floor_type",
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        toast.error(`Lütfen ${fieldToLabel(field)} alanını doldurunuz!`);
        return false;
      }
    }
    return true;
  };

  const fieldToLabel = (fieldName) => {
    const labels = {
      plinth_area_sq_ft: "Bina Alanı",
      magnitude: "Deprem Şiddeti",
      land_surface_condition: "Zemin Eğimi",
      count_floors_pre_eq: "Kat Sayısı",
      height_ft_pre_eq: "Bina Yüksekliği",
      roof_type: "Çatı Türü",
      age_building: "Bina Yaşı",
      foundation_type: "Temel Türü",
      ground_floor_type: "Zemin Kat Türü",
    };
    return labels[fieldName] || fieldName;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setShowDamage(false);

    try {
      const authTokens = JSON.parse(localStorage.getItem("authTokens"));
      const accessToken = authTokens?.access;
      let headers = {
        "Content-Type": "application/json",
      };
      if (accessToken != null) {
        headers = {
          Authorization: `Token ${accessToken}`,
          "Content-Type": "application/json",
        };
      }
      let formDataCopy = JSON.parse(JSON.stringify(formData));

      formDataCopy["plinth_area_sq_ft"] =
        formDataCopy["plinth_area_sq_ft"] * 10.7639150512;
      formDataCopy["height_ft_pre_eq"] =
        formDataCopy["height_ft_pre_eq"] * 3.28083989501;

      const response = await axios.post(
        "http://127.0.0.1:8000/api/predict-damage/",
        formDataCopy,
        { headers }
      );

      setPredictions(response.data);
      setShowDamage(true);

      toast.success("Tahmin başarıyla tamamlandı!");
    } catch (error) {
      console.error(error);
      toast.error("Tahmin yapılırken bir hata oluştu");
    } finally {
      setIsLoading(false);
    }
  };

  const predictAndSave = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (!user) {
      toast.warning("Bu işlem için giriş yapmalısınız");
      return;
    }

    setIsLoading(true);
    setShowDamage(false);

    try {
      const authTokens = JSON.parse(localStorage.getItem("authTokens"));
      const accessToken = authTokens?.access;

      const response = await axios.post(
        "http://127.0.0.1:8000/api/predict-damage-and-save/",
        formData,
        {
          headers: {
            Authorization: `Token ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      setPredictions(response.data.model_predictions);
      setShowDamage(true);

      toast.success("Tahmin başarıyla kaydedildi!");
    } catch (error) {
      console.error(error);
      toast.error("Tahmin kaydedilirken bir hata oluştu");
    } finally {
      setIsLoading(false);
    }
  };

  const calculateAverage = () => {
    if (!predictions) return 0;

    const values = Object.values(predictions).map(Number);
    const sum = values.reduce((acc, val) => acc + val, 0);
    const average = sum / values.length;

    return average.toFixed(2);
  };

  const getDamageLevel = () => {
    if (!showDamage) return "none";
    const avg = parseFloat(calculateAverage());
    if (avg >= 2.5) return "heavy";
    if (avg >= 1.5) return "medium";
    if (avg >= 1) return "light";
    return "none";
  };

  const getDamageDescription = () => {
    switch (getDamageLevel()) {
      case "heavy":
        return "Ağır Hasar - Bina Yıkıldı";
      case "medium":
        return "Orta Hasar - Önemli Çatlaklar";
      case "light":
        return "Hafif Hasar - Küçük Çatlaklar";
      default:
        return "Bina Durumu: Sağlam";
    }
  };

  const getDamageColor = () => {
    switch (getDamageLevel()) {
      case "heavy":
        return "text-red-600";
      case "medium":
        return "text-orange-500";
      case "light":
        return "text-yellow-600";
      default:
        return "text-green-600";
    }
  };

  return (
    <div className="p-6 px-12 mx-auto bg-[#FED260] min-h-[calc(100vh-60px)] font-raleway">
      <Helmet>
        <title>Bina Hasar Tahmini</title>
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
              BİNA HASAR TAHMİNİ
            </h2>
          </div>
        </div>
      </div>

      <div className="flex lg:flex-nowrap flex-wrap gap-8 z-20">
        {/* Form Section */}
        <div className="w-full bg-white bg-stone-50 p-6 h-fit rounded-xl shadow-lg z-20 border-2 border-black">
          <h2 className="text-2xl font-extrabold text-[#ce636f] border-text">
            BİNA BİLGİLERİNİ GİRİN
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="form-group">
              <label className="block mb-1 font-medium">Bina Alanı (m²)</label>
              <input
                type="number"
                name="plinth_area_sq_ft"
                value={formData.plinth_area_sq_ft}
                onChange={handleChange}
                className="w-full p-2 border-2 border-black rounded-lg font-semibold"
                required
                min="100"
              />
            </div>

            <div className="form-group">
              <label className="block mb-1 font-medium">Deprem Şiddeti</label>
              <input
                type="number"
                step="0.1"
                name="magnitude"
                value={formData.magnitude}
                onChange={handleChange}
                className="w-full p-2 border-2 border-black rounded-lg font-semibold"
                required
                min="0.1"
              />
            </div>

            <div className="form-group">
              <label className="block mb-1 font-medium">Zemin Eğimi</label>
              <select
                name="land_surface_condition"
                value={formData.land_surface_condition}
                onChange={handleChange}
                className="w-full p-2 border-2 border-black rounded-lg font-semibold"
                required
              >
                <option value="">Seçiniz</option>
                <option value="Flat">Düz</option>
                <option value="Moderate slope">Orta Eğimli</option>
                <option value="Steep slope">Dik Eğimli</option>
              </select>
            </div>

            <div className="form-group">
              <label className="block mb-1 font-medium">Kat Sayısı</label>
              <input
                type="number"
                name="count_floors_pre_eq"
                value={formData.count_floors_pre_eq}
                onChange={handleChange}
                className="w-full p-2 border-2 border-black rounded-lg font-semibold"
                required
                min="1"
                max="10"
              />
            </div>

            <div className="form-group">
              <label className="block mb-1 font-medium">
                Bina Yüksekliği (m)
              </label>
              <input
                type="number"
                name="height_ft_pre_eq"
                value={formData.height_ft_pre_eq}
                onChange={handleChange}
                className="w-full p-2 border-2 border-black rounded-lg font-semibold"
                required
                min="10"
                max="100"
              />
            </div>

            <div className="form-group">
              <label className="block mb-1 font-medium">Çatı Türü</label>
              <select
                name="roof_type"
                value={formData.roof_type}
                onChange={handleChange}
                className="w-full p-2 border-2 border-black rounded-lg font-semibold"
                required
              >
                <option value="">Seçiniz</option>
                <option value="Bamboo/Timber-Light roof">
                  Bamboo/Timber-Hafif
                </option>
                <option value="Bamboo/Timber-Heavy roof">
                  Bamboo/Timber-Ağır
                </option>
                <option value="RCC/RB/RBC">RCC/RB/RBC</option>
              </select>
            </div>

            <div className="form-group">
              <label className="block mb-1 font-medium">Bina Yaşı</label>
              <input
                type="number"
                name="age_building"
                value={formData.age_building}
                onChange={handleChange}
                className="w-full p-2 border-2 border-black rounded-lg font-semibold"
                required
                min="1"
                max="100"
              />
            </div>

            <div className="form-group">
              <label className="block mb-1 font-medium">Temel Türü</label>
              <select
                name="foundation_type"
                value={formData.foundation_type}
                onChange={handleChange}
                className="w-full p-2 border-2 border-black rounded-lg font-semibold"
                required
              >
                <option value="">Seçiniz</option>
                <option value="Mud mortar-Stone/Brick">
                  Çamur Harç-Taş/Tuğla
                </option>
                <option value="Bamboo/Timber">Bambu/Ahşap</option>
                <option value="Cement-Stone/Brick">Çimento-Taş/Tuğla</option>
                <option value="RC">Betonarme</option>
              </select>
            </div>

            <div className="form-group">
              <label className="block mb-1 font-medium">Zemin Kat Türü</label>
              <select
                name="ground_floor_type"
                value={formData.ground_floor_type}
                onChange={handleChange}
                className="w-full p-2 border-2 border-black rounded-lg font-semibold"
                required
              >
                <option value="">Seçiniz</option>
                <option value="Mud">Çamur</option>
                <option value="RC">Betonarme</option>
                <option value="Brick/Stone">Tuğla/Taş</option>
                <option value="Timber">Ahşap</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <div className="flex lg:flex-nowrap flex-wrap gap-3 items-center">
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className={`w-full py-2 px-4 rounded-xl text-white font-semibold text-lg border-2 border-black ${
                    isLoading
                      ? "bg-gray-400"
                      : "bg-blue-600 hover:bg-blue-700 duration-200"
                  }`}
                >
                  {isLoading ? "Tahmin Yapılıyor..." : "Tahmin Et"}
                </button>
                {user ? (
                  <button
                    onClick={predictAndSave}
                    disabled={isLoading}
                    className={`w-full py-2 px-4 rounded-xl text-white font-semibold text-lg border-2 border-black ${
                      isLoading
                        ? "bg-gray-400"
                        : "bg-cyan-600 hover:bg-cyan-700 duration-200"
                    }`}
                  >
                    {isLoading ? "Tahmin Yapılıyor..." : "Tahmin Et ve Kaydet"}
                  </button>
                ) : (
                  <button
                    onClick={predictAndSave}
                    disabled={true}
                    className={`w-full py-2 bg-gray-400 px-4 rounded-xl text-white font-semibold text-lg border-2 border-black cursor-not-allowed`}
                  >
                    {isLoading ? "Tahmin Yapılıyor..." : "Tahmin Et ve Kaydet"}
                  </button>
                )}
              </div>
            </div>
          </div>

          {predictions && (
            <div className="mt-6 p-4 bg-gray-50 border-2 border-black rounded-lg">
              <h3 className="text-xl font-semibold mb-3">
                Modellerin Tahminleri:
              </h3>
              <div className="grid-cols-1 md:grid-cols-2 gap-2">
                {Object.entries(predictions).map(([model, prediction]) => (
                  <div
                    key={model}
                    className="flex justify-between"
                  >
                    <span className="font-medium">{model}:</span>
                    <span>{prediction.toFixed(3)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        {/* Visualization Section */}
        <div className="w-full bg-white bg-stone-50 p-6 h-fit rounded-xl shadow-lg z-20 border-2 border-black">
          <BuildingVisualization
            floors={parseInt(formData.count_floors_pre_eq) || 3}
            height={parseInt(formData.height_ft_pre_eq) || 30}
            age={parseInt(formData.age_building) || 15}
            plinth={parseInt(formData.plinth_area_sq_ft) || 1000}
            slope={formData.land_surface_condition || "Flat"}
            foundationType={
              formData.foundation_type || "Mud mortar-Stone/Brick"
            }
            groundFloor={formData.ground_floor_type || "Mud"}
            roofType={formData.roof_type || "Bamboo/Timber-Light roof"}
            damageLevel={showDamage ? calculateAverage() : null}
          />

          <div className="mt-10 p-4 bg-gray-50 rounded-xl border-2 border-black">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">Hasar Durumu</h3>
              {showDamage ? (
                <span className={`text-lg font-bold ${getDamageColor()}`}>
                  {calculateAverage()}
                </span>
              ) : (
                <span className="text-lg font-bold text-gray-500">-</span>
              )}
            </div>
            <div className="text-sm text-gray-600 mb-2">
              (1-3 arası, 1: az hasar, 3: çok hasar)
            </div>
            <div className={`font-medium ${getDamageColor()}`}>
              {getDamageDescription()}
            </div>

            {showDamage && getDamageLevel() === "heavy" && (
              <div className="mt-3 p-2 bg-red-100 text-red-800 rounded text-sm">
                ⚠️ Bu bina ağır hasar görmüştür. Acilen tahliye edilmeli ve
                yıkılmalıdır.
              </div>
            )}
            {showDamage && getDamageLevel() === "medium" && (
              <div className="mt-3 p-2 bg-orange-100 text-orange-800 rounded text-sm">
                ⚠️ Bu binada önemli hasar var. Uzman kontrolü gereklidir.
              </div>
            )}
            {showDamage && getDamageLevel() === "light" && (
              <div className="mt-3 p-2 bg-yellow-100 text-yellow-800 rounded text-sm">
                ℹ️ Bu binada hafif hasar var. Kontrol edilmesi önerilir.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictDamage;
