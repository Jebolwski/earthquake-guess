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
  return <div>PredictionDetail for building ID: {id}</div>;
};

export default PredictionDetail;
