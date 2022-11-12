import React from "react";
import AllMap from "./AllMap";
import SmallPannellum from "./SmallPannellum";
import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";

function Create() {
  const [locations, setLocations] = useState([]);
  const [currentLocation, setCurrentLocation] = useState("");
  const [locationList, setLocationList] = useState([]);

  useEffect(() => {
    fetchAllLocations();
  }, []);

  const fetchAllLocations = async () => {
    const response = await fetch("http://localhost:8000/all");
    const locationList = await response.json();

    setLocations(locationList);
  };

  const utf8_to_b64 = (str) => {
    return window.btoa(unescape(encodeURIComponent(str))).slice(0, 12);
  };

  const createChallenge = async () => {
    let check = [];
    let uniqueID = utf8_to_b64(uuid());

    while (true) {
      uniqueID = utf8_to_b64(uuid());
      const response = await fetch(`http://localhost:8000/check/${uniqueID}`);
      check = await response.json();
      if (check.length === 0) {
        break;
      }
    }

    fetch("http://localhost:8000/create", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      //make sure to serialize your JSON body
      body: JSON.stringify({
        uniqueID: uniqueID,
        ids: locationList.map(location => location.id),
      }),
    })
  };

  const addLocation = (location) => {
    if (locationList.length < 5) {
      setLocationList([...locationList, location]);
    }
  };

  const removeLocation = (num) => {
    setLocationList(locationList.filter((element) => element !== num));
  };

  return (
    <div className="results-info">
      <AllMap
        locations={locations}
        setCurrentLocation={setCurrentLocation}
      ></AllMap>
      {currentLocation && <SmallPannellum image={currentLocation.url} />}
      <ul>
        <li>id: {currentLocation.id}</li>

        <li>latitude: {currentLocation.latitude}</li>

        <li>longitude: {currentLocation.longitude}</li>

        <li>url: {currentLocation.url}</li>
      </ul>
      <div>
        <button onClick={() => addLocation(currentLocation)}>
          Add Location
        </button>
        <br />
        <br />

        <button onClick={() => removeLocation(currentLocation)}>
          Remove Location
        </button>

        <button onClick={createChallenge}>Create Challenge</button>
      </div>
      locationList:{" "}
      {locationList
        ? locationList.map((location) => location.id).toString()
        : null}
      <form onSubmit={createChallenge}>
        <label htmlFor="mapname">Map Name:</label>
        <input type="text" id="mapname" name="mapname" />
        <label htmlFor="lname">Description:</label>
        <input type="text" id="description" name="description" />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Create;
