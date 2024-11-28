import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useLocation } from "react-router-dom";
import NavBar from "./NavBar";
import ChallengeCard from "./ChallengeCard";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    flexGrow: 1,
    backgroundColor: "#303030",
    "& body": {
      backgroundColor: "#303030",
    },
  },

  cardsContainer: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      width: "100%",
      "@media (min-width: 800px)": {
        width: "calc(50% - 16px)",
      },
    },
  },
}));

function Start({ challengeInfo }) {
  const classes = useStyles();
  const location = useLocation();

  const isRandomChallenge = location.pathname.endsWith("/challenge/random");

  return (
    <div className={classes.root}>
      <NavBar />

      {challengeInfo ? (
        <div className={classes.cardsContainer}>
          <ChallengeCard
            challengeInfo={challengeInfo}
            page={"landing"}
          />
        </div>
      ) : isRandomChallenge ? (
        <p>Loading random challenge...</p>
      ) : (
        <p>Challenge not found</p>
      )}
    </div>
  );
}

export default Start;
