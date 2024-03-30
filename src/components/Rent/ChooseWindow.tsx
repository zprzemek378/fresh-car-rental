import { IoMdReturnLeft, IoMdReturnRight } from "react-icons/io";
import { OrderParameters } from "./Rent";

interface ChooseWindowProps {
  vehicle: OrderParameters["vehicles"][0];
  ifProceed: (value: boolean, numbers: number[]) => void;
}

const ChooseWindow: React.FC<ChooseWindowProps> = ({ vehicle, ifProceed }) => {
  return (
    <div className="chooseWindow justify-between flex flex-col">
      <div className="text-center">
        <h2 className="font-bold text-2xl">
          {vehicle.brand}

          <span className="font-normal text-lg ml-2">{vehicle.model}</span>
        </h2>
      </div>
      <div className="flex justify-between mr-5 middleDiv">
        <img
          className="truckImageChoose"
          src={`/fresh-car-rental/data/img/${vehicle.id}.png`}
        />
        <div className="self-center w-1/2 text-lg">
          <div className="flex mt-1 mb-1">
            <span className="font-bold mr-auto"> HP: </span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span>{vehicle.horsepower}</span>
          </div>
          <div className="flex mt-1 mb-1">
            <span className="font-bold mr-auto"> Color: </span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span>{vehicle.color}</span>
          </div>
          <div className="flex mt-1 mb-1">
            <span className="font-bold mr-auto"> Tank capacity: </span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span>{vehicle.tank}</span>
          </div>
          <div className="flex mt-10 mb-1 text-xl">
            <span className="font-bold mr-auto text-red-800"> Price: </span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span className="text-red-800 font-extrabold">
              {vehicle.price}/day
            </span>
          </div>
        </div>
      </div>
      <div className="flex">
        <button
          className="chooseButton ml-1 mb-1 mt-auto bg-gray-500 flex justify-evenly items-center"
          onClick={() => ifProceed(false, [0, -1])}
        >
          <IoMdReturnLeft size={30} />
          Return
        </button>
        <button
          className="chooseButton ml-auto mr-1 mb-1 mt-auto bg-red-500 flex justify-evenly items-center"
          onClick={() => ifProceed(true, [vehicle.id, -1])}
        >
          Proceed
          <IoMdReturnRight size={30} />
        </button>
      </div>
    </div>
  );
};

export default ChooseWindow;
