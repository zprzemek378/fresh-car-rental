import { useEffect, useRef, useState } from "react";
import "./vehicles-style.css";
import { MdExpandMore } from "react-icons/md";
import ShowAvailability from "./ShowAvailability";

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
}

const SingleTrailer: React.FC<SingleVehicleProps> = ({
  trailer,
  availability0,
  availability1,
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
                {trailer.length[0]}
                {"m - "}
                <span className="text-red-500 font-semibold">
                  ${trailer.price[0]}
                </span>
                {trailer.length.length > 1 && (
                  <div>
                    {trailer.length[1]}
                    {"m - "}
                    <span className="text-red-500 font-semibold">
                      ${trailer.price[1]}{" "}
                    </span>
                  </div>
                )}
              </span>
            </div>

            <div className="flex">
              <span className="font-bold mr-auto"> Available in: </span>
              &nbsp;&nbsp;
              <div className=" ">
                <span className="flex">
                  {trailer.length[0]}
                  {"m"}
                  <span className="ml-auto pl-1">
                    <ShowAvailability
                      availability={availability0}
                      type={"trailer"}
                    />
                  </span>
                </span>
                {availability1 != false && (
                  <div className="flex">
                    {trailer.length[1]}
                    {"m"}
                    <span className="ml-auto pl-1">
                      <ShowAvailability
                        availability={availability1}
                        type={"trailer"}
                      />
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        <div className="flex ml-auto">
          <p className=" text-red-500">
            <span className=" font-bold">
              ${trailer.price[0]}
              {trailer.price.length > 1 && ` - $${trailer.price[1]}`}
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
