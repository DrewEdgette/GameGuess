import React, { useState, useContext } from "react";
import { LoginContext } from "../contexts/LoginContext";
import {
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  OutlinedInput,
  Checkbox,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";

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

function LoginPage() {
  const { login, setLoginName } = useContext(LoginContext);

  const classes = useStyles();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const validateUsername = (username) => {
    return true;
  };

  const validatePassword = (password) => {
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate the username and password
    if (!validateUsername(username) || !validatePassword(password)) {
      return;
    }

    // Send a request to the server to log in
    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const result = await response.json();
      if (result.success) {
        login();
        setLoginName(username);
        console.log("log in successfull");
        navigate("/")
      } else {
        // TODO: display an error message
      }
    } catch (error) {
      // TODO: display an error message
    }
  };

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
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              labelWidth={70}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={showPassword}
                  onChange={handleClickShowPassword}
                  color="primary"
                />
              }
              label="Show password"
            />
          </FormControl>
          <br />
          <Button variant="contained" color="primary" type="submit">
            Sign in
          </Button>
        </form>

        <p>
          Don't have an account?
          <br></br>
          <Button href="/signup" variant="contained" color="secondary" type="submit">
            Create Account
          </Button>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
