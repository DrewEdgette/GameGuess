import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import NavBar from "./NavBar";

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

function Home() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <NavBar></NavBar>
      
      <div className={classes.cardsContainer}>
        <Card className={classes.card}>
          <CardActionArea component={Link} to="/skyrim">
            <CardMedia
              className={classes.media}
              image={require("../images/skyrim2.jpg")}
              title="All Locations"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Skyrim
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        
      </div>
    </div>
  );
}

export default Home;
