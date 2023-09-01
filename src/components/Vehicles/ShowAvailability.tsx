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

  type: string;
}

const ShowAvailability: React.FC<ShowAvailabilityProps> = ({
  availability,
  type,
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
          {availability.length > 0 ? (
            <div>
              This {type} is currently available in:
              {availability.map((place) => (
                <li className=" font-normal ml-3">{place.city}</li>
              ))}
            </div>
          ) : (
            <div>This {type} is currently unavailable</div>
          )}
        </div>
      )}
    </div>
  );
};

export default ShowAvailability;
