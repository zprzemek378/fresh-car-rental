import { useState, useEffect } from "react";
import SortElement from "./SortElement";
import SingleVehicle from "./SingleVehicle";

interface VehicleTypeProps {
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

const VehicleType: React.FC<VehicleTypeProps> = ({
  vehicles,
  places,
  fetchedData,
}) => {
  const [collapse, setCollapse] = useState(false);
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

  const [sortedVehicles, setSortedVehicles] = useState<
    VehicleTypeProps["vehicles"]
  >([]);

  useEffect(() => {
    setSortedVehicles(vehicles);
  }, [fetchedData]);

  return (
    <div>
      <h2 className="text-lg font-semibold">Trucks</h2>
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

export default VehicleType;
