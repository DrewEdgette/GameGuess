import { useMapEvents, Marker } from "react-leaflet";
import { useState } from "react";
import L from "leaflet";

function AllMapEvents() {
    const [position, setPosition] = useState(new L.latLng(0,0));
    const skyCon = new L.Icon({
    iconUrl: require("../images/skycon.png"),
    iconAnchor: new L.Point(30, 60),
    iconSize: new L.Point(60, 60),
  });

  const map = useMapEvents({
    click: (event) => {
      setPosition(event.latlng);
      //alert(event.latlng);
    },
  });

  const onClick = () => {
    alert("you clicked a marker");
  };

  return (
    <Marker icon={skyCon} position={position}></Marker>
  );
}

export default AllMapEvents;
