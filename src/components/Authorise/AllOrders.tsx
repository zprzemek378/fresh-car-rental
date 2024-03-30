import { useEffect, useState } from "react";
import OrderElement from "./OrderElement";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { OrderParameters } from "../Rent/Rent";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const fetchOrders = async () => {
    const controller = new AbortController();
    try {
      const response = await axiosPrivate.get("/allOrders", {
        signal: controller.signal,
      });

      setOrders(sortOrders(response.data));
    } catch (err) {
      console.log(err);
    }
  };

  const sortOrders = (newOrders: any) => {
    newOrders.sort((a: any, b: any) => {
      if (a.orderdate.year > b.orderdate.year) return -1;
      if (a.orderdate.year < b.orderdate.year) return 1;

      if (a.orderdate.month > b.orderdate.month) return -1;
      if (a.orderdate.month < b.orderdate.month) return 1;

      if (a.orderdate.day > b.orderdate.day) return -1;
      if (a.orderdate.day < b.orderdate.day) return 1;

      if (a.orderdate.hours > b.orderdate.hours) return -1;
      if (a.orderdate.hours < b.orderdate.hours) return 1;

      if (a.orderdate.minutes > b.orderdate.minutes) return -1;
      if (a.orderdate.minutes < b.orderdate.minutes) return 1;

      return 0;
    });
    return newOrders;
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
    fetchOrders();
    fetchVehicles();
    fetchTrailers();
    fetchPlaces();
    setFetchedData(true);
  }, []);

  return (
    <div className="accountElement">
      {orders.length > 0 ? (
        orders.map((o) => (
          <OrderElement
            order={o}
            vehicles={vehicles}
            trailers={trailers}
            places={places}
          />
        ))
      ) : (
        <div className="ml-auto mr-auto mt-5 text-center text-red-700 font-bold text-2xl">
          No orders have been placed yet
        </div>
      )}
    </div>
  );
};

export default AllOrders;
