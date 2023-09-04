import {
  Routes,
  Route,
  BrowserRouter as Router,
  HashRouter,
} from "react-router-dom";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Rent from "./components/Rent/Rent";
import Vehicles from "./components/Vehicles/Vehicles";
import Locations from "./components/Locations/Locations";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import { useState, useEffect } from "react";

function App() {
  //Fetching data
  interface IPlace {
    id: number;
    city: string;
    address: string;
    phonenumber: number;
    latlng: [number, number];
  }
  interface IPlaces extends Array<IPlace> {}

  interface IVehicle {
    id: number;
    brand: string;
    model: string;
    horsepower: number;
    color: string;
    available: number[];
    tank: number;
    price: number;
  }
  interface IVehicles extends Array<IVehicle> {}

  interface ITrailer {
    id: number;
    name: string;
    cargo: string;
    length: number[];
    available: number[][];
    price: number[];
  }
  interface ITrailers extends Array<ITrailer> {}

  const [places, setPlaces] = useState<IPlaces>([]);
  const [vehicles, setVehicles] = useState<IVehicles>([]);
  const [trailers, setTrailers] = useState<ITrailers>([]);

  const fetchedPlacesData = (data: IPlaces) => {
    setPlaces(data);
  };
  const fetchedTrucksData = (data: IVehicles) => {
    setVehicles(data);
  };
  const fetchedTrailersData = (data: ITrailers) => {
    setTrailers(data);
  };

  const [fetchedData, setFetchedData] = useState(false);

  useEffect(() => {
    fetch("/fresh-car-rental/data/db.json")
      .then((res) => res.json())
      .then((data) => {
        fetchedPlacesData(data.places);
        fetchedTrucksData(data.trucks);
        fetchedTrailersData(data.trailers);
        setFetchedData(true);
      });
  }, []);

  interface ICenter extends Array<number> {
    0: number;
    1: number;
  }

  //Resizing
  const [currWidth, setCurrWidth] = useState(1);

  window.addEventListener("resize", () => {
    setCurrWidth(window.innerWidth);
  });

  useEffect(() => setCurrWidth(window.innerWidth), []);

  return (
    // <HashRouter>
    <div className="App App-main">
      <Navbar />
      <div
        className="main-container"
        style={{
          zoom:
            currWidth < 640
              ? `${(currWidth * 100) / 640}%`
              : currWidth > 1230
              ? `${(currWidth * 100) / 1230}%`
              : "100%",
        }}
      >
        <div className="mt-5 mb-5 ml-10 mr-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/rent"
              element={
                <Rent
                  vehicles={vehicles}
                  fetchedData={fetchedData}
                  places={places}
                  trailers={trailers}
                />
              }
            />
            <Route
              path="/vehicles"
              element={
                <Vehicles
                  vehicles={vehicles}
                  fetchedData={fetchedData}
                  places={places}
                  trailers={trailers}
                />
              }
            />
            <Route
              path="/locations"
              element={<Locations places={places} fetchedData={fetchedData} />}
            />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
    // </HashRouter>
  );
}

export default App;
