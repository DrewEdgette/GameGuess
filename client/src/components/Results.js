import React from "react";
import ResultsMap from "./ResultsMap";
import ResultsInfo from "./ResultsInfo";
import { useContext, useEffect } from "react";
import { ChallengeContext } from "../contexts/ChallengeContext";

function Results() {
  const {guessList, setGuessList, guessLocation} = useContext(ChallengeContext);

  useEffect(() => {
    setGuessList([...guessList, guessLocation]);
  }, [])

  return (
    <div className="results">
      <ResultsMap></ResultsMap>
      <ResultsInfo></ResultsInfo>
    </div>
  );
}

export default Results;
