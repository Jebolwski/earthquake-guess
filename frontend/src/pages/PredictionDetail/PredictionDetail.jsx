import { useContext, useEffect } from "react";
import AuthContext from "../../context/context";
import { useParams, useNavigate } from "react-router-dom";

const PredictionDetail = () => {
  const { id } = useParams(); // URL'deki id parametresi
  const { prediction, getAPrediction } = useContext(AuthContext);

  useEffect(() => {
    if (id) {
      getAPrediction(id); // id'yi kullanarak veri çek
    }
  }, [id]);

  console.log(prediction);

  return (
    <div className="flex justify-center items-center min-h-screen lg:px-12 px-4 bg-cover bg-[#FED260]">
      <img
        src="/src/assets/login.svg"
        alt="login"
        className="w-full lg:scale-[1.0] md:scale-[1.5] sm:scale-[1.75] scale-[2.0] lg:bottom-0 md:bottom-16 sm:bottom-24 bottom-12 absolute bottom-0 left-0 select-none"
      />
      <div className="border-2 border-black bg-white rounded-xl p-3 z-20">
        <p>age : {prediction?.building_age}</p>
        <p>floor_count : {prediction?.building_floor_count}</p>
        <p>building_height : {prediction?.building_height}</p>
        <p>building_plinth_area : {prediction?.building_plinth_area}</p>
      </div>
    </div>
  );
};

export default PredictionDetail;
