import React, { useState } from "react";
import axios from "axios";
import BuildingVisualization from "../../components/BuildingVisualization/BuildingVisualization";
import toast from "react-hot-toast";

const AddBuildingData = () => {
  const [formData, setFormData] = useState({
    plinth_area_sq_ft: "",
    magnitude: "",
    land_surface_condition: "",
    count_floors_pre_eq: "",
    count_floors_post_eq: "",
    height_ft_pre_eq: "",
    height_ft_post_eq: "",
    roof_type: "",
    age_building: "",
    foundation_type: "",
    ground_floor_type: "",
    felt_damage: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showDamage, setShowDamage] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setShowDamage(false); // Hide damage when form changes
  };
  const notify = (text) => toast.success(text);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setShowDamage(false);

    try {
      const authTokens = JSON.parse(localStorage.getItem("authTokens"));
      const accessToken = authTokens?.access;

      const response = await axios.post(
        "http://127.0.0.1:8000/api/save-real-data/",
        formData,
        {
          headers: {
            Authorization: `Token ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      notify(response.data.message);
    } catch (error) {
      console.error(error);
      alert("Tahmin yapılırken bir hata oluştu");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 px-12 mx-auto bg-[#FED260] min-h-[calc(100vh-60px)] font-raleway">
      <img
        src="/src/assets/login.svg"
        alt="login"
        className="w-full lg:scale-[1.0] md:scale-[1.5] sm:scale-[1.75] scale-[2.0] lg:bottom-0 md:bottom-16 sm:bottom-24 bottom-12 absolute bottom-0 left-0 select-none"
      />
      <div>
        <div className="flex justify-center">
          <div className="text-3xl font-bold mb-6 text-center bg-white border-2 border-black rounded-xl p-2 px-4 z-20 w-fit">
            <h2 className="text-3xl text-center font-extrabold text-[#ce636f] border-text">
              GEÇMİŞ BİNA VERİSİ EKLE
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
              <label className="block mb-1 font-medium">
                Plinth Area (sq ft)
              </label>
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
              <label className="block mb-1 font-medium">
                Deprem Öncesi Bina Yüksekliği (ft)
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
              <label className="block mb-1 font-medium">
                Deprem Sonrası Bina Yüksekliği (ft)
              </label>
              <input
                type="number"
                name="height_ft_post_eq"
                value={formData.height_ft_post_eq}
                onChange={handleChange}
                className="w-full p-2 border-2 border-black rounded-lg font-semibold"
                required
                min="10"
                max="100"
              />
            </div>

            <div className="form-group">
              <label className="block mb-1 font-medium">
                Deprem Öncesi Kat Sayısı
              </label>
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
                Deprem Sonrası Kat Sayısı
              </label>
              <input
                type="number"
                name="count_floors_post_eq"
                value={formData.count_floors_post_eq}
                onChange={handleChange}
                className="w-full p-2 border-2 border-black rounded-lg font-semibold"
                required
                min="1"
                max="10"
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

            <div className="form-group">
              <label className="block mb-1 font-medium">
                Hissettiğiniz hasar seviyesi (1 ile 3 arasında)
              </label>

              <input
                type="number"
                step="0.01"
                name="felt_damage"
                value={formData.felt_damage}
                onChange={handleChange}
                className="w-full p-2 border-2 border-black rounded-lg font-semibold"
                required
                min="0.1"
              />
            </div>

            <div className="md:col-span-2">
              <div className="flex lg:flex-nowrap flex-wrap gap-3 items-center">
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className={`w-full py-2 px-4 rounded-xl text-white font-semibold text-lg border-2 border-black ${
                    isLoading
                      ? "bg-gray-400"
                      : "bg-orange-400 hover:bg-orange-500 duration-200"
                  }`}
                >
                  {isLoading ? "Kaydediliyor..." : "Kaydet"}
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Visualization Section */}
        <div className="w-full bg-white bg-stone-50 p-6 pb-9 h-fit rounded-xl shadow-lg z-20 border-2 border-black">
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
        </div>
      </div>
    </div>
  );
};

export default AddBuildingData;
