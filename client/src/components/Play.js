import React from "react";
import Score from "./Score";
import Map from "./Map";
import { useState, useEffect } from "react";
import { Pannellum } from "pannellum-react";
import { useContext } from "react";
import { ChallengeContext } from "../contexts/ChallengeContext";

function Play() {
  const { locations, round, setMode } = useContext(ChallengeContext);
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(59);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(seconds - 1);

      if (seconds === 0) {
        if (minutes === 0) {
          setMode("results");
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
      <Map></Map>
    </>
  );
}

export default Play;
