import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import useLogged from "../../hooks/useLogged";
import useSnackbar from "../../hooks/useSnackbar";
import { useState } from "react";
import MyOrders from "./MyOrders";
import MyAccount from "./MyAccount";
import AllOrders from "./AllOrders";
import AllUsers from "./AllUsers";

const Account = () => {
  //@ts-ignore
  const { auth, setAuth } = useAuth();
  //@ts-ignore
  const { setLogged, checkIfIsLoggedIn } = useLogged();
  //@ts-ignore
  const { setSnackbarParams } = useSnackbar();

  const handleLogout = (e: any) => {
    e.preventDefault();
    const logout = async () => {
      try {
        const response = await axios.get("/users/logout", {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        console.log("wylogowano");
        setLogged(false);
      } catch (err) {
        console.log("BLAD Z SERWERA: ", err);
        checkIfIsLoggedIn();
      }
    };

    logout();
    setAuth({});
    setSnackbarParams({
      severity: "success",
      text: "Logged out successfully!",
    });
  };

  const [typeOfProduct, setTypeOfProduct] = useState(0);
  const changeTypeOfProduct = (type: number) => {
    const newHighlightType = [false, false, false, false];
    newHighlightType[type] = true;
    setHighlightType([...newHighlightType]);
    setTypeOfProduct(type);
  };
  const [highlightType, setHighlightType] = useState([true, false]);

  return (
    <div className="account">
      <div className="grid grid-flow-col justify-between">
        <div className="chooseContainerAccount text-lg">
          <div className="groupChoosers">
            <div
              className={`chooseElement ${
                highlightType[0] && "chooseElement-highlight"
              }`}
              onClick={() => changeTypeOfProduct(0)}
            >
              My orders
            </div>
            <div
              className={`chooseElement ${
                highlightType[1] && "chooseElement-highlight"
              }`}
              onClick={() => changeTypeOfProduct(1)}
            >
              My account
            </div>
          </div>
          {auth && auth.roles && auth.roles.includes(5150) && (
            <div className="groupChoosers">
              <div
                className={`chooseElement ${
                  highlightType[2] && "chooseElement-highlight"
                }`}
                onClick={() => changeTypeOfProduct(2)}
              >
                All orders
              </div>
              <div
                className={`chooseElement ${
                  highlightType[3] && "chooseElement-highlight"
                }`}
                onClick={() => changeTypeOfProduct(3)}
              >
                All users
              </div>
            </div>
          )}
        </div>
        <div>
          <button
            onClick={(e) => handleLogout(e)}
            className="chooseElement chooseElement-highlight"
          >
            Log out
          </button>
        </div>
      </div>
      {typeOfProduct === 0 ? (
        <MyOrders />
      ) : typeOfProduct === 1 ? (
        <MyAccount />
      ) : typeOfProduct === 2 ? (
        <AllOrders />
      ) : (
        <AllUsers />
      )}
    </div>
  );
};

export default Account;
