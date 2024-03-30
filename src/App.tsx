import {
  Routes,
  Route,
  BrowserRouter as Router,
  HashRouter,
} from "react-router-dom";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Rent from "./components/Rent/Rent";
import Vehicles from "./components/Vehicles/Vehicles";
import Locations from "./components/Locations/Locations";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import { useState, useEffect } from "react";
import Authorise from "./components/Authorise/Authorise";
import { Alert, Snackbar } from "@mui/material";
import useSnackbar from "./hooks/useSnackbar";
import useLogged from "./hooks/useLogged";
import useAuth from "./hooks/useAuth";

function App() {
  //Resizing
  const [currWidth, setCurrWidth] = useState(1);

  window.addEventListener("resize", () => {
    setCurrWidth(window.innerWidth);
  });

  useEffect(() => setCurrWidth(window.innerWidth), []);

  //Background Image
  const [backgroundImage, setBackgroundImage] = useState("main");

  //@ts-ignore
  const { checkIfIsLoggedIn } = useLogged();

  //po odświezeniu strony sprawdzam czy uzytkownik jest zalogowany
  window.onload = function () {
    checkIfIsLoggedIn();
  };

  //@ts-ignore
  const { snackbarParams, setSnackbarParams } = useSnackbar();

  const [openBar, setOpenBar] = useState(false);

  useEffect(() => {
    if (openBar) {
      setOpenBar(false);

      const firstTimeoutId = setTimeout(() => {
        setOpenBar(true);
      }, 150);

      const timeoutId = setTimeout(() => {
        setOpenBar(false);
        setSnackbarParams({ ...snackbarParams, text: "" });
      }, 5000);
      return () => {
        clearTimeout(firstTimeoutId);
        clearTimeout(timeoutId);
      };
    } else {
      if (snackbarParams.text) {
        setOpenBar(true);
      }

      const timeoutId = setTimeout(() => {
        setOpenBar(false);
        setSnackbarParams({ ...snackbarParams, text: "" });
      }, 5000);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [snackbarParams]);

  return (
    <div className="App App-main">
      <img
        src={`/fresh-car-rental/data/bg-img/${backgroundImage}.jpeg`}
        alt="backgroungPhoto"
        className="backgroundPhoto"
      ></img>
      <Snackbar open={openBar} autoHideDuration={6000}>
        <Alert
          severity={snackbarParams.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarParams.text}
        </Alert>
      </Snackbar>
      <Navbar />
      <div
        className="main-container flex-1 flex flex-col"
        style={{
          zoom:
            currWidth < 640
              ? `${(currWidth * 100) / 640}%`
              : currWidth > 1230
              ? `${(currWidth * 100) / 1230}%`
              : "100%",
        }}
      >
        <div className="mt-5 mb-5 ml-10 mr-10 flex-1">
          <Routes>
            <Route
              path="/"
              element={<Home setBackgroundImage={setBackgroundImage} />}
            />
            <Route
              path="/rent"
              element={<Rent setBackgroundImage={setBackgroundImage} />}
            />
            <Route
              path="/vehicles"
              element={<Vehicles setBackgroundImage={setBackgroundImage} />}
            />
            <Route
              path="/locations"
              element={<Locations setBackgroundImage={setBackgroundImage} />}
            />
            <Route
              path="/contact"
              element={<Contact setBackgroundImage={setBackgroundImage} />}
            />
            <Route
              path="/authorise"
              element={<Authorise setBackgroundImage={setBackgroundImage} />}
            />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
