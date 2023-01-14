import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import { ChallengeContext } from "../contexts/ChallengeContext";
import { makeStyles } from "@material-ui/core/styles";
import FavoriteIcon from '@mui/icons-material/Favorite';

const useStyles = makeStyles((theme) => ({
  card: {
    width: "100%",
    maxWidth: "400px",
    margin: theme.spacing(2),
  },
  media: {
    height: 200,
  },
  landingCard: {
    width: "100%",
    maxWidth: "50vw",
    margin: theme.spacing(2),
  },
}));

function ChallengeCard({ challengeInfo, page }) {
  const { setMode } = useContext(ChallengeContext);
  const classes = useStyles();

  return (
    <Card className={page === "landing" ? classes.landingCard : classes.card}>
      <CardActionArea
        component={Link}
        to={`/skyrim/challenge/${challengeInfo.id}`}
      >
        <CardMedia
          className={classes.media}
          image={challengeInfo ? challengeInfo.url : null}
          title={challengeInfo ? challengeInfo.name : null}
          style={{ filter: "blur(5px)" }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {challengeInfo ? challengeInfo.name : "Map Title"}
          </Typography>

          <Typography variant="h5" color="textSecondary" component="h5">
            {challengeInfo ? challengeInfo.description : "Map Description"}
          </Typography>

          <Typography variant="body2" color="textSecondary" component="h2">
            {challengeInfo ?  new Date(challengeInfo.create_time).toLocaleString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'}) : "Create Time"}
          </Typography>

          <Typography variant="h5" color="textSecondary" component="h2">
          <FavoriteIcon/>
            {challengeInfo ? " " + challengeInfo.likes : "Likes"}
          </Typography>

          <Typography variant="h5" color="textSecondary" component="h2">
            {challengeInfo ? challengeInfo.creator : "Creator"}
          </Typography>

        </CardContent>
      </CardActionArea>
      {page === "landing" && (
        <>
          <Typography gutterBottom variant="h5" component="h2">
            <TextField
              id="url"
              label="URL"
              value={window.location.href}
              InputProps={{
                readOnly: true,
              }}
              style={{ margin: "16px" }}
            />
            <Button
              size="small"
              color="primary"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
              }}
            >
              Copy
            </Button>
          </Typography>
          <CardActions>
            <Button
              size="large"
              style={{ backgroundColor: "#4caf50", color: "white" }}
              onClick={() => setMode("play")}
            >
              Play
            </Button>
          </CardActions>
        </>
      )}
    </Card>
  );
}

export default ChallengeCard;
