import "./rent-style.css";

import { GrSearch } from "react-icons/gr";
import { IconContext } from "react-icons";

interface RentProps {
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

  trailers: {
    id: number;
    name: string;
    cargo: string;
    length: number[];
    available: number[][];
    price: number[];
  }[];

  fetchedData: boolean;
}

const Rent: React.FC<RentProps> = ({
  vehicles,
  places,
  fetchedData,
  trailers,
}) => {
  const date = new Date();
  const usableDate = {
    year: String(date.getFullYear()),
    month:
      date.getMonth() + 1 < 10
        ? "0" + String(date.getMonth() + 1)
        : String(date.getMonth() + 1),
    day:
      date.getDate() < 10
        ? "0" + String(date.getDate())
        : String(date.getDate()),
    hours:
      date.getHours() < 10
        ? "0" + String(date.getHours())
        : String(date.getHours()),
    minutes:
      date.getMinutes() < 10
        ? "0" + String(date.getMinutes())
        : String(date.getMinutes()),
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold">Rent a vehicle</h1>
      <form>
        <div className="formFirstContainer">
          <div className="tripleContainer">
            <div className="formElement">
              <label>Pick-up location</label>
              <br />
              <select className="selectElement">
                <option selected disabled>
                  From where?
                </option>
                {places.map((place, key) => (
                  <option>{place.city}</option>
                ))}
              </select>
            </div>
            <div className="formElement">
              <label>Pick-up date</label>
              <br />
              <input
                className="selectElement"
                type="date"
                value={`${usableDate.year}-${usableDate.month}-${usableDate.day}`}
              />
            </div>
            <div className="formElement">
              <label>Pick-up time</label>
              <br />
              <input
                className="selectElement"
                type="time"
                value={`${usableDate.hours}:${usableDate.minutes}`}
              />
            </div>
          </div>
          <div className="tripleContainer">
            <div className="formElement">
              <label>Drop-off location</label>
              <br />
              <select className="selectElement">
                <option selected disabled>
                  To where?
                </option>
                {places.map((place, key) => (
                  <option>{place.city}</option>
                ))}
              </select>
            </div>
            <div className="formElement">
              <label>Drop-off date</label>
              <br />
              <input
                className="selectElement"
                type="date"
                value={`${usableDate.year}-${usableDate.month}-${usableDate.day}`}
              />
            </div>
            <div className="formElement">
              <label>Drop-off time</label>
              <br />
              <input
                className="selectElement"
                type="time"
                value={`${usableDate.hours}:${usableDate.minutes}`}
              />
            </div>
          </div>
        </div>
        <div>
          <div>
            <div className="flex justify-end mt-1">
              <div className="mt-auto mb-auto ml-3 mr-3">
                <input
                  type="radio"
                  id="radio1"
                  name="rentType"
                  className="inputRadio"
                />
                <label htmlFor="radio1" className="labelRadio">
                  Truck & Trailer
                </label>
              </div>
              <div className="mt-auto mb-auto ml-3 mr-3">
                <input
                  type="radio"
                  id="radio2"
                  name="rentType"
                  className="inputRadio"
                />
                <label htmlFor="radio2" className="labelRadio">
                  Only Truck
                </label>
              </div>
              <div className="mt-auto mb-auto ml-3 mr-3">
                <input
                  type="radio"
                  id="radio3"
                  name="rentType"
                  className="inputRadio"
                />
                <label htmlFor="radio3" className="labelRadio">
                  Only Trailer
                </label>
              </div>
              <div>
                <button className="flex bg-red-400 pl-4 pr-4 pt-3 pb-3 ml-5 rounded text-white text-lg">
                  <span>Search</span>
                  <span className="mt-1 ml-1">
                    <GrSearch />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>

      <div className="secondFormContainer"></div>
    </div>
  );
};

export default Rent;
