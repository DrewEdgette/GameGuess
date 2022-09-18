import "../css/index.css";
import Start from "./Start";
import Play from "./Play";
import Results from "./Results";
import { useEffect, useState } from "react";

function App() {
  const [mode, setMode] = useState("start");
  const [round, setRound] = useState(0);
  const [locations, setLocations] = useState([]);

  const fetchLocations = async () => {
    const response = await fetch("http://localhost:8000/locations");
    const locationList = await response.json();

    setLocations(locationList);
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  return (
    <div className="App">
      {mode === "start" && (
        <Start
          onStartClick={() => {
            setMode("play");
          }}
        ></Start>
      )}
      {mode === "play" && (
        <Play
          locations={locations}
          round={round}
          onRoundEnd={() => setMode("results")}
        ></Play>
      )}
      {mode === "results" && (
        <Results
          round={round}
          locations={locations}
          onContinueClick={() => {
            setMode("play");
            setRound(round + 1);
          }}
        ></Results>
      )}
    </div>
  );
}

export default App;
