import { useEffect, useState } from "react";
import { IOrder, OrderParameters } from "../Rent/Rent";
import { ImTruck } from "react-icons/im";
import { FaTrailer } from "react-icons/fa6";
import { MdOutlineArrowDownward } from "react-icons/md";

interface IOrderElement {
  order: {
    orderdate: IOrder["orderDate"];
    ordernumber: string;
    pickuplocation: number;
    pickupdate: IOrder["pickup"]["date"];
    dropofflocation: number;
    dropoffdate: IOrder["dropoff"]["date"];
    truck: number | undefined;
    trailer: [number, number] | undefined;
    duration: number;
    totalcost: number;
    firstname: string;
    lastname: string;
    address: string;
    city: string;
    zip: string;
    email: string;
    phone: string;
  };
  vehicles: OrderParameters["vehicles"];
  places: OrderParameters["places"];
  trailers: OrderParameters["trailers"];
}

const OrderElement: React.FC<IOrderElement> = ({
  order,
  vehicles,
  places,
  trailers,
}) => {
  const [pointingOnComponent, setPointingOnComponent] =
    useState<boolean>(false);

  const [truck, setTruck] = useState<
    OrderParameters["vehicles"][0] | undefined
  >(undefined);
  const [trailer, setTrailer] = useState<
    OrderParameters["trailers"][0] | undefined
  >(undefined);
  const [pickupPlace, setPickupPlace] = useState<
    OrderParameters["places"][0] | undefined
  >(undefined);
  const [dropoffPlace, setDropoffPlace] = useState<
    OrderParameters["places"][0] | undefined
  >(undefined);

  const [trailerLength, setTrailerLength] = useState<number | undefined>(
    undefined
  );
  const [trailerPrice, setTrailerPrice] = useState<number | undefined>(
    undefined
  );

  useEffect(() => {
    setTruck(vehicles.find((v) => v.id === order.truck));
    setTrailer(trailers.find((v) => v.id === order.trailer?.[0]));
    setPickupPlace(places.find((p) => p.id === order.pickuplocation));
    setDropoffPlace(places.find((p) => p.id === order.dropofflocation));

    const index = order?.trailer?.[1] ?? 0;
    setTrailerLength(
      trailers.find((v) => v.id === order.trailer?.[0])?.length[index]
    );
    setTrailerPrice(
      trailers.find((v) => v.id === order.trailer?.[0])?.price[index]
    );
  }, [order, vehicles, places, trailers]);

  return (
    <div
      className={`orderComponent ${
        pointingOnComponent && "orderComponent-onpoint"
      }`}
      onPointerLeave={() => setPointingOnComponent(false)}
      onPointerOver={() => setPointingOnComponent(true)}
    >
      <div className="flex flex-col justify-between m-3 flex-1 ">
        <h1>
          {truck === undefined ? (
            <span>
              Trailer: <div className=" font-bold">{trailer?.name}</div>
            </span>
          ) : trailer === undefined ? (
            <span>
              Truck: <div className=" font-bold">{truck?.brand}</div>
            </span>
          ) : (
            <span>
              Truck & Trailer:
              <div className=" font-bold">
                {truck?.brand} & {trailer?.name}
              </div>
            </span>
          )}
        </h1>
        <div className="flex photosInOrders">
          {truck !== undefined && (
            <img className="truckImage" alt="truckImage" src={truck?.img} />
          )}
          {trailer !== undefined && (
            <img className="truckImage" alt="trailerImage" src={trailer?.img} />
          )}
        </div>
      </div>
      <div className="flex-1">
        {truck !== undefined && (
          <div className="">
            <span className="">
              <ImTruck className="inline mb-1 mr-1" />
              Truck:
            </span>
            <br />
            <h2 className=" font-bold text-lg">{truck?.brand}</h2>
            <p className=" text-sm">{truck?.model}</p>
            <div className="text-sm flex">
              {truck?.horsepower}HP
              <span className=" text-red-500 font-bold ml-auto">
                ${truck?.price}/day
              </span>
            </div>{" "}
            <hr className="border-neutral-400" />
          </div>
        )}

        {trailer !== undefined && (
          <div className="">
            <span>
              <FaTrailer className="inline mb-1 mr-1" />
              Trailer:
            </span>
            <br />
            <h2 className=" font-bold text-lg">{trailer?.name}</h2>
            <div className="text-sm flex">
              {trailerLength}m
              <span className=" text-red-500 font-bold ml-auto">
                ${trailerPrice}/day
              </span>
            </div>{" "}
            <hr className="border-neutral-400" />
          </div>
        )}
      </div>
      <div className="primaryInfo flex-1">
        <div>
          <div className="ml-auto text-sm font-bold">{order.email}</div>

          <div className="ml-auto text-sm">{`${String(
            order.orderdate.year
          ).padStart(4, "0")}-${String(order.orderdate.month).padStart(
            2,
            "0"
          )}-${String(order.orderdate.day).padStart(2, "0")} ${String(
            order.orderdate.hours
          ).padStart(2, "0")}:${String(order.orderdate.minutes).padStart(
            2,
            "0"
          )}`}</div>
          <div className="ml-auto text-sm">#{order.ordernumber}</div>
          <br />
          <div className="ml-auto text-sm">
            <span className="font-bold mr-1">{pickupPlace?.city}</span>
            {`${String(order.pickupdate.year).padStart(4, "0")}-${String(
              order.pickupdate.month
            ).padStart(2, "0")}-${String(order.pickupdate.day).padStart(
              2,
              "0"
            )} `}
          </div>
          <MdOutlineArrowDownward className="ml-auto" />
          <div className="ml-auto text-sm">
            <span className="font-bold mr-1">{dropoffPlace?.city}</span>
            {`${String(order.dropoffdate.year).padStart(4, "0")}-${String(
              order.dropoffdate.month
            ).padStart(2, "0")}-${String(order.dropoffdate.day).padStart(
              2,
              "0"
            )} `}
          </div>
          <br />
          <div>{order.duration} days</div>
        </div>

        <div className="flex ml-auto">
          <p className=" text-red-500">
            <span className=" font-bold">${order.totalcost}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderElement;
