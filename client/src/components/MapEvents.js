import { useMapEvents, Marker } from "react-leaflet";
import { useState } from "react";
import L from "leaflet";

function MapEvents({ hasGuessed, setGuessLocation }) {
  const [position, setPosition] = useState(null);

  const skyCon = new L.Icon({
    iconUrl: require("../images/skycon.png"),
    iconAnchor: new L.Point(30, 60),
    iconSize: new L.Point(60, 60),
  });

  const map = useMapEvents({
    click: (event) => {
      hasGuessed();
      setGuessLocation(event.latlng);
      setPosition(event.latlng);
    },
    mouseover: () => {
      setTimeout(() => {
        map.invalidateSize();
      }, 200);
    },
  });

  return position === null ? null : (
    <Marker icon={skyCon} position={position}></Marker>
  );
}

export default MapEvents;
