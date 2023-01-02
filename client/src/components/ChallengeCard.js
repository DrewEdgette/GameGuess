import React from "react";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

function ChallengeCard({ challengeInfo, classes }) {
  return (
    <Card className={classes.card}>
      <CardActionArea component={Link} to={`/challenge/${challengeInfo.id}`}>
        <CardMedia
          className={classes.media}
          image={challengeInfo ? challengeInfo.url : null}
          title={challengeInfo ? challengeInfo.name : null}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {challengeInfo ? challengeInfo.name : "Map Title"}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {challengeInfo ? challengeInfo.description : "Map Description"}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ChallengeCard;
