import { useState, useEffect } from "react";
import SortElement from "./SortElement";
import SingleTrailer from "./SingleTrailer";
import { OrderParameters } from "./Rent";

interface TrailerTypeProps {
  trailers: {
    id: number;
    name: string;
    cargo: string;
    length: number[];
    available: number[][];
    price: number[];
    img: string;
  }[];

  places: {
    id: number;
    city: string;
    address: string;
    phonenumber: number;
    latlng: [number, number];
  }[];

  fetchedData: boolean;

  pickupLocation: number;

  setShowProceedWindow: (
    value: [OrderParameters["trailers"][0], boolean, boolean | null] | null
  ) => void;
}

const TrailerType: React.FC<TrailerTypeProps> = ({
  trailers,
  places,
  fetchedData,
  pickupLocation,
  setShowProceedWindow,
}) => {
  const [collapse, setCollapse] = useState(false);
  const [highlight, setHighlight] = useState([false, false, false, false]);

  const changeSort = (type: number) => {
    setCollapse(!collapse);
    const newHighlight = [false, false, false, false];
    newHighlight[type] = true;
    setHighlight([...newHighlight]);
    const newSortedVehicles = [...sortedVehicles];
    newSortedVehicles.sort((a, b) => {
      switch (type) {
        case 0:
          return a.name.localeCompare(b.name);
        case 1:
          return b.name.localeCompare(a.name);
        case 4:
          console.log(a, b);
          return a.price[0] - b.price[0];
        case 5:
          return b.price[b.price.length - 1] - a.price[a.price.length - 1];
        default:
          return 1;
      }
    });

    setSortedVehicles([...newSortedVehicles]);
  };

  const [sortedVehicles, setSortedVehicles] = useState<
    TrailerTypeProps["trailers"]
  >([]);

  useEffect(() => {
    setSortedVehicles(trailers);
  }, [fetchedData]);

  return (
    <div>
      {places.map(
        (place) =>
          place.id == pickupLocation && (
            <h2 className="text-lg font-semibold">
              Trailers available in {place.city}:
            </h2>
          )
      )}
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
        {sortedVehicles.map(
          (trailer, key) =>
            (trailer.available[0].includes(pickupLocation) ||
              trailer.available[trailer.available.length - 1].includes(
                pickupLocation
              )) && (
              <SingleTrailer
                trailer={trailer}
                availability0={places.filter((place) =>
                  trailer.available[0].includes(place.id)
                )}
                availability1={
                  trailer.available.length > 1
                    ? places.filter((place) =>
                        trailer.available[1].includes(place.id)
                      )
                    : false
                }
                collapse={collapse}
                pickupLocation={pickupLocation}
                setShowProceedWindow={setShowProceedWindow}
              />
            )
        )}
      </div>
    </div>
  );
};

export default TrailerType;
