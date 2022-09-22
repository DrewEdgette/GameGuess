import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";

function ResultsMap({ locations, guessLocation, round }) {
  return (
    <div className="results-map">
      <MapContainer center={[40, 0]} zoom={1} scrollWheelZoom={true}>
        <TileLayer
          minZoom={1}
          maxZoom={8}
          noWrap={true}
          url="https://tiles.modmapper.com/{z}/{x}/{y}.jpg"
        />

        {locations && guessLocation ? (
          <>
            <Marker
              position={[locations[round].longitude, locations[round].latitude]}
            ></Marker>

            <Marker
              position={guessLocation}
            ></Marker>
          </>
        ) : null}
      </MapContainer>
    </div>
  );
}

export default ResultsMap;
