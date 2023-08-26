import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Rent from "./components/Rent/Rent";
import Vehicles from "./components/Vehicles/Vehicles";
import Locations from "./components/Locations/Locations";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";

function App() {
  // fetch("/data/db.json")
  //   .then((res) => res.json())
  //   .then((data) => console.log(data));

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="main-container">
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
    </Router>
  );
}

export default App;
