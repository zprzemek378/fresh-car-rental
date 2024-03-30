import { useState } from "react";

import "./vehicles-style.css";
import VehicleType from "./VehicleType";
import TrailerType from "./TrailerType";

interface VehiclesProps {
  setBackgroundImage: (imagePath: string) => void;
}

const Vehicles: React.FC<VehiclesProps> = ({ setBackgroundImage }) => {
  setBackgroundImage("vehicles");
  const [typeOfProduct, setTypeOfProduct] = useState(0);
  const changeTypeOfProduct = (type: number) => {
    const newHighlightType = [false, false];
    newHighlightType[type] = true;
    setHighlightType([...newHighlightType]);
    setTypeOfProduct(type);
  };
  const [highlightType, setHighlightType] = useState([true, false]);

  return (
    <div>
      <h1 className="text-2xl font-semibold">Our vehicles</h1>
      <div className="chooseContainer text-lg">
        <div
          className={`chooseElement ${
            highlightType[0] && "chooseElement-highlight"
          }`}
          onClick={() => changeTypeOfProduct(0)}
        >
          Trucks
        </div>
        <div
          className={`chooseElement ${
            highlightType[1] && "chooseElement-highlight"
          }`}
          onClick={() => changeTypeOfProduct(1)}
        >
          Trailers
        </div>
      </div>

      {typeOfProduct == 0 ? (
        <div>
          <VehicleType />
        </div>
      ) : (
        <div>
          <TrailerType />
        </div>
      )}
    </div>
  );
};

export default Vehicles;
