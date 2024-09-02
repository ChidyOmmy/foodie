import { memo, useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import { debounce, Grow } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import BaseNavbar from "./BaseNavbar";

const Navbar = () => {
  const [navbgcolor, setNavbgcolor] = useState("inherit");
  const [navDisplay, setNavDisplay] = useState(true);
  const [previousScroll, setPreviousScroll] = useState(() => window.scrollY);
  const theme = useTheme();

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
        <BaseNavbar />
      </AppBar>
    </Grow>
  );
};
export default Navbar;
