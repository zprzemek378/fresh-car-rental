import { useState, useEffect } from "react";
import SortElement from "./SortElement";
import SingleTrailer from "./SingleTrailer";
import axios from "../../api/axios";

interface ITrailers
  extends Array<{
    id: number;
    name: string;
    cargo: string;
    length: number[];
    available: number[][];
    price: number[];
    img: string;
  }> {}

interface IPlaces
  extends Array<{
    id: number;
    city: string;
    address: string;
    phonenumber: number;
    latlng: [number, number];
  }> {}

const TrailerType = () => {
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
          return a.price[0] - b.price[0];
        case 5:
          return b.price[b.price.length - 1] - a.price[a.price.length - 1];
        default:
          return 1;
      }
    });

    setSortedVehicles([...newSortedVehicles]);
  };

  const [sortedVehicles, setSortedVehicles] = useState<ITrailers>([]);
  const [places, setPlaces] = useState<IPlaces>([]);

  const fetchTrailers = async () => {
    try {
      const response = await axios.get("/trailers");
      const data = response.data;
      setSortedVehicles(data);
    } catch (error: any) {
      throw new Error(`HTTP error! Status: ${error.response.status}`);
    }
  };

  const fetchPlaces = async () => {
    try {
      const response = await axios.get("/places");
      const data = response.data;
      setPlaces(data);
    } catch (error: any) {
      throw new Error(`HTTP error! Status: ${error.response.status}`);
    }
  };

  useEffect(() => {
    fetchTrailers();
    fetchPlaces();
  }, []);

  return (
    <div>
      <h2 className="text-lg font-semibold">Trailers</h2>
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
        {sortedVehicles.map((trailer, key) => (
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
          />
        ))}
      </div>
    </div>
  );
};

export default TrailerType;
