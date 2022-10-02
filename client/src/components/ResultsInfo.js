import React from "react";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { ChallengeContext } from "../contexts/ChallengeContext";

function ResultsInfo() {
  const {onContinueClick, onNewGameClick, locations, round, guessLocation} = useContext(ChallengeContext);
  const [distance, setDistance] = useState(31415926535);
  const [stringDistance, setStringDistance] = useState(distance.toString())

  useEffect(() => {
    console.log(guessLocation);
    let x1 = locations[round].longitude;
    let y1 = locations[round].latitude;

    let x2 = guessLocation.lng;
    let y2 = guessLocation.lat;

    setDistance(calcDistance(x1, x2, y1, y2));
    setStringDistance(stringify(distance));
  }, [distance, guessLocation, locations, round]);

  const calcDistance = (x1, x2, y1, y2) => {
    console.log(x1, y1, x2, y2);
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2) * 16;
  };

  const stringify = (distance) => {
    console.log("distance: " + distance);
    return (distance >= 1000) ? (distance / 1000).toFixed(2).toString() + " km" : distance.toFixed(2).toString() + " m"
  };

  let button =
    round < 4 ? (
      <button onClick={onContinueClick}>Play Next Round</button>
    ) : (
      <button onClick={onNewGameClick}>Play New Game</button>
    );

  return (
    <div className="results-info">
      <p>this is the info area</p>
      <p>the round score will go here</p>
      <p>
        Your guess was about {stringDistance} from the correct location.
      </p>

      {button}
    </div>
  );
}

export default ResultsInfo;
