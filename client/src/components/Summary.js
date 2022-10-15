import React from "react";
import SummaryMap from "./SummaryMap";
import { useContext } from "react";
import { ChallengeContext } from "../contexts/ChallengeContext";

function Summary() {
  const { onNewGameClick } = useContext(ChallengeContext);
  return (
    <div className="results-info">
      <SummaryMap></SummaryMap>
      <button onClick={onNewGameClick}>Start New Game</button>
    </div>
  );
}

export default Summary;
