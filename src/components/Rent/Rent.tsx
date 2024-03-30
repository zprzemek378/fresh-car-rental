import "./rent-style.css";
import "./rent-vehicles-style.css";
import "../Vehicles/vehicles-style.css";

import { useEffect, useState } from "react";
import { GrSearch } from "react-icons/gr";
import VehicleType from "./VehicleType";
import TrailerType from "./TrailerType";
import ChooseWindow from "./ChooseWindow";
import ChooseTrailerWindow from "./ChooseTrailerWindow";
import OrderResults from "./OrderResults";
import useSnackbar from "../../hooks/useSnackbar";
import useLogged from "../../hooks/useLogged";

interface RentProps {
  setBackgroundImage: (imagePath: string) => void;
}

export interface OrderParameters {
  vehicles: {
    id: number;
    brand: string;
    model: string;
    horsepower: number;
    color: string;
    available: number[];
    tank: number;
    price: number;
    img: string;
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
    img: string;
  }[];
}

export interface IOrder {
  orderDate: {
    year: number;
    month: number;
    day: number;
    hours: number;
    minutes: number;
  };
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

const Rent: React.FC<RentProps> = ({ setBackgroundImage }) => {
  setBackgroundImage("rent");
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

  const [pickupLocationError, setPickupLocationError] = useState(false);
  const [pickupDateError, setPickupDateError] = useState(false);
  const [dropoffLocationError, setDropoffLocationError] = useState(false);
  const [dropoffDateError, setDropoffDateError] = useState(false);
  const [truckTrailerChooseError, setTruckTrailerChooseError] = useState(false);

  //@ts-ignore
  const { logged } = useLogged();
  const onSearch = (e: any) => {
    e.preventDefault();

    needToLoginAlert();
    if (!logged) {
      return;
    }

    let ifReturn = false;

    if (pickupLocation == 0) {
      setPickupLocationError(true);
      setTimeout(() => setPickupLocationError(false), 900);
      ifReturn = true;
    }

    if (dropoffLocation == 0) {
      setDropoffLocationError(true);
      setTimeout(() => setDropoffLocationError(false), 900);
      ifReturn = true;
    }

    if (!pickupDate) {
      setPickupDateError(true);
      setTimeout(() => setPickupDateError(false), 900);
      ifReturn = true;
    }

    if (!dropoffDate) {
      setDropoffDateError(true);
      setTimeout(() => setDropoffDateError(false), 900);
      ifReturn = true;
    }

    if (dateArr[0] >= dateArr[1]) {
      setPickupDateError(true);
      setTimeout(() => setPickupDateError(false), 900);

      setDropoffDateError(true);
      setTimeout(() => setDropoffDateError(false), 900);
      ifReturn = true;
    }
    if (JSON.stringify(radioResult) == JSON.stringify([false, false, false])) {
      setTruckTrailerChooseError(true);
      setTimeout(() => setTruckTrailerChooseError(false), 900);
      ifReturn = true;
    }

    if (ifReturn) return;

    const orderDate = usableDate(currentDate);
    if (pickupDate && dropoffDate) {
      const order: IOrder = {
        orderDate: {
          year: Number(orderDate.year),
          month: Number(orderDate.month),
          day: Number(orderDate.day),
          hours: Number(orderDate.hours),
          minutes: Number(orderDate.minutes),
        },
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
      setOrderStage(1);
    }
  };

  const [radioResult, setRadioResult] = useState<boolean[]>([
    false,
    false,
    false,
  ]);

  const [showResults, setShowResults] = useState<IOrder | null>(null);

  const [showProceedWindow, setShowProceedWindow] = useState<
    | OrderParameters["vehicles"][0]
    | [OrderParameters["trailers"][0], boolean, boolean | null]
    | null
  >(null);

  const [orderStage, setOrderStage] = useState<number>(0);

  const [truckOrder, setTruckOrder] = useState<number>(0);
  const [trailerOrder, setTrailerOrder] = useState<number[]>([0, 0]);
  const ifProceed = (ifDo: boolean, whichVehicle: number[]) => {
    setShowProceedWindow(null);
    if (ifDo) {
      setOrderStage(orderStage + 1);
      if (whichVehicle[1] == -1) {
        //-1 oznacza truck, 0 i 1 to rózne rozmiary naczepy)
        //Truck case
        setTruckOrder(whichVehicle[0]);
      } else {
        //Trailer case
        setTrailerOrder([...whichVehicle]);
      }
    }
  };

  const [vehicles, setVehicles] = useState<OrderParameters["vehicles"]>([]);
  const [places, setPlaces] = useState<OrderParameters["places"]>([]);
  const [trailers, setTrailers] = useState<OrderParameters["trailers"]>([]);

  const fetchVehicles = async () => {
    const response = await fetch("http://localhost:3001/trucks");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    setVehicles(data);
  };

  const fetchTrailers = async () => {
    const response = await fetch("http://localhost:3001/trailers");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    setTrailers(data);
  };

  const fetchPlaces = async () => {
    const response = await fetch("http://localhost:3001/places");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    setPlaces(data);
  };

  const [fetchedData, setFetchedData] = useState<boolean>(false);

  useEffect(() => {
    fetchVehicles();
    fetchTrailers();
    fetchPlaces();
    setFetchedData(true);
  }, []);

  //@ts-ignore
  const { setSnackbarParams } = useSnackbar();
  const needToLoginAlert = () => {
    if (!logged) {
      setSnackbarParams({ severity: "error", text: "You need to log in!" });
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold">Rent a vehicle</h1>
      <form onSubmit={(e) => onSearch(e)}>
        <div className="formFirstContainer">
          <div className="tripleContainer">
            <div
              className={`formElement ${
                pickupLocationError && "formElement-error"
              }`}
            >
              <label>Pick-up Location</label>
              <br />
              <select
                className="selectElement"
                onChange={(e) => {
                  needToLoginAlert();
                  setPickupLocation(Number(e.currentTarget.value));
                }}
              >
                <option selected disabled>
                  From where?
                </option>
                {places.map((place, key) => (
                  <option value={place.id}>{place.city}</option>
                ))}
              </select>
            </div>
            <div
              className={`formElement ${
                pickupDateError && "formElement-error"
              }`}
            >
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
                onChange={(e) => {
                  needToLoginAlert();
                  setDate(e, true);
                }}
              />
            </div>
          </div>
          <div className="tripleContainer">
            <div
              className={`formElement ${
                dropoffLocationError && "formElement-error"
              }`}
            >
              <label>Drop-off Location</label>
              <br />
              <select
                className="selectElement"
                onChange={(e) => {
                  needToLoginAlert();
                  setDropoffLocation(Number(e.currentTarget.value));
                }}
              >
                <option selected disabled>
                  To where?
                </option>
                {places.map((place, key) => (
                  <option value={place.id}>{place.city}</option>
                ))}
              </select>
            </div>
            <div
              className={`formElement ${
                dropoffDateError && "formElement-error"
              }`}
            >
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
                onChange={(e) => {
                  needToLoginAlert();
                  setDate(e, false);
                }}
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
                      needToLoginAlert();
                      setRadioResult([true, false, false]);
                    }
                  }}
                />
                <label
                  htmlFor="radio1"
                  className={`labelRadio ${
                    truckTrailerChooseError && "labelRadio-error"
                  }`}
                >
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
                      needToLoginAlert();
                      setRadioResult([false, true, false]);
                    }
                  }}
                />
                <label
                  htmlFor="radio2"
                  className={`labelRadio ${
                    truckTrailerChooseError && "labelRadio-error"
                  }`}
                >
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
                      needToLoginAlert();
                      setRadioResult([false, false, true]);
                    }
                  }}
                />
                <label
                  htmlFor="radio3"
                  className={`labelRadio ${
                    truckTrailerChooseError && "labelRadio-error"
                  }`}
                >
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

      {!logged && (
        <div className="ml-auto mr-auto mt-5 text-center text-red-700 font-bold text-2xl">
          You need to log in to unlock this feature!
        </div>
      )}

      {!showResults ? (
        <div className="secondFormContainer"> </div>
      ) : // Truck&Trailer
      showResults.typeOfOrder == 0 ? (
        <div className="secondFormContainer">
          {orderStage == 1 ? (
            <VehicleType
              vehicles={vehicles}
              places={places}
              fetchedData={fetchedData}
              pickupLocation={showResults.pickup.location}
              setShowProceedWindow={setShowProceedWindow}
            />
          ) : orderStage == 2 ? (
            <TrailerType
              trailers={trailers}
              places={places}
              fetchedData={fetchedData}
              pickupLocation={showResults.pickup.location}
              setShowProceedWindow={setShowProceedWindow}
            />
          ) : (
            <OrderResults
              order={showResults}
              truckOrder={truckOrder}
              trailerOrder={trailerOrder}
              vehicles={vehicles}
              trailers={trailers}
              places={places}
            />
          )}

          {showProceedWindow && "brand" in showProceedWindow ? (
            <ChooseWindow vehicle={showProceedWindow} ifProceed={ifProceed} />
          ) : (
            showProceedWindow && (
              <ChooseTrailerWindow
                vehicle={showProceedWindow}
                ifProceed={ifProceed}
              />
            )
          )}
        </div>
      ) : // Only Truck
      showResults.typeOfOrder == 1 ? (
        <div className="secondFormContainer">
          {orderStage == 1 ? (
            <VehicleType
              vehicles={vehicles}
              places={places}
              fetchedData={fetchedData}
              pickupLocation={showResults.pickup.location}
              setShowProceedWindow={setShowProceedWindow}
            />
          ) : (
            <OrderResults
              order={showResults}
              truckOrder={truckOrder}
              trailerOrder={trailerOrder}
              vehicles={vehicles}
              trailers={trailers}
              places={places}
            />
          )}

          {showProceedWindow && "brand" in showProceedWindow && (
            <ChooseWindow vehicle={showProceedWindow} ifProceed={ifProceed} />
          )}
        </div>
      ) : (
        //Only Trailer
        <div className="secondFormContainer">
          {orderStage == 1 ? (
            <TrailerType
              trailers={trailers}
              places={places}
              fetchedData={fetchedData}
              pickupLocation={showResults.pickup.location}
              setShowProceedWindow={setShowProceedWindow}
            />
          ) : (
            <OrderResults
              order={showResults}
              truckOrder={truckOrder}
              trailerOrder={trailerOrder}
              vehicles={vehicles}
              trailers={trailers}
              places={places}
            />
          )}

          {showProceedWindow && "brand" in showProceedWindow ? (
            <ChooseWindow vehicle={showProceedWindow} ifProceed={ifProceed} />
          ) : (
            showProceedWindow && (
              <ChooseTrailerWindow
                vehicle={showProceedWindow}
                ifProceed={ifProceed}
              />
            )
          )}
        </div>
      )}
    </div>
  );
};

export default Rent;
