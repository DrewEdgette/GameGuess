import React from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import L from "leaflet";
import { useContext } from "react";
import { ChallengeContext } from "../contexts/ChallengeContext";

function ResultsMap() {
  const { locations, guessList, guessLocation, round } =
    useContext(ChallengeContext);

  const guessIcon = new L.Icon({
    iconUrl: require("../images/skycon.png"),
    iconAnchor: new L.Point(30, 60),
    iconSize: new L.Point(60, 60),
  });

  const answerIcon = new L.Icon({
    iconUrl: require("../images/questcon.png"),
    iconAnchor: new L.Point(14, 50),
    iconSize: new L.Point(28, 60),
  });

  const colors = ["red", "orange", "yellow", "green", "blue"];

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

        {round < 5 ? (
          <>
            <Marker
              icon={answerIcon}
              position={[locations[round].latitude, locations[round].longitude]}
            ></Marker>

            <Marker icon={guessIcon} position={guessLocation}></Marker>

            <Polyline
              color="white"
              dashOffset="20"
              weight={2.5}
              dashArray={"10,10"}
              positions={[
                [locations[round].latitude, locations[round].longitude],
                guessLocation,
              ]}
            />
          </>
        ) : (
          guessList.map((guessLocation, index) => {
            return (
              <>
                <Marker icon={guessIcon} position={guessLocation}></Marker>

                <Marker
                  icon={
                    new L.Icon({
                      iconUrl: require(`../images/round${index + 1}.png`),
                      iconAnchor: new L.Point(14, 50),
                      iconSize: new L.Point(28, 60),
                    })
                  }
                  position={[
                    locations[index].latitude,
                    locations[index].longitude,
                  ]}
                ></Marker>

                <Polyline
                  color={colors[index]}
                  dashOffset="20"
                  weight={2.5}
                  dashArray={"10,10"}
                  positions={[
                    [locations[index].latitude, locations[index].longitude],
                    guessLocation,
                  ]}
                />
              </>
            );
          })
        )}
      </MapContainer>
    </div>
  );
}

export default ResultsMap;
