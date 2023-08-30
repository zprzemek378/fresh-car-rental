import { useEffect, useState } from "react";
import SingleVehicle from "./SingleVehicle";

import "./vehicles-style.css";

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

  fetchedData: boolean;
}

const Vehicles: React.FC<VehiclesProps> = ({
  vehicles,
  places,
  fetchedData,
}) => {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Our vehicles</h1>

      <div className="vehiclesContainer">
        {vehicles.map((truck, key) => (
          <SingleVehicle
            truck={truck}
            availability={places.filter((place) =>
              truck.available.includes(place.id)
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default Vehicles;
