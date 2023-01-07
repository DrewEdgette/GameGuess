import React from "react";
import AllMap from "./AllMap";
import SmallPannellum from "./SmallPannellum";
import { useState, useEffect, useContext } from "react";
import { v4 as uuid } from "uuid";
import { LoginContext } from "../contexts/LoginContext";
import { useNavigate } from "react-router-dom";
import { Button, FormControl, InputLabel, Input } from "@material-ui/core";

function Create() {
  const [locations, setLocations] = useState([]);
  const [currentLocation, setCurrentLocation] = useState("");
  const [locationList, setLocationList] = useState([]);

  const { isLoggedIn, loginName, loginID } = useContext(LoginContext);
  const navigate = useNavigate();

  const [mapName, setMapName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }

    fetchAllLocations();
  }, [isLoggedIn]);

  const fetchAllLocations = async () => {
    const response = await fetch("http://localhost:8000/all");
    const locationList = await response.json();

    setLocations(locationList);
  };

  const utf8_to_b64 = (str) => {
    return window.btoa(unescape(encodeURIComponent(str))).slice(0, 12);
  };

  const createChallenge = async (event) => {
    event.preventDefault();

    let check = [];
    let uniqueID;

    while (true) {
      uniqueID = utf8_to_b64(uuid());
      const response = await fetch(`http://localhost:8000/check/${uniqueID}`);
      check = await response.json();
      if (check.length === 0) {
        break;
      }
    }

    const response = await fetch("http://localhost:8000/create", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uniqueID: uniqueID,
        ids: locationList.map((location) => location.id),
        mapName: mapName,
        description: description,
        creator: loginName,
        creator_id: loginID,
      }),
    });

    const result = await response.json();
    if (result.success) {
      console.log("create challenge successfull");
      navigate(`/skyrim/challenge/${uniqueID}`);
    } else {
      // TODO: display an error message
    }
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
    <div>
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
        <Button
          variant="contained"
          color="primary"
          onClick={() => addLocation(currentLocation)}
        >
          Add Location
        </Button>
        <br />
        <br />
        <Button
          variant="contained"
          color="secondary"
          onClick={() => removeLocation(currentLocation)}
        >
          Remove Location
        </Button>
      </div>
      locationList:{" "}
      {locationList
        ? locationList.map((location) => location.id).toString()
        : null}
      <form onSubmit={createChallenge}>
        <FormControl>
          <InputLabel htmlFor="mapname">Map Name:</InputLabel>
          <Input id="mapname" name="mapname" onChange={(event) => setMapName(event.target.value)}/>
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="lname">Description:</InputLabel>
          <Input id="description" name="description" onChange={(event) => setDescription(event.target.value)}/>
        </FormControl>
        {locationList.length === 5 && mapName.length > 0 && description.length > 0 ? (
          <Button variant="contained" color="primary" type="submit">
            Create Challenge
          </Button>
        ) : null}
      </form>
    </div>
  );
}

export default Create;
