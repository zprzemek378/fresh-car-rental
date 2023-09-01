import { useEffect, useRef, useState } from "react";
import "./vehicles-style.css";
import { MdExpandMore } from "react-icons/md";
import ShowAvailability from "./ShowAvailability";

interface SingleVehicleProps {
  truck: {
    id: number;
    brand: string;
    model: string;
    horsepower: number;
    color: string;
    available: number[];
    tank: number;
    price: number;
  };

  availability: {
    id: number;
    city: string;
    address: string;
    phonenumber: number;
    latlng: [number, number];
  }[];

  collapse: boolean;
}

const SingleVehicle: React.FC<SingleVehicleProps> = ({
  truck,
  availability,
  collapse,
}) => {
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => setShowDetails(false), [collapse]);

  return (
    <div
      className={`truckComponent ${showDetails && "truckComponent-details"}`}
    >
      <img
        className="truckImage"
        src={`/fresh-car-rental/data/img/${truck.id}.png`}
      />
      <div className="primaryInfo">
        <div>
          <h2 className=" font-bold text-lg">{truck.brand}</h2>
          <p className=" text-sm">{truck.model}</p>
        </div>
        {showDetails && (
          <div>
            <div className="flex">
              <span className="font-bold mr-auto"> HP: </span>
              &nbsp;&nbsp;
              <span>{truck.horsepower}</span>
            </div>

            <div className="flex">
              <span className="font-bold mr-auto"> Color: </span>
              &nbsp;&nbsp;
              <span>{truck.color}</span>
            </div>

            <div className="flex">
              <span className="font-bold mr-auto"> Tank capacity: </span>
              &nbsp;&nbsp;
              <span>{truck.tank}</span>
            </div>

            <div className="flex">
              <span className="font-bold mr-auto"> Available in: </span>
              &nbsp;&nbsp;
              <span>
                <ShowAvailability availability={availability} type={"truck"} />
              </span>
            </div>
          </div>
        )}
        <div className="flex ml-auto">
          <p className=" text-red-500">
            <span className=" font-bold">${truck.price}</span>/day
          </p>
          <span className="ml-3 text-lg scale-150 mt-1">
            <MdExpandMore
              className={`cursor-pointer expandMore ${
                showDetails && "expandMore-details"
              }`}
              onClick={() => setShowDetails(!showDetails)}
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default SingleVehicle;
