import React from "react";
import AllMap from "./AllMap";
import { useState, useEffect } from "react";

function Locations() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetchAllLocations();
  }, []);

  const fetchAllLocations = async () => {
    const response = await fetch("http://localhost:8000/all");
    const locationList = await response.json();

    setLocations(locationList);
  };

  return (
    <div className="results-info">
      <AllMap locations={locations}></AllMap>
    </div>
  );
}

export default Locations;
