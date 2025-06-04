import { useContext, useEffect } from "react";
import AuthContext from "../../context/context";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

const PredictionDetail = () => {
  const { id } = useParams();
  const { prediction, getAPrediction } = useContext(AuthContext);

  useEffect(() => {
    if (id) {
      getAPrediction(id);
    }
  }, [id]);

  // Veri çevirileri için sözlük
  const translations = {
    // Çatı Tipi
    "Bamboo/Timber-Light roof": "Bambu/Ahşap-Hafif çatı",
    "Bamboo/Timber-Heavy roof": "Bambu/Ahşap-Ağır çatı",
    "RCC/RB/RBC": "Betonarme",

    // Temel Tipi
    Other: "Diğer",
    "Mud mortar-Stone/Brick": "Çamur harcı-Taş/Tuğla",
    "Cement-Stone/Brick": "Çimento harcı-Taş/Tuğla",
    "Bamboo/Timber": "Bambu/Ahşap",
    RC: "Betonarme",

    // Zemin Durumu
    "Moderate slope": "Orta eğimli",
    Flat: "Düz",
    "Steep slope": "Dik eğimli",

    // Zemin Kat Tipi
    Mud: "Toprak",
    RC: "Betonarme",
    "Brick/Stone": "Tuğla/Taş",
    Timber: "Ahşap",
    Other: "Diğer",
  };

  // Tarih formatını düzenleme
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Tahmin sonucunu formatlama
  const formatPrediction = (value) => {
    if (value === undefined || value === null) return "-";
    if (value < 1.5) return "Az Riskli";
    if (value < 2.5) return "Orta Riskli";
    return "Yüksek Riskli";
  };

  return (
    <div className="flex justify-center min-h-[calc(100vh-60px)] px-2 pb-8 bg-gradient-to-b from-[#FED260] to-[#f8f9fa]">
      <Helmet>
        <title>Bina Deprem Risk Analizi Detayları</title>
      </Helmet>
      <div className="max-w-4xl w-full mt-8 space-y-6">
        <div className="text-center">
          <h1 className="lg:text-4xl md:text-3xl text-2xl font-bold text-[#2c3e50] bg-white p-4 rounded-xl shadow-lg border-2 border-[#ce636f]">
            Bina Deprem Risk Analizi Detayları
          </h1>
        </div>

        <div className="bg-white rounded-xl shadow-xl p-6 border-2 border-[#ce636f]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <DetailItem
                title="Bina Yaşı"
                value={`${prediction?.building_age || "-"} yıl`}
                icon="🏛️"
              />
              <DetailItem
                title="Kat Sayısı"
                value={prediction?.building_floor_count || "-"}
                icon="🏢"
              />
              <DetailItem
                title="Bina Yüksekliği"
                value={`${
                  (prediction?.building_height * 0.3048).toFixed(1) || "-"
                } m`}
                icon="📏"
              />
              <DetailItem
                title="Bina Alanı"
                value={`${
                  (prediction?.building_plinth_area * 0.092903).toFixed(1) ||
                  "-"
                } m²`}
                icon="🔲"
              />
              <DetailItem
                title="Deprem Büyüklüğü"
                value={(prediction?.building_height * 0.3048).toFixed(1) || "-"}
                icon="🌍"
              />
            </div>

            {/* Sağ Kolon */}
            <div className="space-y-4">
              <DetailItem
                title="Temel Tipi"
                value={
                  translations[prediction?.foundation_type] ||
                  prediction?.foundation_type ||
                  "-"
                }
                icon="🏗️"
              />
              <DetailItem
                title="Çatı Tipi"
                value={
                  translations[prediction?.roof_type] ||
                  prediction?.roof_type ||
                  "-"
                }
                icon="🏠"
              />
              <DetailItem
                title="Zemin Durumu"
                value={
                  translations[prediction?.land_surface_condition] ||
                  prediction?.land_surface_condition ||
                  "-"
                }
                icon="🌱"
              />
              <DetailItem
                title="Zemin Kat Tipi"
                value={
                  translations[prediction?.ground_floor_type] ||
                  prediction?.ground_floor_type ||
                  "-"
                }
                icon="🛠️"
              />
              <DetailItem
                title="Tahmin Tarihi"
                value={formatDate(prediction?.date_added)}
                icon="📅"
              />
            </div>
          </div>

          {/* Risk Göstergesi */}
          <div className="mt-8 p-4 rounded-lg bg-gradient-to-r from-blue-100 via-yellow-100 to-red-100">
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-[#2c3e50]">
                Risk Değerlendirmesi
              </h3>
              <div className="flex items-center justify-center mt-2">
                <span className="text-4xl mr-2">
                  {prediction?.prediction !== undefined &&
                  prediction?.prediction !== null
                    ? prediction.prediction < 1.5
                      ? "✅"
                      : prediction.prediction < 2.5
                      ? "⚠️"
                      : "❌"
                    : "-"}
                </span>
                <span className="text-3xl font-bold">
                  {formatPrediction(prediction?.prediction)}
                </span>
                {prediction?.prediction && (
                  <span className="ml-2 text-xl">
                    ({prediction.prediction.toFixed(2)})
                  </span>
                )}
              </div>
              <div className="mt-2 text-gray-600">
                {prediction?.prediction !== undefined &&
                  prediction?.prediction !== null && (
                    <>
                      {prediction.prediction < 1.5
                        ? "Düşük riskli bina"
                        : prediction.prediction < 2.5
                        ? "Orta riskli bina"
                        : "Yüksek riskli bina"}
                    </>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Yardımcı bileşen
const DetailItem = ({ title, value, icon }) => (
  <div className="flex items-start">
    <span className="text-2xl mr-3">{icon}</span>
    <div>
      <h4 className="text-lg font-semibold text-[#ce636f]">{title}</h4>
      <p className="text-xl font-medium text-gray-800">{value}</p>
    </div>
  </div>
);

export default PredictionDetail;
