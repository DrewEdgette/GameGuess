import React from "react";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { ChallengeContext } from "../contexts/ChallengeContext";

function ResultsInfo() {
  const {onContinueClick, onSummaryClick, locations, round, guessLocation, totalScore, setTotalScore} = useContext(ChallengeContext);
  const [distance, setDistance] = useState(31415926535);
  const [stringDistance, setStringDistance] = useState(distance.toString())
  const [score, setScore] = useState(0);

  useEffect(() => {
    let x1 = locations[round].longitude;
    let y1 = locations[round].latitude;

    let x2 = guessLocation.lng;
    let y2 = guessLocation.lat;

    setDistance(calcDistance(x1, x2, y1, y2));
    setStringDistance(stringify(distance));

    setScore(calcScore(distance));
    setTotalScore(totalScore + score);

  }, [distance, guessLocation, locations, round, score]);

  const calcDistance = (x1, x2, y1, y2) => {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2) * 32;
  };

  const calcScore = (distance) => {
    if (distance <= 20) {
      return 5000;
    }

    if (distance >= 1000) {
      return 0;
    }

    return Math.round(5000 - distance * 5);
  }

  const stringify = (distance) => {
    return (distance >= 1000) ? (distance / 1000).toFixed(2).toString() + " km" : distance.toFixed(2).toString() + " m"
  };

  let button =
    round < 4 ? (
      <button onClick={onContinueClick}>Play Next Round</button>
    ) : (
      <button onClick={onSummaryClick}>View Summary</button>
    );

  return (
    <div className="results-info">
      <strong>{score} points</strong>
      <p>
        Your guess was about <strong>{stringDistance}</strong> from the correct location.
      </p>

      {button}
    </div>
  );
}

export default ResultsInfo;
