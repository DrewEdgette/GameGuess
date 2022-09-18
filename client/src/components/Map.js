import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { useEffect, useState } from "react";
import MapEvents from "./MapEvents";

function Map({ locations, round, onRoundEnd }) {
  return (
    <div className="guess-map">
      <MapContainer center={[40, 0]} zoom={1} scrollWheelZoom={true}>
        <TileLayer
          minZoom={1}
          maxZoom={8}
          noWrap={true}
          url="https://tiles.modmapper.com/{z}/{x}/{y}.jpg"
        />
        <MapEvents onRoundEnd={onRoundEnd}></MapEvents>

        {locations ? (
          <Marker
            position={[
              locations[round].longitude,
              locations[round].latitude,
            ]}
          ></Marker>
        ) : null}
      </MapContainer>

      <button onClick={onRoundEnd}>GUESS</button>
    </div>
  );
}

export default Map;
