import { useState } from "react";
import { BsFillInfoCircleFill } from "react-icons/bs";

interface ShowAvailabilityProps {
  availability: {
    id: number;
    city: string;
    address: string;
    phonenumber: number;
    latlng: [number, number];
  }[];
}

const ShowAvailability: React.FC<ShowAvailabilityProps> = ({
  availability,
}) => {
  const [showInfo, setShowInfo] = useState(false);
  const onPointerEnter = () => {
    setShowInfo(true);
  };
  const onPointerLeave = () => {
    setShowInfo(false);
  };

  return (
    <div>
      <BsFillInfoCircleFill
        className="mt-1 cursor-pointer"
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
      />
      {showInfo && (
        <div className="showAvailabilityInfo text-left text-sm font-bold">
          This vehicle is currently available in:
          {availability.map((place) => (
            <li className=" font-normal">{place.city}</li>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowAvailability;
