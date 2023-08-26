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
import { useState } from "react";

function App() {
  const [currWidth, setCurrWidth] = useState(1);

  window.addEventListener("resize", () => {
    setCurrWidth(window.innerWidth);
  });

  // useEffect(
  //   () => setCurrWidth(window.matchMedia("(min-width").matches),
  //   []
  // );

  return (
    // <HashRouter>
    <div className="App App-main">
      <Navbar />
      <div
        className="main-container"
        style={{
          zoom: currWidth < 640 ? `${(currWidth * 100) / 640}%` : "100%",
        }}
      >
        <div className="mt-5 mb-5 ml-10 mr-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rent" element={<Rent />} />
            <Route path="/vehicles" element={<Vehicles />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
    // </HashRouter>
  );
}

export default App;
