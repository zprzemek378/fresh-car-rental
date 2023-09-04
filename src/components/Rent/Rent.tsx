import "./rent-style.css";

import { GrSearch } from "react-icons/gr";
import { IconContext } from "react-icons";
import VehicleType from "./VehicleType";
import { useState } from "react";

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
  // Current Date&Time
  const currentDate = new Date();
  interface IusableDate {
    year: string;
    month: string;
    day: string;
    hours: string;
    minutes: string;
  }
  const usableDate = (date: Date): IusableDate => {
    console.log(date.getTimezoneOffset(), date);

    // const date = new Date(
    //   oldDate.getTime() - oldDate.getTimezoneOffset() * 60000
    // );
    return {
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
  };

  // Getting form data
  const [pickupLocation, setPickupLocation] = useState<number>(0);
  const [pickupDate, setPickupDate] = useState<IusableDate | null>(
    usableDate(currentDate)
  );
  const [pickupTime, setPickupTime] = useState<IusableDate | null>(
    usableDate(currentDate)
  );
  const [dropoffLocation, setDropoffLocation] = useState<number>(0);
  const [dropoffDate, setDropoffDate] = useState<IusableDate | null>(
    usableDate(currentDate)
  );
  const [dropoffTime, setDropoffTime] = useState<IusableDate | null>(
    usableDate(currentDate)
  );

  const setDate = (e: any, isPickup: boolean): void => {
    if (isPickup) {
      if (e.target.valueAsDate) setPickupDate(usableDate(e.target.valueAsDate));
      else setPickupDate(null);
    } else {
      if (e.target.valueAsDate)
        setDropoffDate(usableDate(e.target.valueAsDate));
      else setDropoffDate(null);
    }
  };

  const setTime = (e: any, isPickup: boolean): void => {
    if (isPickup) {
      if (e.target.valueAsDate) setPickupTime(usableDate(e.target.valueAsDate));
      else setPickupTime(null);
    } else {
      if (e.target.valueAsDate)
        setDropoffTime(usableDate(e.target.valueAsDate));
      else setDropoffTime(null);
    }
  };

  interface IOrder {
    pickup: {
      location: number;
      date: {
        year: number;
        month: number;
        day: number;
        hours: number;
        minutes: number;
      };
    };
    dropoff: {
      location: number;
      date: {
        year: number;
        month: number;
        day: number;
        hours: number;
        minutes: number;
      };
    };
  }

  const onSearch = (e: any) => {
    e.preventDefault();
    if (pickupDate && dropoffDate && pickupTime && dropoffTime) {
      const order: IOrder = {
        pickup: {
          location: pickupLocation,
          date: {
            year: Number(pickupDate.year),
            month: Number(pickupDate.month),
            day: Number(pickupDate.day),
            hours: Number(pickupTime.hours),
            minutes: Number(pickupTime.minutes),
          },
        },
        dropoff: {
          location: dropoffLocation,
          date: {
            year: Number(dropoffDate.year),
            month: Number(dropoffDate.month),
            day: Number(dropoffDate.day),
            hours: Number(dropoffTime.hours),
            minutes: Number(dropoffTime.minutes),
          },
        },
      };
      console.log(order);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold">Rent a vehicle</h1>
      <form onSubmit={(e) => onSearch(e)}>
        <div className="formFirstContainer">
          <div className="tripleContainer">
            <div className="formElement">
              <label>Pick-up location</label>
              <br />
              <select
                className="selectElement"
                onChange={(e) =>
                  setPickupLocation(Number(e.currentTarget.value))
                }
              >
                <option selected disabled>
                  From where?
                </option>
                {places.map((place, key) => (
                  <option value={place.id}>{place.city}</option>
                ))}
              </select>
            </div>
            <div className="formElement">
              <label>Pick-up date</label>
              <br />
              <input
                className="selectElement"
                type="date"
                defaultValue={`${usableDate(currentDate).year}-${
                  usableDate(currentDate).month
                }-${usableDate(currentDate).day}`}
                onChange={(e) => setDate(e, true)}
              />
            </div>
            <div className="formElement">
              <label>Pick-up time</label>
              <br />
              <input
                className="selectElement"
                type="time"
                defaultValue={`${usableDate(currentDate).hours}:${
                  usableDate(currentDate).minutes
                }`}
                onChange={(e) => setTime(e, true)}
              />
            </div>
          </div>
          <div className="tripleContainer">
            <div className="formElement">
              <label>Drop-off location</label>
              <br />
              <select
                className="selectElement"
                onChange={(e) =>
                  setDropoffLocation(Number(e.currentTarget.value))
                }
              >
                <option selected disabled>
                  To where?
                </option>
                {places.map((place, key) => (
                  <option value={place.id}>{place.city}</option>
                ))}
              </select>
            </div>
            <div className="formElement">
              <label>Drop-off date</label>
              <br />
              <input
                className="selectElement"
                type="date"
                defaultValue={`${usableDate(currentDate).year}-${
                  usableDate(currentDate).month
                }-${usableDate(currentDate).day}`}
                onChange={(e) => setDate(e, false)}
              />
            </div>
            <div className="formElement">
              <label>Drop-off time</label>
              <br />
              <input
                className="selectElement"
                type="time"
                defaultValue={`${usableDate(currentDate).hours}:${
                  usableDate(currentDate).minutes
                }`}
                onChange={(e) => setTime(e, false)}
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

      <div className="secondFormContainer">
        <VehicleType vehicles={vehicles} fetchedData={fetchedData} />
      </div>
    </div>
  );
};

export default Rent;
