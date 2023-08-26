import "./navbar-style.css";
import { Link } from "react-router-dom";
import { ImTruck } from "react-icons/im";
import { AiOutlineMenu } from "react-icons/ai";
import { useEffect, useState } from "react";
import NavbarLink from "./NavbarLink";

const Navbar = () => {
  const [barState, setBarState] = useState(false);
  const onclick = (e: any) => {
    e.preventDefault();
    setBarState(!barState);
  };

  const [minWidth, setMinWidth] = useState(false);
  window
    .matchMedia("(min-width: 680px)")
    .addEventListener("change", (e) => setMinWidth(e.matches));

  useEffect(
    () => setMinWidth(window.matchMedia("(min-width: 680px)").matches),
    []
  );

  return (
    <div className="bg-gray-100">
      <div className="navbar-main">
        <div className="flex">
          {!minWidth && (
            <button className="p-7" onClick={(e) => onclick(e)}>
              <AiOutlineMenu />
            </button>
          )}
          <Link to={"/"} className="navbar-item font-bold">
            <div className="px-3 py-3 mx-4 flex w-max">
              <ImTruck
                className="mr-8 ml-4 my-3 text-red-500"
                style={{ scale: "300%" }}
              />
              <div>
                FRESH TRUCK
                <br />
                <p className="text-red-500 text-left">RENTAL</p>
              </div>
            </div>
          </Link>
        </div>
        {(minWidth || barState) && (
          <div
            className="flex-1 navbar-main mx-6"
            onClick={() => setBarState(false)}
          >
            <NavbarLink name="Rent" minWidth={minWidth} />
            <NavbarLink name="Vehicles" minWidth={minWidth} />
            <NavbarLink name="Locations" minWidth={minWidth} />
            <NavbarLink name="Contact" minWidth={minWidth} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
