import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";

function ResultsMap({ locations }) {
  return (
    <div className="results-map">
      <MapContainer center={[40, 0]} zoom={1} scrollWheelZoom={true}>
        <TileLayer
          minZoom={1}
          maxZoom={8}
          noWrap={true}
          url="https://tiles.modmapper.com/{z}/{x}/{y}.jpg"
        />
      </MapContainer>
    </div>
  );
}

export default ResultsMap;
