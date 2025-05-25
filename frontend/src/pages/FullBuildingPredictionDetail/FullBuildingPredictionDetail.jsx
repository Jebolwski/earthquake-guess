import { useContext, useEffect } from "react";
import AuthContext from "../../context/context";
import { useParams } from "react-router-dom";

const FullBuildingPredictionDetail = () => {
  const { id } = useParams();
  const { getAPredictionFullBuilding, fullBuildingPrediction } =
    useContext(AuthContext);

  useEffect(() => {
    if (id) {
      getAPredictionFullBuilding(id);
    }
  }, [id]);

  // Veri çevirileri için sözlük
  const translations = {
    // Çatı Tipi Çevirileri
    "Bamboo/Timber-Light roof": "Bambu/Ahşap-Hafif çatı",
    "Bamboo/Timber-Heavy roof": "Bambu/Ahşap-Ağır çatı",
    "RCC/RB/RBC": "Betonarme çatı",

    // Temel Tipi Çevirileri
    Other: "Diğer",
    "Mud mortar-Stone/Brick": "Çamur harcı-Taş/Tuğla",
    "Cement-Stone/Brick": "Çimento-Taş/Tuğla",
    "Bamboo/Timber": "Bambu/Ahşap",
    RC: "Betonarme",

    // Zemin Yüzey Durumu Çevirileri
    "Moderate slope": "Orta eğim",
    Flat: "Düz",
    "Steep slope": "Dik eğim",

    // Zemin Kat Tipi Çevirileri
    Mud: "Kerpiç",
    "Brick/Stone": "Tuğla/Taş",
    Timber: "Ahşap",
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

  // Hasar derecelendirmesi
  const getDamageAssessment = (value) => {
    if (value === undefined || value === null)
      return { level: "Bilinmiyor", color: "gray", emoji: "❓" };
    if (value < 1.0)
      return { level: "Çok Az Hasar", color: "green", emoji: "✅" };
    if (value < 1.5) return { level: "Az Hasar", color: "blue", emoji: "⚠️" };
    if (value < 2.0)
      return { level: "Orta Hasar", color: "orange", emoji: "⚠️" };
    if (value < 2.5) return { level: "Ağır Hasar", color: "red", emoji: "❌" };
    return { level: "Çok Ağır Hasar", color: "darkred", emoji: "💀" };
  };

  const damageInfo = getDamageAssessment(fullBuildingPrediction?.felt_damage);

  return (
    <div className="flex justify-center min-h-[calc(100vh-60px)] px-4 pb-8 bg-gradient-to-b from-[#FED260] to-[#f8f9fa]">
      <div className="max-w-5xl w-full mt-8 space-y-6">
        {/* Başlık */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#2c3e50] bg-white p-4 rounded-xl shadow-lg border-2 border-[#ce636f]">
            Bina Deprem Sonrası Hasar Analizi
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Deprem öncesi ve sonrası bina durum karşılaştırması
          </p>
        </div>

        {/* Hasar Durumu Göstergesi */}
        <div
          className={`bg-white rounded-xl shadow-xl p-6 border-2 border-${damageInfo.color}-500`}
        >
          <div className="flex flex-col items-center text-center">
            <span className="text-5xl mb-2">{damageInfo.emoji}</span>
            <h2
              className="text-3xl font-bold"
              style={{ color: damageInfo.color }}
            >
              {damageInfo.level}
            </h2>
            <div className="mt-2 text-2xl font-semibold">
              Hasar Derecesi:{" "}
              {fullBuildingPrediction?.felt_damage?.toFixed(2) || "-"}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 mt-4">
              <div
                className={`h-4 rounded-full bg-${damageInfo.color}-500`}
                style={{
                  width: `${Math.min(
                    100,
                    (fullBuildingPrediction?.felt_damage || 0) * 40
                  )}%`,
                  backgroundColor: damageInfo.color,
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Bina Bilgileri */}
        <div className="bg-white rounded-xl shadow-xl p-6 border-2 border-[#ce636f]">
          <h2 className="text-2xl font-bold text-[#ce636f] mb-4">
            Bina Genel Bilgileri
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DetailItem
              title="Bina Yaşı"
              value={`${fullBuildingPrediction?.building_age || "-"} yıl`}
              icon="🏛️"
            />
            <DetailItem
              title="Bina Alanı"
              value={`${
                (
                  fullBuildingPrediction?.building_plinth_area * 0.092903
                ).toFixed(2) || "-"
              } m²`}
              icon="🔲"
            />
            <DetailItem
              title="Deprem Büyüklüğü"
              value={fullBuildingPrediction?.earthquake_magnitude || "-"}
              icon="🌍"
            />
            <DetailItem
              title="Temel Tipi"
              value={
                translations[fullBuildingPrediction?.foundation_type] ||
                fullBuildingPrediction?.foundation_type ||
                "-"
              }
              icon="🏗️"
            />
            <DetailItem
              title="Çatı Tipi"
              value={
                translations[fullBuildingPrediction?.roof_type] ||
                fullBuildingPrediction?.roof_type ||
                "-"
              }
              icon="🏠"
            />
            <DetailItem
              title="Zemin Durumu"
              value={
                translations[fullBuildingPrediction?.land_surface_condition] ||
                fullBuildingPrediction?.land_surface_condition ||
                "-"
              }
              icon="🌱"
            />
            <DetailItem
              title="Zemin Kat Tipi"
              value={
                translations[fullBuildingPrediction?.ground_floor_type] ||
                fullBuildingPrediction?.ground_floor_type ||
                "-"
              }
              icon="🛠️"
            />
            <DetailItem
              title="Analiz Tarihi"
              value={formatDate(fullBuildingPrediction?.date_added)}
              icon="📅"
            />
          </div>
        </div>

        {/* Deprem Öncesi/Sonrası Karşılaştırma */}
        <div className="bg-white rounded-xl shadow-xl p-6 border-2 border-[#ce636f]">
          <h2 className="text-2xl font-bold text-[#ce636f] mb-4">
            Deprem Etkisi Karşılaştırması
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Deprem Öncesi */}
            <div className="border-r-0 md:border-r-2 border-gray-200 pr-0 md:pr-6">
              <h3 className="text-xl font-semibold text-green-600 mb-4 flex items-center">
                <span className="mr-2">🌄</span> Deprem Öncesi
              </h3>
              <DetailItem
                title="Kat Sayısı"
                value={
                  fullBuildingPrediction?.building_floor_count_pre_eq || "-"
                }
                icon="🏢"
              />
              <DetailItem
                title="Bina Yüksekliği"
                value={`${
                  (
                    fullBuildingPrediction?.building_height_pre_eq * 0.3048
                  ).toFixed(2) || "-"
                } m`}
                icon="📏"
              />
            </div>

            {/* Deprem Sonrası */}
            <div className="pl-0 md:pl-6">
              <h3 className="text-xl font-semibold text-red-600 mb-4 flex items-center">
                <span className="mr-2">🌋</span> Deprem Sonrası
              </h3>
              <DetailItem
                title="Kat Sayısı"
                value={
                  fullBuildingPrediction?.building_floor_count_post_eq || "-"
                }
                icon="🏢"
                highlightChanges={
                  fullBuildingPrediction?.building_floor_count_pre_eq !==
                  fullBuildingPrediction?.building_floor_count_post_eq
                }
              />
              <DetailItem
                title="Bina Yüksekliği"
                value={`${(
                  fullBuildingPrediction?.building_height_post_eq * 0.3048
                ).toFixed(2)} m`}
                icon="📏"
                highlightChanges={
                  fullBuildingPrediction?.building_height_pre_eq !==
                  fullBuildingPrediction?.building_height_post_eq
                }
              />
            </div>
          </div>
        </div>

        {/* Teknik Değerlendirme */}
        <div className="bg-white rounded-xl shadow-xl p-6 border-2 border-[#ce636f]">
          <h2 className="text-2xl font-bold text-[#ce636f] mb-4">
            Teknik Değerlendirme
          </h2>
          <div className="space-y-4">
            <p className="text-lg">
              <span className="font-semibold">Bina Dayanıklılık Analizi:</span>{" "}
              {getBuildingResilienceAnalysis(fullBuildingPrediction)}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Öneriler:</span>{" "}
              {getRecommendations(fullBuildingPrediction)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Yardımcı bileşen - Değişiklikleri vurgulamak için
const DetailItem = ({ title, value, icon, highlightChanges = false }) => (
  <div
    className={`flex items-start ${
      highlightChanges ? "bg-yellow-50 p-2 rounded-lg" : ""
    }`}
  >
    <span className="text-2xl mr-3">{icon}</span>
    <div>
      <h4 className="text-lg font-semibold text-[#ce636f]">{title}</h4>
      <p
        className={`text-xl font-medium ${
          highlightChanges ? "text-red-600 font-bold" : "text-gray-800"
        }`}
      >
        {value}
        {highlightChanges && (
          <span className="ml-2 text-sm text-red-500">(Değişiklik)</span>
        )}
      </p>
    </div>
  </div>
);

// Bina dayanıklılık analizi fonksiyonu
const getBuildingResilienceAnalysis = (data) => {
  if (!data) return "Veri yükleniyor...";

  let analysis = [];

  // Temel tipi analizi
  if (data.foundation_type === "Cement-Stone/Brick") {
    analysis.push("Çimento harçlı temel nispeten dayanıklı");
  } else {
    analysis.push("Temel tipi deprem için yeterince dayanıklı değil");
  }

  // Çatı tipi analizi
  if (data.roof_type === "Bamboo/Timber-Heavy roof") {
    analysis.push("Ağır çatı yapısı risk oluşturuyor");
  }

  // Zemin eğimi analizi
  if (data.land_surface_condition === "Steep slope") {
    analysis.push("Dik eğimli zemin depremde risk faktörü");
  }

  // Hasar derecesine göre ek analiz
  if (data.felt_damage >= 2.0) {
    analysis.push("Bina ağır hasar almış, acil müdahale gerekli");
  } else if (data.felt_damage >= 1.5) {
    analysis.push("Orta seviyede hasar tespit edildi");
  } else {
    analysis.push("Bina depremde nispeten az hasar almış");
  }

  return analysis.join(". ") + ".";
};

// Öneriler fonksiyonu
const getRecommendations = (data) => {
  if (!data) return "";

  let recommendations = [];

  if (data.felt_damage >= 2.0) {
    recommendations.push(
      "Binanın acilen tahliye edilmesi ve profesyonel bir değerlendirme yapılması gerekmektedir"
    );
  } else if (data.felt_damage >= 1.5) {
    recommendations.push(
      "Binanın detaylı teknik incelemesinin yapılması önerilir"
    );
  }

  if (data.roof_type === "Bamboo/Timber-Heavy roof") {
    recommendations.push(
      "Çatının hafif malzemelerle yenilenmesi deprem performansını artıracaktır"
    );
  }

  if (data.land_surface_condition === "Steep slope") {
    recommendations.push("Zemin stabilizasyon çalışmaları yapılmalıdır");
  }

  if (recommendations.length === 0) {
    return "Bina deprem performansı kabul edilebilir seviyede. Düzenli kontroller önerilir.";
  }

  return recommendations.join(". ") + ".";
};

export default FullBuildingPredictionDetail;
