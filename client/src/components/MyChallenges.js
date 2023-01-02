import React, {useState, useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import NavBar from "./NavBar";
import ChallengeCard from "./ChallengeCard";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    flexGrow: 1,
    backgroundColor: "#424242",
    "& body": {
      backgroundColor: "#424242",
    },
  },
  card: {
    width: "100%",
    maxWidth: 400,
    margin: theme.spacing(2),
  },
  media: {
    height: 200,
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

function MyChallenges() {
  const [challengesInfo, setChallengesInfo] = useState([]);
  const classes = useStyles();

  const fetchChallengesInfo = async () => {
    const id = "5376df23-8abe-11ed-939e-00d861e59489";
  
    const response = await fetch(`http://localhost:8000/challenges/${id}`);
    const json = await response.json();
    
    setChallengesInfo(json);
  }

  useEffect(() => {
    fetchChallengesInfo();
  }, [])

  return (
    <div className={classes.root}>
      <NavBar></NavBar>

      <div className={classes.cardsContainer}>
        {challengesInfo ? challengesInfo.map((challenge) => {
          return (<ChallengeCard classes={classes} challengeInfo={challenge}></ChallengeCard>)
        }) : null}
      </div>
    </div>
  );
}

export default MyChallenges;
