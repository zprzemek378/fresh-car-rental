import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const MyAccount = () => {
  const [pointingOnComponent, setPointingOnComponent] =
    useState<boolean>(false);

  const [orders, setOrders] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const fetchOrders = async () => {
    const controller = new AbortController();
    try {
      const response = await axiosPrivate.get("/orders", {
        signal: controller.signal,
      });

      setOrders(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  //@ts-ignore
  const { auth } = useAuth();

  return (
    <div
      className={`orderComponent ${
        pointingOnComponent && "orderComponent-onpoint"
      }`}
      onPointerLeave={() => setPointingOnComponent(false)}
      onPointerOver={() => setPointingOnComponent(true)}
    >
      <div className="flex-1 mt-auto mb-auto">
        <div className="ml-auto mr-auto w-72 flex">
          First name:
          <span className="ml-auto font-bold">{auth.firstname}</span>
        </div>
        <div className="ml-auto mr-auto w-72 flex">
          Last name:
          <span className="ml-auto font-bold">{auth.lastname}</span>
        </div>
        <div className="ml-auto mr-auto w-72 flex">
          Email:
          <span className="ml-auto font-bold">{auth.email}</span>
        </div>
      </div>
      <div className="flex-1 mt-auto mb-auto">
        <div className="ml-auto mr-auto w-40 flex">
          Placed orders:
          <span className="ml-auto font-bold">{orders.length}</span>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
