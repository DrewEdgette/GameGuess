import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import MapEvents from "./MapEvents";
import { useState } from "react";
import { useContext } from "react";
import { ChallengeContext } from "../contexts/ChallengeContext";

function Map() {
  const { setMode } = useContext(ChallengeContext);
  const [hasGuessed, setHasGuessed] = useState(false);

  return (
    <div className="guess-map">
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
        <MapEvents hasGuessed={() => setHasGuessed(true)}></MapEvents>

        {/* for cheaters
        <Marker position={[locations[round].latitude, locations[round].longitude]}></Marker> */}
      </MapContainer>

      <button onClick={() => setMode("results")} disabled={!hasGuessed}>
        {hasGuessed ? "Guess" : "Place a Pin on the Map"}
      </button>
    </div>
  );
}

export default Map;
