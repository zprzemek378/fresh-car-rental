import { useEffect, useState } from "react";
import "./locations-style.css";

import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MarkerComp from "./MarkerComp";
import ChangeLocation from "./ChangeLocation";

const Locations = () => {
  // Fetching locations data
  interface IPlace {
    id: number;
    city: string;
    address: string;
    phonenumber: number;
    latlng: [number, number];
  }
  interface IPlaces extends Array<IPlace> {}

  const [places, setPlaces] = useState<IPlaces>([]);

  const fetchedData = (data: IPlaces) => {
    setPlaces(data);
    setLatlngCenter([data[0].latlng[0], data[0].latlng[1]]);
  };

  useEffect(() => {
    fetch("/fresh-car-rental/data/db.json").then((res) => console.log(res));
    // .then((data) => fetchedData(data.places));
  }, []);

  interface ICenter extends Array<number> {
    0: number;
    1: number;
  }

  // Change place dynamically

  const [latlngCenter, setLatlngCenter] = useState<ICenter>([
    52.21046118337764, 21.0274783543051,
  ]);

  return (
    <div>
      <h1 className="text-2xl font-semibold">Our garages</h1>
      {/* Table with cities */}
      <div className="table-and-map">
        <table className="text-center">
          {places.length === 0 ? (
            <p>Loading...</p>
          ) : (
            <div>
              <th>City</th>
              <th>Street</th>
              <th>Phone number</th>
              {places.map((place, key) => (
                <tr className={`tr${key % 2}`}>
                  <td
                    onClick={() =>
                      setLatlngCenter([place.latlng[0], place.latlng[1]])
                    }
                  >
                    {place.city}
                  </td>
                  <td
                    onClick={() =>
                      setLatlngCenter([place.latlng[0], place.latlng[1]])
                    }
                  >
                    {place.address}
                  </td>
                  <td
                    onClick={() =>
                      setLatlngCenter([place.latlng[0], place.latlng[1]])
                    }
                  >
                    {place.phonenumber}
                  </td>
                </tr>
              ))}
            </div>
          )}
        </table>

        {/* Map with markers */}
        <div className="map-container">
          <MapContainer
            center={[52.21046118337764, 21.0274783543051]}
            zoom={12}
            scrollWheelZoom={true}
          >
            <ChangeLocation latlngCenter={latlngCenter as [number, number]} />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* MARKERS */}
            {places.map((place) => (
              <MarkerComp
                latlng={place.latlng}
                popup1={place.address}
                popup2={place.city}
                popup3={place.phonenumber}
              />
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default Locations;
