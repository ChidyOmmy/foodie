import React, { useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

const DropdownMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuItems = [
    { id: 1, text: "About", to: "/about" },
    { id: 2, text: "Home", to: "/" }
  ];

  return (
    <>
      <IconButton
        edge='start'
        color='inherit'
        aria-label='menu'
        onClick={handleClick}>
        <MenuIcon color='primary' />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {menuItems.map((menu) => (
          <MenuItem key={menu.id} onClick={handleClose}>
            <Link
              to={menu.to}
              style={{ textDecoration: "none", color: "inherit" }}>
              {menu.text}
            </Link>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default DropdownMenu;
