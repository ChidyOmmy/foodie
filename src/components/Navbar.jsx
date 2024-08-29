import { React, useContext, useState, useEffect } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import AppBar from "@mui/material/AppBar";
import {
  Badge,
  debounce,
  Grow,
  Stack,
  Button,
  Toolbar,
  Typography,
  Avatar
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { UserContext } from "../context/UserContext";
import CartDialog from "./CartDialog";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DropdownMenu from "./DropdownMenu";
import { stringAvatar } from "./StringAvatar";

export default function Navbar() {
  const { userData, setUserData, setThemeMode } = useContext(UserContext);
  const [navbgcolor, setNavbgcolor] = useState("inherit");
  const [navDisplay, setNavDisplay] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [previousScroll, setPreviousScroll] = useState(() => window.scrollY);
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => setThemeMode(isDarkMode ? "dark" : "light"), [isDarkMode]);
  useEffect(() => console.log("Navbar mounted"), []);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };
  const showTotal = () => {
    let totalPurchases = 0;
    let i = 0;
    while (i < userData.cart.length) {
      totalPurchases = totalPurchases + userData.cart[i].purchased;
      i++;
    }
    return totalPurchases;
  };

  const stickyNavbar = () => {
    if (window.scrollY > 200) {
      setNavbgcolor(theme.palette.secondary.main);
    } else {
      setNavbgcolor("inherit");
    }

    if (window.scrollY >= previousScroll) {
      setNavDisplay(false);
    } else {
      setNavDisplay(true);
    }
    setPreviousScroll(() => window.scrollY);
  };
  useEffect(() => {
    window.addEventListener("scroll", () => {
      debounce(stickyNavbar(), 600);
    });
    return () => {};
  });

  return (
    <Grow in={navDisplay}>
      <AppBar
        position='sticky'
        sx={{ backgroundColor: navbgcolor, top: 0, display: navDisplay }}>
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between" }}>
          <Stack direction='row' spacing={2} alignItems='center'>
            <Typography variant='h6' color='primary'>
              LOGO
            </Typography>
            <DarkModeSwitch
              style={{}}
              checked={isDarkMode}
              onChange={toggleDarkMode}
              size={20}
            />
          </Stack>
          <Stack
            sx={{
              marginRight: 2,
              [theme.breakpoints.down("sm")]: {
                display: "none"
              }
            }}
            direction='row'>
            <NavLink to={userData.loggedIn ? "/profile" : "/signin"}>
              <Button>{userData.loggedIn ? userData.first : "LOGIN"}</Button>
            </NavLink>
            <NavLink to='/'>
              <Button>Home</Button>
            </NavLink>
            <NavLink to='/about'>
              <Button>About</Button>
            </NavLink>
            <Badge badgeContent={showTotal()} color='primary'>
              <CartDialog />
            </Badge>
          </Stack>
          <Stack
            direction='row'
            sx={{
              [theme.breakpoints.up("sm")]: {
                display: "none"
              }
            }}>
            {userData.loggedIn ? (
              <NavLink to='/profile'>
                <Avatar
                  {...stringAvatar(`${userData.first} ${userData.last}`, 30)}
                />
              </NavLink>
            ) : (
              <NavLink to='/signin'>
                <IconButton>
                  <AccountCircleIcon color='primary' />
                </IconButton>
              </NavLink>
            )}

            <Badge badgeContent={showTotal()} color='primary'>
              <CartDialog />
            </Badge>
            <DropdownMenu />
          </Stack>
        </Toolbar>
      </AppBar>
    </Grow>
  );
}
