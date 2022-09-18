import React from "react";
import Score from "./Score";
import Map from "./Map";

function Play({ locations, round, onRoundEnd }) {
  return (
    <>
      <Score></Score>
      <Map locations={locations} round={round} onRoundEnd={onRoundEnd}></Map>
    </>
  );
}

export default Play;
