import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import MapEvents from "./MapEvents";
import { useState } from "react";

function Map({ locations, setGuessLocation, round, onRoundEnd }) {
  const [hasGuessed, setHasGuessed] = useState(false);

  return (
    <div className="guess-map">
      <MapContainer center={[40, 0]} zoom={1} scrollWheelZoom={true}>
        <TileLayer
          minZoom={1}
          maxZoom={8}
          noWrap={true}
          url="https://tiles.modmapper.com/{z}/{x}/{y}.jpg"
        />
        <MapEvents
          setGuessLocation={setGuessLocation}
          onRoundEnd={onRoundEnd}
          hasGuessed={() => setHasGuessed(true)}
        ></MapEvents>

        {locations ? (
          <Marker
            position={[locations[round].longitude, locations[round].latitude]}
          ></Marker>
        ) : null}
      </MapContainer>

      <button onClick={onRoundEnd} disabled={!hasGuessed}>
        {hasGuessed ? "GUESS" : "PLACE A PIN ON THE MAP"}
      </button>
    </div>
  );
}

export default Map;
