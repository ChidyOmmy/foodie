import { React, useContext, useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import { Badge, debounce, Grow } from "@mui/material";
import { Toolbar, Typography, IconButton } from "@mui/material";
import { UserContext } from "../App";
import { useTheme } from "@mui/material/styles";
import ShoppingCart from "@mui/icons-material/ShoppingCart";

export default function Navbar() {
  const theme = useTheme();
  const [userData, setUserData] = useContext(UserContext);

  const showTotal = () => {
    let totalPurchases = 0;
    let i = 0;
    while (i < userData.cart.length) {
      totalPurchases = totalPurchases + userData.cart[i].purchased;
      i++;
    }
    return totalPurchases;
  };

  const [navbgcolor, setNavbgcolor] = useState("inherit");
  const [navDisplay, setNavDisplay] = useState(true);
  const [previousScroll, setPreviousScroll] = useState(() => window.scrollY);

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
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant='h6' color='primary'>
            LOGO
          </Typography>
          <Badge badgeContent={showTotal()} color='primary'>
            <IconButton>
              <ShoppingCart color='primary' />
            </IconButton>
          </Badge>
        </Toolbar>
      </AppBar>
    </Grow>
  );
}
