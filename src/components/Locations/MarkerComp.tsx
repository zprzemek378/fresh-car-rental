import { Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";
import { BsFillTelephoneFill as Phone } from "react-icons/bs";
import { FaCity, FaRoad } from "react-icons/fa";

interface MarkerCompProps {
  latlng: [number, number];
  popup1: string;
  popup2: string;
  popup3: number;
}

const MarkerComp: React.FC<MarkerCompProps> = ({
  latlng,
  popup1,
  popup2,
  popup3,
}) => {
  return (
    <div>
      <Marker
        position={[latlng[0], latlng[1]]}
        icon={
          new Icon({
            iconUrl: markerIconPng,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
          })
        }
      >
        <Popup>
          <div className="flex text-center">
            <FaCity />
            &nbsp;
            {popup1}
          </div>

          <div className="flex text-center">
            <FaRoad />
            &nbsp;
            {popup2}
          </div>

          <div className="flex text-center">
            <Phone />
            &nbsp; +{popup3}
          </div>
        </Popup>
      </Marker>
    </div>
  );
};

export default MarkerComp;
