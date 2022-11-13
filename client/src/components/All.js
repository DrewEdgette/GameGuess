import React from "react";
import AllMap from "./AllMap";
import { useState, useEffect } from "react";

function All() {
  const [locations, setLocations] = useState([]);
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    fetchAllLocations();
    fetchAllChallenges();
  }, []);

  const fetchAllLocations = async () => {
    const response = await fetch("http://localhost:8000/all");
    const locationList = await response.json();

    setLocations(locationList);
  };

  const fetchAllChallenges = async () => {
    const response = await fetch("http://localhost:8000/challenges");
    const challengeList = await response.json();

    setChallenges(challengeList);
  };

  return (
    <div className="results-info">
      <AllMap locations={locations}></AllMap>
      <strong>All Challenges</strong>
      {challenges.map(challenge => {return (<div>http://localhost:3000/challenge/{challenge.id} <br/></div>)})}
    </div>
  );
}

export default All;
