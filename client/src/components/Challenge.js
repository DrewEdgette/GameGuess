import Start from "./Start";
import Play from "./Play";
import Results from "./Results";
import Summary from "./Summary";
import L from "leaflet";
import { useEffect, useState, useContext } from "react";
import { ChallengeContext } from "../contexts/ChallengeContext";
import { useParams } from "react-router-dom";
import { LoginContext } from "../contexts/LoginContext";
import { useNavigate } from 'react-router-dom';

function Challenge() {
  const ORIGIN = new L.LatLng(0, 0);
  const [mode, setMode] = useState("start");
  const [round, setRound] = useState(0);
  const [locations, setLocations] = useState([]);
  const [guessLocation, setGuessLocation] = useState(ORIGIN);
  const [guessList, setGuessList] = useState([]);
  const [totalScore, setTotalScore] = useState(0);
  const [challengeInfo, setChallengeInfo] = useState(null);

  const { id } = useParams();

  const { isLoggedIn } = useContext(LoginContext);
  const navigate = useNavigate();

  const fetchChallengeInfo = async () => {
    const response = await fetch(`http://localhost:8000/check/${id}`);
    const json = await response.json();

    setChallengeInfo(json[0]);
  };

  const fetchLocations = async () => {
    const response = await fetch(`http://localhost:8000/${id}`);
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
    if (!isLoggedIn) {
      navigate("/login");
    }

    fetchLocations();
    fetchChallengeInfo();
  }, [isLoggedIn]);

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
          {mode === "start" && (
            <Start setMode={setMode} challengeInfo={challengeInfo}></Start>
          )}

          {mode === "play" && <Play></Play>}

          {mode === "results" && <Results></Results>}

          {mode === "summary" && <Summary></Summary>}
      </ChallengeContext.Provider>
    </div>
  );
}

export default Challenge;
