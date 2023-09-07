import { IoMdReturnLeft, IoMdReturnRight } from "react-icons/io";
import { RentProps } from "./Rent";

interface ChooseWindowProps {
  vehicle: RentProps["vehicles"][0];
}

const ChooseWindow: React.FC<ChooseWindowProps> = ({ vehicle }) => {
  return (
    <div className="chooseWindow">
      {vehicle.brand}
      <button className="chooseButton ml-1 mb-1 mt-auto bg-gray-500 flex justify-evenly items-center">
        <IoMdReturnLeft size={30} />
        Return
      </button>
      <button className="chooseButton ml-auto mr-1 mb-1 mt-auto bg-red-500 flex justify-evenly items-center">
        Proceed
        <IoMdReturnRight size={30} />
      </button>
    </div>
  );
};

export default ChooseWindow;
