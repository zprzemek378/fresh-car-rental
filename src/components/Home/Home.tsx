import React, { useState } from "react";
import "./home-style.css";
import Introduce from "./Introduce";
import WhyUs from "./WhyUs";
import ChoooseType from "./ChoooseType";
import OurServices from "./OurServices";

interface HomeProps {
  setBackgroundImage: (imagePath: string) => void;
}

const Home: React.FC<HomeProps> = ({ setBackgroundImage }) => {
  setBackgroundImage("main");
  const [backlight, setBacklight] = useState<number>(0);
  return (
    <div>
      <Introduce />
      <ChoooseType />
      <WhyUs />
      <OurServices />
    </div>
  );
};

export default Home;
