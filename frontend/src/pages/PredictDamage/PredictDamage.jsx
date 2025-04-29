import React, { useState } from "react";
import axios from "axios";

const PredictDamage = () => {
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const authTokens = JSON.parse(localStorage.getItem("authTokens"));
      const accessToken = authTokens?.access;

      const response = await axios.post(
        "http://127.0.0.1:8000/api/predict-damage/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      setPredictions(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Bina Hasar Tahmini</h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <input
          type="number"
          name="plinth_area_sq_ft"
          placeholder="Plinth Area (sq ft)"
          value={formData.plinth_area_sq_ft}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <input
          type="number"
          step="0.1"
          name="magnitude"
          placeholder="Deprem Şiddeti (Magnitude)"
          value={formData.magnitude}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />

        <select
          name="land_surface_condition"
          value={formData.land_surface_condition}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        >
          <option value="">Zemin Eğimi Seç</option>
          <option value="Flat">Flat</option>
          <option value="Moderate slope">Moderate slope</option>
          <option value="Steep slope">Steep slope</option>
        </select>

        <input
          type="number"
          name="count_floors_pre_eq"
          placeholder="Kat Sayısı"
          value={formData.count_floors_pre_eq}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />

        <input
          type="number"
          name="height_ft_pre_eq"
          placeholder="Bina Yüksekliği (ft)"
          value={formData.height_ft_pre_eq}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />

        <select
          name="roof_type"
          value={formData.roof_type}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        >
          <option value="">Çatı Türü Seç</option>
          <option value="Bamboo/Timber-Light roof">
            Bamboo/Timber-Light roof
          </option>
          <option value="Bamboo/Timber-Heavy roof">
            Bamboo/Timber-Heavy roof
          </option>
          <option value="RCC/RB/RBC">RCC/RB/RBC</option>
        </select>

        <input
          type="number"
          name="age_building"
          placeholder="Bina Yaşı"
          value={formData.age_building}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />

        <select
          name="foundation_type"
          value={formData.foundation_type}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        >
          <option value="">Temel Türü Seç</option>
          <option value="Mud mortar-Stone/Brick">Mud mortar-Stone/Brick</option>
          <option value="Bamboo/Timber">Bamboo/Timber</option>
          <option value="Cement-Stone/Brick">Cement-Stone/Brick</option>
          <option value="RC">RC</option>
        </select>

        <select
          name="ground_floor_type"
          value={formData.ground_floor_type}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        >
          <option value="">Zemin Kat Türü Seç</option>
          <option value="Mud">Mud</option>
          <option value="RC">RC</option>
          <option value="Brick/Stone">Brick/Stone</option>
          <option value="Timber">Timber</option>
        </select>

        <button
          type="submit"
          className="col-span-1 md:col-span-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Tahmin Et
        </button>
      </form>

      {predictions && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Modellerin Tahminleri:</h3>
          <ul className="list-disc list-inside">
            {Object.entries(predictions).map(([model, prediction]) => (
              <li key={model}>
                <strong>{model}:</strong> {prediction}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PredictDamage;
