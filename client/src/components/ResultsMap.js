import React from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import L, { Layer } from "leaflet";

function ResultsMap({ locations, guessLocation, round }) {
  const guessIcon = new L.Icon({
    iconUrl: require("../images/skycon.png"),
    iconAnchor: new L.Point(30, 60),
    iconSize: new L.Point(60, 60),
  });

  const answerIcon = new L.Icon({
    iconUrl: require("../images/housecon.png"),
    iconAnchor: new L.Point(30, 60),
    iconSize: new L.Point(60, 60),
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

        {locations && guessLocation ? (
          <>
            <Marker
              icon={answerIcon}
              position={[locations[round].latitude, locations[round].longitude]}
            ></Marker>

            <Marker icon={guessIcon} position={guessLocation}></Marker>
          </>
        ) : null}

        <Polyline color="white" dashOffset="20" weight={2.5} dashArray={"10,10"} positions={[[locations[round].latitude, locations[round].longitude], guessLocation]}/>
      </MapContainer>
    </div>
  );
}

export default ResultsMap;
