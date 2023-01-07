import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import NavBar from "./NavBar";
import ChallengeCard from "./ChallengeCard";
import Button from "@material-ui/core/Button";

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
  loadMoreButton: {
    display: "flex",
    justifyContent: "center",
  },
}));

function Top() {
  const [challengesInfo, setChallengesInfo] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const classes = useStyles();

  const fetchChallengesInfo = async (page) => {
    // Calculate the OFFSET value based on the current page number
    const offset = (page - 1) * 8;

    const response = await fetch(
      `http://localhost:8000/topchallenges/?limit=8&offset=${offset}`
    );
    const json = await response.json();
    console.log(json);

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

export default Top;
