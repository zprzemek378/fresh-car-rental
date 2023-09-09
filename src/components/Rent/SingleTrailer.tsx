import { useEffect, useRef, useState } from "react";
import "./rent-vehicles-style.css";
import "../Vehicles/vehicles-style.css";
import { MdExpandMore } from "react-icons/md";

import { RentProps } from "./Rent";

interface SingleVehicleProps {
  trailer: {
    id: number;
    name: string;
    cargo: string;
    length: number[];
    available: number[][];
    price: number[];
  };

  availability0: {
    id: number;
    city: string;
    address: string;
    phonenumber: number;
    latlng: [number, number];
  }[];

  availability1:
    | {
        id: number;
        city: string;
        address: string;
        phonenumber: number;
        latlng: [number, number];
      }[]
    | false;

  collapse: boolean;

  pickupLocation: number;

  setShowProceedWindow: (
    value: [RentProps["trailers"][0], boolean, boolean | null] | null
  ) => void;
}

const SingleTrailer: React.FC<SingleVehicleProps> = ({
  trailer,
  availability0,
  availability1,
  collapse,
  pickupLocation,
  setShowProceedWindow,
}) => {
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => setShowDetails(false), [collapse]);

  const [pointingOnComponent, setPointingOnComponent] =
    useState<boolean>(false);

  return (
    <div
      className={`truckComponent
    ${showDetails && "truckComponent-details"}
    ${pointingOnComponent && "truckComponent-onpoint"}
    `}
      onPointerLeave={() => setPointingOnComponent(false)}
      onPointerOver={() => setPointingOnComponent(true)}
    >
      <div className="selectMainContainer">
        <div
          className={`selectContainer ${
            showDetails && "selectContainer-details"
          }`}
        >
          <button
            className={`selectButton ${showDetails && "selectButton-details"}`}
            onClick={() =>
              setShowProceedWindow([
                trailer,
                trailer.available[0].includes(pickupLocation),
                trailer.length.length > 1
                  ? trailer.available[1].includes(pickupLocation)
                  : null,
              ])
            }
          >
            SELECT
          </button>
        </div>
      </div>
      <img
        className="truckImage"
        src={`/fresh-car-rental/data/img/${trailer.id}t.png`}
      />
      <div className="primaryInfo">
        <div>
          <h2 className=" font-bold text-lg">{trailer.name}</h2>
          <p className=" text-sm">{trailer.cargo}</p>
        </div>
        {showDetails && (
          <div>
            <div className="flex">
              <span className="font-bold mr-auto"> Length: </span>
              &nbsp;&nbsp;
              <span>
                <span
                  className={`${
                    !trailer.available[0].includes(pickupLocation) &&
                    "trailer-unavailable"
                  }`}
                >
                  {trailer.length[0]}
                  {"m - "}
                  <span className="text-red-500 font-semibold">
                    ${trailer.price[0]}
                  </span>
                </span>
                {trailer.length.length > 1 && (
                  <div
                    className={`${
                      !trailer.available[1].includes(pickupLocation) &&
                      "trailer-unavailable"
                    }`}
                  >
                    {trailer.length[1]}
                    {"m - "}
                    <span className="text-red-500 font-semibold">
                      ${trailer.price[1]}{" "}
                    </span>
                  </div>
                )}
              </span>
            </div>
          </div>
        )}
        <div className="flex ml-auto">
          <p className=" text-red-500">
            <span className=" font-bold">
              <span
                className={`${
                  !trailer.available[0].includes(pickupLocation) &&
                  "trailer-unavailable"
                }`}
              >
                ${trailer.price[0]}
              </span>

              {trailer.price.length > 1 && (
                <span>
                  {" - "}
                  <span
                    className={`${
                      !trailer.available[1].includes(pickupLocation) &&
                      "trailer-unavailable"
                    }`}
                  >
                    ${trailer.price[1]}
                  </span>
                </span>
              )}
            </span>
            /day
          </p>
          <span className="ml-3 text-lg scale-150 mt-1">
            <MdExpandMore
              className={`cursor-pointer expandMore ${
                showDetails && "expandMore-details"
              }`}
              onClick={() => {
                setShowDetails(!showDetails);
              }}
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default SingleTrailer;
