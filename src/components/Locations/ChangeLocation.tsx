import { useEffect } from "react";
import { useMap } from "react-leaflet";

interface IChangeLocation {
  latlngCenter: [number, number];
}

const ChangeLocation: React.FC<IChangeLocation> = ({ latlngCenter }) => {
  const map = useMap();

  useEffect(() => {
    map.flyTo(latlngCenter, 12, {
      animate: true,
      duration: 2.5,
    });
  }, [latlngCenter]);
  return null;
};

export default ChangeLocation;
