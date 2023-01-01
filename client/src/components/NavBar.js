import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: "white",
    textDecoration: "none",
    "&:hover": {
      color: "cyan",
    },
  },
  button: {
    color: "white",
    "&:hover": {
      color: "cyan",
    },
  },
}));

function NavBar() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            className={classes.title}
            component={Link}
            to="/"
          >
            Skyrim Guesser
          </Typography>

          <Button className={classes.button} component={Link} to="/login">
            Sign in
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;
