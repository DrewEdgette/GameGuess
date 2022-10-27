import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import AllMapEvents from "./AllMapEvents";

function AllMap({ locations }) {
  const answerIcon = new L.Icon({
    iconUrl: require("../images/questcon.png"),
    iconAnchor: new L.Point(14, 50),
    iconSize: new L.Point(28, 60),
  });

  return (
    <div className="results-map">
      <MapContainer
        maxBounds={[
          [-64, -180],
          [110, 156],
        ]}
        center={[40, 0]}
        zoom={1}
        scrollWheelZoom={true}
      >
        <TileLayer
          minZoom={1}
          maxZoom={8}
          noWrap={true}
          url="https://tiles.modmapper.com/{z}/{x}/{y}.jpg"
        />

        {locations.map((location, index) => {
          return (
            <Marker
              key={index}
              icon={answerIcon}
              position={[location.latitude, location.longitude]}
            ></Marker>
          );
        })}

        <AllMapEvents></AllMapEvents>
      </MapContainer>
    </div>
  );
}

export default AllMap;
