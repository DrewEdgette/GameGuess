import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import NavBar from "./NavBar";
import ChallengeCard from "./ChallengeCard";
import Button from "@material-ui/core/Button";
import { LoginContext } from "../contexts/LoginContext";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
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
  loadMoreButton: {
    display: "flex",
    justifyContent: "center",
  },
}));

function MyChallenges() {
  const [challengesInfo, setChallengesInfo] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const classes = useStyles();

  const { isLoggedIn, loginID } = useContext(LoginContext);

  const fetchChallengesInfo = async (page) => {
    const id = loginID;

    // Calculate the OFFSET value based on the current page number
    const offset = (page - 1) * 6;

    const response = await fetch(
      `http://localhost:8000/challengesbyuser/${id}?limit=6&offset=${offset}`
    );
    const json = await response.json();

    // Concatenate the new challenges with the existing challenges
    setChallengesInfo(challengesInfo.concat(json.challenges));
    setTotalPages(json.totalPages);
  };

  useEffect(() => {
    fetchChallengesInfo(page);
  }, [page]);

  const handleLoadMore = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <div className={classes.root}>
      <NavBar></NavBar>
      <div className={classes.cardsContainer}>
        {challengesInfo.map((challenge) => {
          return (
            <ChallengeCard
              classes={classes}
              challengeInfo={challenge}
              page={"mychallenges"}
            ></ChallengeCard>
          );
        })}
      </div>

      {page < totalPages ? (
        <div className={classes.loadMoreButton}>
          <Button variant="contained" onClick={handleLoadMore} color="primary">
            Load more...
          </Button>
        </div>
      ) : null}
    </div>
  );
}

export default MyChallenges;
