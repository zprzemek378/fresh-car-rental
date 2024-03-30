import { useState } from "react";
import { FaTrailer, FaTruck } from "react-icons/fa6";
import { Link } from "react-router-dom";

const ChoooseType = () => {
  const [backlight, setBacklight] = useState<number>(0);
  return (
    <Link to={"/rent"} className="h-full flex bg-blue-500 mt-5">
      <div
        onPointerEnter={() => setBacklight(1)}
        onPointerLeave={() => setBacklight(0)}
        className={` bg-red-300 chooseOrderType ${
          backlight === 1 ? "onBacklight" : "offBacklight"
        }`}
      >
        <div className="flex items-center justify-center">
          <FaTruck className="truckReversed mr-2" />
          Truck
          <FaTruck className="ml-2" />
        </div>

        <img
          src={`/fresh-car-rental/data/other-imgs/trailer1.jpeg`}
          alt="trailer1"
          className="trailerChooserPhoto"
        ></img>
      </div>
      <div
        onPointerEnter={() => setBacklight(2)}
        onPointerLeave={() => setBacklight(0)}
        className={`bg-red-400 chooseOrderType ${
          backlight === 2 ? "onBacklight" : "offBacklight"
        }`}
      >
        <div className="flex items-center justify-center">
          <FaTruck className="truckReversed" />
          <FaTrailer className="truckReversed mr-2" />
          Truck & Trailer
          <FaTrailer className="ml-2" />
          <FaTruck />
        </div>

        <img
          src={`/fresh-car-rental/data/other-imgs/trailer3.jpeg`}
          alt="trailer1"
          className="trailerChooserPhoto"
        ></img>
      </div>
      <div
        onPointerEnter={() => setBacklight(3)}
        onPointerLeave={() => setBacklight(0)}
        className={`bg-red-500 chooseOrderType ${
          backlight === 3 ? "onBacklight" : "offBacklight"
        }`}
      >
        <div className="flex items-center justify-center">
          <FaTrailer className="truckReversed mr-2" />
          Trailer
          <FaTrailer className="ml-2" />
        </div>

        <img
          src={`/fresh-car-rental/data/other-imgs/trailer2.jpeg`}
          alt="trailer1"
          className="trailerChooserPhoto"
        ></img>
      </div>
    </Link>
  );
};

export default ChoooseType;
