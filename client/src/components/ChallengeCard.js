import React, { useContext } from "react";
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

function ChallengeCard({ challengeInfo, classes, page }) {
  const { setMode } = useContext(ChallengeContext);

  return (
    <Card className={classes.card}>
      <CardActionArea component={Link} to={`/skyrim/challenge/${challengeInfo.id}`}>
        <CardMedia
          className={classes.media}
          image={challengeInfo ? challengeInfo.url : null}
          title={challengeInfo ? challengeInfo.name : null}
          style={{filter: "blur(5px)"}}
          
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {challengeInfo ? challengeInfo.name : "Map Title"}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {challengeInfo ? challengeInfo.description : "Map Description"}
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
