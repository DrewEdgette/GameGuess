import React from "react";
import ResultsMap from "./ResultsMap";
import ResultsInfo from "./ResultsInfo";
import Score from "./Score";
import { useContext, useEffect } from "react";
import { ChallengeContext } from "../contexts/ChallengeContext";

function Results() {
  const { guessList, setGuessList, guessLocation, round } = useContext(ChallengeContext);

  useEffect(() => {
    setGuessList([...guessList, guessLocation]);
  }, []);

  return (
    <div className="results">
      <Score round={round}></Score>
      <ResultsMap></ResultsMap>
      <ResultsInfo></ResultsInfo>
    </div>
  );
}

export default Results;
