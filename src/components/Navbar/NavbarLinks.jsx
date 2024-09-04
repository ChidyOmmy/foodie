import React, { useContext, lazy, Suspense, useCallback } from "react";
import { Stack, Button, Avatar, useTheme, Badge } from "@mui/material";
import { NavLink } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DropdownMenu from "../DropdownMenu";
import { stringAvatar } from "../StringAvatar";
import { UserContext } from "../../context/UserContext";
import { useStore } from "../../store/productsStore";

const CartDialog = lazy(() => import("../CartDialog"));

const NavbarLinks = () => {
  const cart = useStore((state) => state.cart);
  const theme = useTheme();
  const { userData } = useContext(UserContext);

  const showTotal = useCallback(() => {
    let totalPurchases = 0;
    let i = 0;
    while (i < cart.length) {
      totalPurchases = totalPurchases + cart[i].quantity;
      i++;
    }
    return totalPurchases;
  });
  return (
    <>
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
          <Suspense fallback={<div>Loading...</div>}>
            <CartDialog />
          </Suspense>
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
    </>
  );
};

export default NavbarLinks;
