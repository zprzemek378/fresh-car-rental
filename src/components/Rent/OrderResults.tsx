import { IOrder, OrderParameters } from "./Rent";
import { GiRotaryPhone } from "react-icons/gi";
import { BsCalendarDateFill } from "react-icons/bs";
import { FaLocationDot, FaTrailer } from "react-icons/fa6";
import { BiSolidCity } from "react-icons/bi";
import { ImTruck } from "react-icons/im";
import { useState } from "react";
import { BiTimeFive } from "react-icons/bi";

import useAuth from "../../hooks/useAuth";
import useSnackbar from "../../hooks/useSnackbar";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";

interface OrderResultsProps {
  order: IOrder;
  truckOrder: number;
  trailerOrder: number[];
  vehicles: OrderParameters["vehicles"];
  trailers: OrderParameters["trailers"];
  places: OrderParameters["places"];
}

const OrderResults: React.FC<OrderResultsProps> = ({
  order,
  truckOrder,
  trailerOrder,
  vehicles,
  trailers,
  places,
}) => {
  const res = {
    pickupLocation: places.find((place) => place.id === order.pickup.location),
    dropoffLocation: places.find(
      (place) => place.id === order.dropoff.location
    ),
    truck: vehicles.find((veh) => veh.id === truckOrder),
    trailer: trailers.find((veh) => veh.id === trailerOrder[0]),
    trailerLength: trailers.find((veh) => veh.id === trailerOrder[0])?.length[
      trailerOrder[1]
    ],
    trailerPrice: trailers.find((veh) => veh.id === trailerOrder[0])?.price[
      trailerOrder[1]
    ],
  };

  const [formSubmit, setformSubmit] = useState<boolean>(false);

  const dropDate = new Date(
    order.dropoff.date.year,
    order.dropoff.date.month - 1,
    order.dropoff.date.day,
    order.dropoff.date.hours,
    order.dropoff.date.minutes
  );
  const pickDate = new Date(
    order.pickup.date.year,
    order.pickup.date.month - 1,
    order.pickup.date.day,
    order.pickup.date.hours,
    order.pickup.date.minutes
  );

  const duration = Math.ceil(
    (Number(dropDate) - Number(pickDate)) / (1000 * 60 * 60 * 24)
  );

  const dayCost =
    order.typeOfOrder === 0 && res.truck?.price && res.trailerPrice
      ? res.truck.price + res.trailerPrice
      : order.typeOfOrder === 1 && res.truck
      ? res.truck.price
      : order.typeOfOrder === 2 && res.trailerPrice
      ? res.trailerPrice
      : 0;

  const totalCost = duration * dayCost;
  const [orderNumber, setOrderNumber] = useState(
    String(Math.floor(Math.random() * 100000000)).padStart(8, "0")
  );

  const axiosPrivate = useAxiosPrivate();
  //@ts-ignore
  const { setSnackbarParams } = useSnackbar();
  const handleSubmit = (e: any) => {
    e.preventDefault();

    const postNewOrder = async () => {
      try {
        const response = await axiosPrivate.post(
          "/orders",
          JSON.stringify({
            orderdate: order.orderDate,
            ordernumber: orderNumber,
            pickuplocation: order.pickup.location,
            pickupdate: order.pickup.date,
            dropofflocation: order.dropoff.location,
            dropoffdate: order.dropoff.date,
            truck:
              order.typeOfOrder === 0 || order.typeOfOrder === 1
                ? truckOrder
                : undefined,
            trailer:
              order.typeOfOrder === 0 || order.typeOfOrder === 2
                ? trailerOrder
                : undefined,
            duration: duration,
            totalcost: totalCost,
            firstname: auth.firstname,
            lastname: auth.lastname,
            address: address,
            city: city,
            zip: zip,
            email: auth.email,
            phone: phoneNumber,
          }),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        console.log(response);
        setformSubmit(true);
      } catch (err) {
        setSnackbarParams({
          severity: "error",
          text: "Order submission failed. Please retry!",
        });

        console.log(err);
      }
    };

    postNewOrder();
  };

  //@ts-ignore
  const { auth } = useAuth();

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <div>
      <div className="flex justify-evenly flex-wrap">
        <div className="detailsContainer mt-3">
          <h2 className="text-center">Order details:</h2>
          <div className="detailsElement">
            <span>Pick-up Location:</span>
            <span className="text-right">
              {res.pickupLocation?.address}
              <FaLocationDot className="inline mb-1 ml-1" />
              <br />
              {res.pickupLocation?.city}
              <BiSolidCity className="inline mb-1 ml-1" />
              <br />+{res.pickupLocation?.phonenumber}
              <GiRotaryPhone className="inline mb-1 ml-1" />
            </span>
          </div>

          <div className="detailsElement">
            <span>Pick-up Date&Time:</span>
            <span className="text-right">
              {String(order.pickup.date.day).padStart(2, "0")}.
              {String(order.pickup.date.month).padStart(2, "0")}.
              {order.pickup.date.year}{" "}
              {String(order.pickup.date.hours).padStart(2, "0")}:
              {String(order.pickup.date.minutes).padStart(2, "0")}
              <BsCalendarDateFill className="inline mb-1 ml-1" />
            </span>
          </div>

          <div className="detailsElement">
            <span>Drop-off Location:</span>
            <span className="text-right">
              {res.dropoffLocation?.address}
              <FaLocationDot className="inline mb-1 ml-1" />
              <br />
              {res.dropoffLocation?.city}
              <BiSolidCity className="inline mb-1 ml-1" />
              <br />+{res.dropoffLocation?.phonenumber}
              <GiRotaryPhone className="inline mb-1 ml-1" />
            </span>
          </div>

          <div className="detailsElement">
            <span>Drop-off Date&Time:</span>
            <span className="text-right">
              {String(order.dropoff.date.day).padStart(2, "0")}.
              {String(order.dropoff.date.month).padStart(2, "0")}.
              {order.dropoff.date.year}{" "}
              {String(order.dropoff.date.hours).padStart(2, "0")}:
              {String(order.dropoff.date.minutes).padStart(2, "0")}
              <BsCalendarDateFill className="inline mb-1 ml-1" />
            </span>
          </div>
          {[0, 1].includes(order.typeOfOrder) && (
            <div className="detailsElement">
              <span>Truck:</span>
              <span className="text-right">
                {res.truck?.brand} {res.truck?.model} {res.truck?.horsepower}HP
                {" - "}
                <span className=" text-red-500 font-bold">
                  ${res.truck?.price}/day
                </span>
                <ImTruck className="inline mb-1 ml-1" />
              </span>
            </div>
          )}
          {[0, 2].includes(order.typeOfOrder) && (
            <div className="detailsElement">
              <span>Trailer:</span>
              <span className="text-right">
                {res.trailer?.name} - {res.trailerLength}m{" - "}
                <span className=" text-red-500 font-bold">
                  ${res.trailerPrice}/day
                </span>
                <FaTrailer className="inline mb-1 ml-1" />
              </span>
            </div>
          )}

          <div className="detailsElement">
            <span>Duration:</span>
            <span className="text-right">
              <span className="text-red-500 font-bold">{duration} days</span>
              <BiTimeFive className="inline mb-1 ml-1" />
            </span>
          </div>

          <div className="detailsElement">
            <span className="font-bold text-xl">Total cost:</span>
            <span className="text-right">
              <span className="text-red-500 font-bold text-xl">
                ${totalCost}
              </span>
            </span>
          </div>
        </div>
        {!formSubmit ? (
          <form
            className="detailsContainer mt-3"
            onSubmit={(e) => handleSubmit(e)}
          >
            <h2 className="text-center">
              Please fill in the following details:
            </h2>
            <div className="detailsElement">
              <label>First Name:</label>
              <input
                type="text"
                required
                className="detailsInput"
                value={auth.firstname}
                readOnly
                disabled
              ></input>
            </div>
            <div className="detailsElement">
              <label>Last Name:</label>
              <input
                type="text"
                required
                className="detailsInput"
                value={auth.lastname}
                readOnly
                disabled
              ></input>
            </div>
            <div className="detailsElement">
              <label>Address:</label>
              <input
                type="text"
                placeholder="123 Main St"
                required
                className="detailsInput"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
              ></input>
            </div>
            <div className="detailsElement">
              <label>City:</label>
              <input
                type="text"
                placeholder="New York"
                required
                className="detailsInput"
                onChange={(e) => setCity(e.target.value)}
                value={city}
              ></input>
            </div>
            <div className="detailsElement">
              <label>Zip/Postal Code:</label>
              <input
                type="text"
                placeholder="10001"
                required
                className="detailsInput"
                onChange={(e) => setZip(e.target.value)}
                value={zip}
              ></input>
            </div>
            <br />
            <div className="detailsElement">
              <label>Email Adress:</label>
              <input
                type="email"
                required
                className="detailsInput"
                value={auth.email}
                readOnly
                disabled
              ></input>
            </div>
            <div className="detailsElement">
              <label>Phone Number:</label>
              <input
                type="tel"
                placeholder="123456789"
                required
                className="detailsInput"
                onChange={(e) =>
                  setPhoneNumber(e.target.value.replace(/[^0-9-]/g, ""))
                }
                value={phoneNumber}
              ></input>
            </div>
            <button className="chooseButton bg-gray-400 mt-5">
              Place order
            </button>
          </form>
        ) : (
          <div className="mt-3 detailsContainer detailsContainerTransparent">
            <h2 className="font-bold text-xl">Order Confirmed!</h2>
            <br />
            <p>Your order has been successfully confirmed.</p>
            <br />
            <p>Order number: #{orderNumber}</p>
            <br />
            <p>
              Please check your email for further instructions and expect a
              message from our consultant shortly.
            </p>
            <br />
            <p>
              If you have any questions or need assistance, feel free to contact
              us at support@freshrental.com.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderResults;
