import React from "react";
import ResultsMap from "./ResultsMap";
import ResultsInfo from "./ResultsInfo";

function Results({
  locations,
  guessLocation,
  round,
  onContinueClick,
  onNewGameClick,
}) {
  return (
    <div className="results">
      <ResultsMap
        locations={locations}
        guessLocation={guessLocation}
        round={round}
      ></ResultsMap>
      <ResultsInfo
        round={round}
        locations={locations}
        guessLocation={guessLocation}
        onContinueClick={onContinueClick}
        onNewGameClick={onNewGameClick}
      ></ResultsInfo>
    </div>
  );
}

export default Results;
