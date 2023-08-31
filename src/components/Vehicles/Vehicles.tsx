import { useEffect, useState } from "react";
import SingleVehicle from "./SingleVehicle";

import "./vehicles-style.css";
import SortElement from "./SortElement";

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
  const [sortedVehicles, setSortedVehicles] = useState<
    VehiclesProps["vehicles"]
  >([]);

  useEffect(() => {
    setSortedVehicles(vehicles);
  }, [fetchedData]);

  const [highlight, setHighlight] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const changeSort = (type: number) => {
    setCollapse(!collapse);
    const newHighlight = [false, false, false, false, false, false];
    newHighlight[type] = true;
    setHighlight([...newHighlight]);
    const newSortedVehicles = [...sortedVehicles];
    newSortedVehicles.sort((a, b) => {
      switch (type) {
        case 0:
          return a.brand.localeCompare(b.brand);
        case 1:
          return b.brand.localeCompare(a.brand);
        case 2:
          return a.horsepower - b.horsepower;
        case 3:
          return b.horsepower - a.horsepower;
        case 4:
          return a.price - b.price;
        case 5:
          return b.price - a.price;
        default:
          return 1;
      }
    });

    setSortedVehicles([...newSortedVehicles]);
  };

  const [collapse, setCollapse] = useState(false);

  return (
    <div>
      <h1 className="text-2xl font-semibold">Our vehicles</h1>

      <div className="sortContainer">
        <SortElement
          type={0}
          increasing={true}
          text="Name"
          changeSort={changeSort}
          highlight={highlight}
        />
        <SortElement
          type={1}
          increasing={false}
          text="Name"
          changeSort={changeSort}
          highlight={highlight}
        />
        <SortElement
          type={2}
          increasing={true}
          text="Horsepower"
          changeSort={changeSort}
          highlight={highlight}
        />
        <SortElement
          type={3}
          increasing={false}
          text="Horsepower"
          changeSort={changeSort}
          highlight={highlight}
        />
        <SortElement
          type={4}
          increasing={true}
          text="Price"
          changeSort={changeSort}
          highlight={highlight}
        />
        <SortElement
          type={5}
          increasing={false}
          text="Price"
          changeSort={changeSort}
          highlight={highlight}
        />
      </div>
      <div className="vehiclesContainer">
        {sortedVehicles.map((truck, key) => (
          <SingleVehicle
            truck={truck}
            availability={places.filter((place) =>
              truck.available.includes(place.id)
            )}
            collapse={collapse}
          />
        ))}
      </div>
    </div>
  );
};

export default Vehicles;
