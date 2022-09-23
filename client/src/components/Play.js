import React from "react";
import Score from "./Score";
import Map from "./Map";
import { useState, useEffect } from "react";
import { Pannellum } from "pannellum-react";

function Play({ locations, round, onRoundEnd, setGuessLocation }) {
  const [minutes, setMinutes] = useState(2);
  const [seconds, setSeconds] = useState(59);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(seconds - 1);

      if (seconds === 0) {
        if (minutes === 0) {
          onRoundEnd();
        }

        setMinutes(minutes - 1);
        setSeconds(59);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  });
  return (
    <>
      <Pannellum
        width="100vw"
        height="100vh"
        image={locations[round].url}
        autoLoad
      ></Pannellum>
      <Score round={round} minutes={minutes} seconds={seconds}></Score>
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
