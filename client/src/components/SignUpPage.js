import React, { useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import NavBar from "./NavBar";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));


function SignUpPage() {
  const classes = useStyles();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleConfirmPasswordChange(event) {
    setConfirmPassword(event.target.value);
  }

  const validateUsername = (username) => {
    return true;
  };

  const validatePassword = (password) => {
    return true;
  };

  async function handleSubmit(event) {
    event.preventDefault();

    // Validate the form inputs
    if (
      !validateUsername(username) ||
      !validatePassword(password) ||
      password !== confirmPassword
    ) {
      return;
    }

    // Send a request to the server to sign up
    try {
      const response = await fetch("http://localhost:8000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const result = await response.json();
      if (result.success) {
        // TODO: sign the user up
      } else {
        // TODO: display an error message
      }
    } catch (error) {
      // TODO: display an error message
    }
  }

  return (
    <div>
      <NavBar></NavBar>
    <div className={classes.root}>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="outlined-adornment-username">
            Username
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-username"
            type="text"
            value={username}
            onChange={handleUsernameChange}
            labelWidth={70}
          />
        </FormControl>
        <br />
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            labelWidth={70}
          />
        </FormControl>
        <br />
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Confirm Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            labelWidth={70}
          />
        </FormControl>
        
        <br />
        <Button variant="contained" color="primary" type="submit">
          Create Account
        </Button>
      </form>
    </div>
    </div>
  );
}

export default SignUpPage;
