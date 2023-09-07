import "./rent-style.css";
import "./rent-vehicles-style.css";
import "../Vehicles/vehicles-style.css";

import { useState } from "react";
import { GrSearch } from "react-icons/gr";
import VehicleType from "./VehicleType";
import TrailerType from "./TrailerType";
import ChooseWindow from "./ChooseWindow";

export interface RentProps {
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
  const [dropoffLocation, setDropoffLocation] = useState<number>(0);
  const [dropoffDate, setDropoffDate] = useState<IusableDate | null>(
    usableDate(currentDate)
  );

  const [dateArr, setDateArr] = useState<Date[]>([currentDate, currentDate]);

  const setDate = (e: any, isPickup: boolean): void => {
    if (e.target.value.length != 16) {
      if (isPickup) setPickupDate(null);
      else setDropoffDate(null);
      return;
    }
    const localDate = new Date(e.target.value);
    const newDateArr = [...dateArr];
    if (isPickup) {
      newDateArr[0] = localDate;
      setDateArr([...newDateArr]);
      setPickupDate(usableDate(localDate));
    } else {
      newDateArr[1] = localDate;
      setDateArr([...newDateArr]);
      setDropoffDate(usableDate(localDate));
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
    typeOfOrder: number;
  }

  const onSearch = (e: any) => {
    e.preventDefault();
    if (pickupLocation == 0 || dropoffLocation == 0) {
      alert("Wybierz lokalizacje");
      return;
    }

    if (!pickupDate || !dropoffDate) {
      alert("Wprowadź poprawne daty");
      return;
    }
    if (dateArr[0] >= dateArr[1]) {
      alert("Data odbioru wcześniejsza");
      return;
    }
    if (JSON.stringify(radioResult) == JSON.stringify([false, false, false])) {
      alert("Zaznacz wybór Truck lub Trailer");
      return;
    }
    if (pickupDate && dropoffDate) {
      const order: IOrder = {
        pickup: {
          location: pickupLocation,
          date: {
            year: Number(pickupDate.year),
            month: Number(pickupDate.month),
            day: Number(pickupDate.day),
            hours: Number(pickupDate.hours),
            minutes: Number(pickupDate.minutes),
          },
        },
        dropoff: {
          location: dropoffLocation,
          date: {
            year: Number(dropoffDate.year),
            month: Number(dropoffDate.month),
            day: Number(dropoffDate.day),
            hours: Number(dropoffDate.hours),
            minutes: Number(dropoffDate.minutes),
          },
        },
        typeOfOrder: radioResult[0] ? 0 : radioResult[1] ? 1 : 2,
      };
      setShowResults(order);
      console.log(order, "WNIOSEK PRZYJETY");
    }
  };

  const [radioResult, setRadioResult] = useState<boolean[]>([
    false,
    false,
    false,
  ]);

  const [showResults, setShowResults] = useState<IOrder | null>(null);

  const [showProceedWindow, setShowProceedWindow] = useState<
    RentProps["vehicles"][0] | null
  >(null);
  return (
    <div>
      <h1 className="text-2xl font-semibold">Rent a vehicle</h1>
      <form onSubmit={(e) => onSearch(e)}>
        <div className="formFirstContainer">
          <div className="tripleContainer">
            <div className="formElement">
              <label>Pick-up Location</label>
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
              <label>Pick-up Date&Time</label>
              <br />
              <input
                className="selectElement"
                type="datetime-local"
                defaultValue={`${usableDate(currentDate).year}-${
                  usableDate(currentDate).month
                }-${usableDate(currentDate).day}T${
                  usableDate(currentDate).hours
                }:${usableDate(currentDate).minutes}`}
                onChange={(e) => setDate(e, true)}
              />
            </div>
          </div>
          <div className="tripleContainer">
            <div className="formElement">
              <label>Drop-off Location</label>
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
              <label>Drop-off Date&Time</label>
              <br />
              <input
                className="selectElement"
                type="datetime-local"
                defaultValue={`${usableDate(currentDate).year}-${
                  usableDate(currentDate).month
                }-${usableDate(currentDate).day}T${
                  usableDate(currentDate).hours
                }:${usableDate(currentDate).minutes}`}
                onChange={(e) => setDate(e, false)}
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
                  onChange={(e) => {
                    if (e.target.checked) {
                      setRadioResult([true, false, false]);
                    }
                  }}
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
                  onChange={(e) => {
                    if (e.target.checked) {
                      setRadioResult([false, true, false]);
                    }
                  }}
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
                  onChange={(e) => {
                    if (e.target.checked) {
                      setRadioResult([false, false, true]);
                    }
                  }}
                />
                <label htmlFor="radio3" className="labelRadio">
                  Only Trailer
                </label>
              </div>
              <div>
                <button className="flex bg-red-400 pl-3 pr-3 pt-2 pb-2 ml-5 rounded text-white text-lg searchButton hover:bg-red-500">
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

      {!showResults ? (
        <div className="secondFormContainer"> </div>
      ) : // Truck&Trailer
      showResults.typeOfOrder == 0 ? (
        <div className="secondFormContainer">
          <VehicleType
            vehicles={vehicles}
            places={places}
            fetchedData={fetchedData}
            pickupLocation={showResults.pickup.location}
            setShowProceedWindow={setShowProceedWindow}
          />
        </div>
      ) : // Only Truck
      showResults.typeOfOrder == 1 ? (
        <div className="secondFormContainer">
          <VehicleType
            vehicles={vehicles}
            places={places}
            fetchedData={fetchedData}
            pickupLocation={showResults.pickup.location}
            setShowProceedWindow={setShowProceedWindow}
          />
          {showProceedWindow && <ChooseWindow vehicle={showProceedWindow} />}
        </div>
      ) : (
        //Only Trailer
        <div className="secondFormContainer">
          <TrailerType
            trailers={trailers}
            places={places}
            fetchedData={fetchedData}
            pickupLocation={showResults.pickup.location}
          />
        </div>
      )}
    </div>
  );
};

export default Rent;
