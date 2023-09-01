import { useState } from "react";

import "./vehicles-style.css";
import VehicleType from "./VehicleType";
import TrailerType from "./TrailerType";

interface VehiclesProps {
  vehicles: {
    id: number;
    brand: string;
    model: string;
    horsepower: number;
    color: string;
    available: number[];
    tank: number;
    price: number;
  }[];

  places: {
    id: number;
    city: string;
    address: string;
    phonenumber: number;
    latlng: [number, number];
  }[];

  trailers: {
    id: number;
    name: string;
    cargo: string;
    length: number[];
    available: number[][];
    price: number[];
  }[];

  fetchedData: boolean;
}

const Vehicles: React.FC<VehiclesProps> = ({
  vehicles,
  places,
  fetchedData,
  trailers,
}) => {
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
          <VehicleType
            fetchedData={fetchedData}
            vehicles={vehicles}
            places={places}
          />
        </div>
      ) : (
        <div>
          <TrailerType
            fetchedData={fetchedData}
            places={places}
            trailers={trailers}
          />
        </div>
      )}
    </div>
  );
};

export default Vehicles;
