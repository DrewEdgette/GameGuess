import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import { useContext } from "react";
import { LoginContext } from "../contexts/LoginContext";

function AccountMenu() {
    const { logout } = useContext(LoginContext);

  return (
    <div>
      <NavBar></NavBar>

      <List component="nav" aria-label="main account menu">
        <ListItem button component={Link} to="/mychallenges">
          <ListItemIcon></ListItemIcon>
          <ListItemText primary="My Challenges" />
        </ListItem>
        <ListItem button component={Link} to="/leaderboards">
          <ListItemIcon></ListItemIcon>
          <ListItemText primary="Leaderboards" />
        </ListItem>
        <ListItem button component={Link} to="/settings">
          <ListItemIcon></ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
        <ListItem button  onClick={logout} component={Link} to="/">
          <ListItemIcon></ListItemIcon>
          <ListItemText primary="Sign Out" />
        </ListItem>
      </List>
    </div>
  );
}

export default AccountMenu;
