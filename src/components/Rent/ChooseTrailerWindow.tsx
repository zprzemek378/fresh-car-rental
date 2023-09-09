import { IoMdReturnLeft, IoMdReturnRight } from "react-icons/io";
import { RentProps } from "./Rent";
import { useState } from "react";

interface ChooseTrailerWindowProps {
  vehicle: [RentProps["trailers"][0], boolean, boolean | null];
  ifProceed: (value: boolean, numbers: number[]) => void;
}

const ChooseTrailerWindow: React.FC<ChooseTrailerWindowProps> = ({
  vehicle,
  ifProceed,
}) => {
  const [highlight, setHighlight] = useState<Boolean[]>(
    vehicle[1] == true && vehicle[2] != true
      ? [true, false]
      : vehicle[1] != true && vehicle[2] == true
      ? [false, true]
      : [false, false]
  );

  const setLength = (type: number) => {
    const newHighlight = [false, false];
    newHighlight[type] = true;
    setHighlight([...newHighlight]);
  };

  return (
    <div className="chooseWindow justify-between flex flex-col">
      <div className="text-center">
        <h2 className="font-bold text-2xl">
          {vehicle[0].name}

          <span className="font-normal text-lg ml-2">{vehicle[0].cargo}</span>
        </h2>
      </div>
      <div className="flex justify-between mr-5 middleDiv">
        <img
          className="truckImageChoose"
          src={`/fresh-car-rental/data/img/${vehicle[0].id}t.png`}
        />
        <div className="self-center w-1/2 text-lg">
          <div className="flex mt-1 mb-1">
            <span className="font-bold mr-auto"> Length: </span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <div>
              <div
                className={`text-right ${
                  vehicle[1] == false && "trailer-unavailable"
                }`}
              >
                {vehicle[0].length[0]}
                {"m - "}
                <span className="text-red-600 font-semibold">
                  ${vehicle[0].price[0]}
                </span>
              </div>
              {vehicle[2] != null && (
                <div
                  className={`text-right ${
                    vehicle[2] == false && "trailer-unavailable"
                  }`}
                >
                  {vehicle[0].length[1]}
                  {"m - "}
                  <span className="text-red-600 font-semibold">
                    ${vehicle[0].price[1]}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="flex mt-10 mb-1 text-xl">
            {vehicle[1] == true && (
              <div
                className={`sortElement flex cursor-pointer
                ${highlight[0] && "sortElement-highlight"}
                `}
                onClick={() => setLength(0)}
              >
                {vehicle[0].length[0]}
                {"m"}
              </div>
            )}
            {vehicle[2] == true && (
              <div
                className={`sortElement flex cursor-pointer ${
                  highlight[1] && "sortElement-highlight"
                }`}
                onClick={() => setLength(1)}
              >
                {vehicle[0].length[1]}
                {"m"}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex">
        <button
          className="chooseButton ml-1 mb-1 mt-auto bg-gray-500 flex justify-evenly items-center"
          onClick={() => ifProceed(false, [0, 0])}
        >
          <IoMdReturnLeft size={30} />
          Return
        </button>
        <button
          className="chooseButton ml-auto mr-1 mb-1 mt-auto bg-red-500 flex justify-evenly items-center"
          onClick={() =>
            !highlight[0] && !highlight[1]
              ? alert("Wybierz rodzaj naczepy")
              : ifProceed(true, [vehicle[0].id, highlight[0] ? 0 : 1])
          }
        >
          Proceed
          <IoMdReturnRight size={30} />
        </button>
      </div>
    </div>
  );
};

export default ChooseTrailerWindow;
