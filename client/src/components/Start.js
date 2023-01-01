import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Card, CardContent } from "@material-ui/core";
import NavBar from "./NavBar";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
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

  button: {
    color: "black",
    "&:hover": {
      color: "cyan",
    },
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

function Start({ setMode, challengeInfo }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>

      <NavBar></NavBar>

      {challengeInfo ? (
        <div className={classes.cardsContainer}>
          <Card className={classes.card}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {challengeInfo.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {challengeInfo.description}
              </Typography>
              <Button
                className={classes.button}
                onClick={() => setMode("play")}
              >
                Play
              </Button>
            </CardContent>
          </Card>
        </div>
      ) : (
        <p>challenge not found</p>
      )}
    </div>
  );
}

export default Start;
