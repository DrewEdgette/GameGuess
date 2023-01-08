import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import NavBar from "./NavBar";
import ChallengeCard from "./ChallengeCard";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    flexGrow: 1,
    backgroundColor: "#424242",
    "& body": {
      backgroundColor: "#424242",
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

  return (
    <div className={classes.root}>
      <NavBar></NavBar>

      {challengeInfo ? (
        <div className={classes.cardsContainer}>
          <ChallengeCard
            challengeInfo={challengeInfo}
            page={"landing"}
          ></ChallengeCard>
        </div>
      ) : (
        <p>challenge not found</p>
      )}
    </div>
  );
}

export default Start;
