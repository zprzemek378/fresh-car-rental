import { IOrder, RentProps } from "./Rent";

interface OrderResultsProps {
  order: IOrder;
  truckOrder: number;
  trailerOrder: number[];
  vehicles: RentProps["vehicles"];
  trailers: RentProps["trailers"];
}

const OrderResults: React.FC<OrderResultsProps> = ({
  order,
  truckOrder,
  trailerOrder,
  vehicles,
  trailers,
}) => {
  return (
    <div>
      <div className="flex justify-evenly flex-wrap">
        <div className="detailsContainer">
          <h2 className="text-center">Order details:</h2>
          <div className="detailsElement">
            <span>Pick-up Location</span>
            <span>{order.pickup.location}</span>
          </div>
        </div>
        <form className="detailsContainer">
          <h2 className="text-center">Please fill in the following details:</h2>
          <div className="detailsElement">
            <label>First Name:</label>
            <input
              type="text"
              placeholder="John"
              required
              className="detailsInput"
            ></input>
          </div>
          <div className="detailsElement">
            <label>Last Name:</label>
            <input
              type="text"
              placeholder="Smith"
              required
              className="detailsInput"
            ></input>
          </div>
          <div className="detailsElement">
            <label>Address:</label>
            <input
              type="text"
              placeholder="123 Main St"
              required
              className="detailsInput"
            ></input>
          </div>
          <div className="detailsElement">
            <label>City:</label>
            <input
              type="text"
              placeholder="New York"
              required
              className="detailsInput"
            ></input>
          </div>
          <div className="detailsElement">
            <label>Zip/Postal Code:</label>
            <input
              type="text"
              placeholder="10001"
              required
              className="detailsInput"
            ></input>
          </div>
          <br />
          <div className="detailsElement">
            <label>Email Adress:</label>
            <input
              type="email"
              placeholder="john.smith@example.com"
              required
              className="detailsInput"
            ></input>
          </div>
          <div className="detailsElement">
            <label>Phone Number:</label>
            <input
              type="tel"
              placeholder="123456789"
              required
              className="detailsInput"
            ></input>
          </div>

          {/* 

          <div className="mr-10">
            <label>First name:</label>
            <br />
            <label>Last name:</label>
            <br />
            <label>Email adress:</label>
            <br />
            <label>Phone number:</label>
            <br />
          </div>
          <div className="ml-10">
            <input
              type="text"
              placeholder="John"
              required
              className="detailsInput"
            ></input>
            <br />
            <input
              type="text"
              placeholder="Smith"
              required
              className="detailsInput"
            ></input>
            <br />
            <input
              type="email"
              placeholder="john.smith@example.com"
              required
              className="detailsInput"
            ></input>
            <br />
            <input
              type="tel"
              placeholder="123456789"
              required
              className="detailsInput"
            ></input>
            <br />
          </div> */}
        </form>
      </div>

      {/* Your order: Pick-up Location: {order.pickup.location}
      Drop-off Location: {order.dropoff.location}
      Pick-up Date&Time: {order.pickup.date.year}-{order.pickup.date.month}-
      {order.pickup.date.day} {order.pickup.date.hours}:
      {order.pickup.date.minutes}
      Drop-off Date&Time: {order.dropoff.date.year}-{order.dropoff.date.month}-
      {order.dropoff.date.day} {order.dropoff.date.hours}:
      {order.dropoff.date.minutes}
      {(order.typeOfOrder == 0 || order.typeOfOrder == 1) &&
        vehicles.map(
          (vehicle) =>
            vehicle.id == truckOrder && (
              <span>
                {vehicle.brand}
                {vehicle.model}
                {" - $"}
                {vehicle.price}
                {"/day"}
              </span>
            )
        )}
      {(order.typeOfOrder == 0 || order.typeOfOrder == 2) &&
        trailers.map(
          (trailer) =>
            trailer.id == trailerOrder[0] && (
              <span>
                {trailer.name}
                {" - "}
                {trailer.length[trailerOrder[1]]}
                {" - $"}
                {trailer.price[trailerOrder[1]]}
                {"/day"}
              </span>
            )
        )} */}
    </div>
  );
};

export default OrderResults;
