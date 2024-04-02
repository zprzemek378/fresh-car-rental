import { useEffect, useState } from "react";
import OrderElement from "./OrderElement";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { OrderParameters } from "../Rent/Rent";
import axios from "../../api/axios";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const fetchOrders = async () => {
    const controller = new AbortController();
    try {
      const response = await axiosPrivate.get("/orders", {
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
    try {
      const response = await axios.get("trucks");
      const data = response.data;
      setVehicles(data);
    } catch (error: any) {
      throw new Error(`HTTP error! Status: ${error.response.status}`);
    }
  };

  const fetchTrailers = async () => {
    try {
      const response = await axios.get("/trailers");
      const data = response.data;
      setTrailers(data);
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

export default MyOrders;
