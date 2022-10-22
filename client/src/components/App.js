import "../css/index.css";
import Start from "./Start";
import Play from "./Play";
import Results from "./Results";
import Summary from "./Summary";
import L from "leaflet";
import { useEffect, useState } from "react";
import { ChallengeContext } from "../contexts/ChallengeContext";

function App() {
  const ORIGIN = new L.LatLng(0, 0);
  const [mode, setMode] = useState("start");
  const [round, setRound] = useState(0);
  const [locations, setLocations] = useState([]);
  const [guessLocation, setGuessLocation] = useState(ORIGIN);
  const [guessList, setGuessList] = useState([]);
  const [totalScore, setTotalScore] = useState(0);

  const fetchLocations = async () => {
    const response = await fetch("http://localhost:8000/locations");
    const locationList = await response.json();

    setLocations(locationList);
  };

  const onContinueClick = () => {
    setMode("play");
    setRound(round + 1);
    setGuessLocation(ORIGIN);
  };

  const onNewGameClick = () => {
    fetchLocations();
    setMode("start");
    setRound(0);
    setTotalScore(0);
    setGuessList([]);
    setGuessLocation(ORIGIN);
  };

  const onSummaryClick = () => {
    setRound(round + 1);
    setMode("summary");
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  return (
    <div>
      {/* guess location: {guessLocation.toString()}
      correct location: {locations[round] !== undefined ? [locations[round].latitude, locations[round].longitude].toString() : null} */}
      <ChallengeContext.Provider
        value={{
          setMode,
          round,
          totalScore,
          setTotalScore,
          locations,
          guessLocation,
          setGuessLocation,
          onContinueClick,
          onNewGameClick,
          onSummaryClick,
          guessList,
          setGuessList,
        }}
      >
        {mode === "start" && <Start setMode={setMode}></Start>}

        {mode === "play" && <Play></Play>}

        {mode === "results" && <Results></Results>}

        {mode === "summary" && <Summary></Summary>}
      </ChallengeContext.Provider>
    </div>
  );
}

export default App;
