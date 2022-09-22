import React from "react";
import Score from "./Score";
import Map from "./Map";

function Play({ locations, round, onRoundEnd, setGuessLocation }) {
  return (
    <>
      <Score round={round}></Score>
      <Map
        locations={locations}
        setGuessLocation={setGuessLocation}
        round={round}
        onRoundEnd={onRoundEnd}
      ></Map>
    </>
  );
}

export default Play;
