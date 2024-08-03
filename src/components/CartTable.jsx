import React, { useContext, useEffect } from "react";
import TableContainer from "@mui/material/TableContainer";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import TableRow from "@mui/material/TableRow";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";

import ArrowDropUpRounded from "@mui/icons-material/ArrowDropUpRounded";
import ArrowDropDownRounded from "@mui/icons-material/ArrowDropDownRounded";
import { UserContext, MenuContext } from "../App";

const CartTable = () => {
  const [userData, setUserData] = useContext(UserContext);
  const [menulist, setMenulist] = useContext(MenuContext);

  const addOrder = (order) => {
    const orderId = order.id;
    const returnedList = changeInStock(userData.searchResults, order, "minus");
    const orderInCart = userData.cart.find((object) => object.id === orderId);
    if (orderInCart) {
      const index = userData.cart.indexOf(orderInCart);
      setUserData(() => {
        return {
          ...userData,
          cart: userData.cart.map((object) =>
            object.id === orderId
              ? {
                  ...orderInCart,
                  inStock: order.inStock - 1,
                  purchased: userData.cart[index].purchased + 1
                }
              : object
          ),
          searchResults: returnedList
        };
      });
    } else {
      setUserData(() => {
        return {
          ...userData,
          cart: [
            ...userData.cart,
            {
              ...order,
              inStock: order.inStock - 1,
              purchased: 1,
              total: function () {
                return this.price * this.purchased;
              }
            }
          ]
        };
      });
      console.log("testing", userData.cart);
    }
    console.log("changed userData", userData.cart);

    setMenulist(changeInStock(menulist, order, "minus"));
  };
  const reduceOrder = (order) => {
    const orderId = order.id;
    const returnedList = changeInStock(userData.searchResults, order, "add");
    const orderInCart = userData.cart.find((object) => object.id === orderId);
    if (orderInCart) {
      const index = userData.cart.indexOf(orderInCart);
      const remainsOne = userData.cart[index].purchased === 1;
      if (remainsOne) {
        setUserData(() => {
          return {
            ...userData,
            cart: userData.cart.filter((object) => object.id !== orderId),
            searchResults: returnedList
          };
        });
      } else {
        setUserData(() => {
          return {
            ...userData,
            cart: userData.cart.map((object) =>
              object.id === orderId
                ? {
                    ...orderInCart,
                    inStock: order.inStock + 1,
                    purchased: userData.cart[index].purchased - 1
                  }
                : object
            ),
            searchResults: returnedList
          };
        });
      }
    }

    setMenulist(changeInStock(menulist, order, "add"));
  };

  function changeInStock(list, order, operation) {
    let found = list.find((menu) => menu.title === order.title);
    if (found) {
      let newlist = [...list];
      const foundIndex = newlist.indexOf(found);
      if (operation === "add") {
        found = { ...found, inStock: found.inStock + 1 };
      } else if (operation === "minus") {
        found = { ...found, inStock: found.inStock - 1 };
      }
      newlist[foundIndex] = found;
      return newlist;
    } else {
      return [];
    }
  }
  const totalprice = () => {
    let total = 0;
    let i = 0;
    while (i < userData.cart.length) {
      total = total + userData.cart[i].total();
      i++;
    }
    return total;
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ maxWidth: "100%" }} size='small' aria-label='a dense table'>
        <TableRow>
          <TableCell sx={{ fontWeight: "bold" }}></TableCell>
          <TableCell sx={{ fontWeight: "bold" }}>Title</TableCell>
          <TableCell sx={{ fontWeight: "bold" }}>Quantity</TableCell>
          <TableCell sx={{ fontWeight: "bold" }}></TableCell>
          <TableCell sx={{ fontWeight: "bold" }}>Price (each)</TableCell>
          <TableCell sx={{ fontWeight: "bold" }}>Total Price</TableCell>
        </TableRow>
        <TableBody>
          {userData.cart.map((order) => (
            <TableRow key={order.id}>
              <TableCell>
                <Box
                  alt={order.title}
                  component='img'
                  sx={{ width: "40%" }}
                  src={order.image}
                />
              </TableCell>
              <TableCell>{order.title}</TableCell>
              <TableCell sx={{ textAlign: "right" }}>
                {order.purchased}
              </TableCell>
              <TableCell>
                <Stack direction='column' spacing={0}>
                  <IconButton onClick={addOrder(order)}>
                    <ArrowDropUpRounded />
                  </IconButton>
                  <IconButton onClick={reduceOrder(order)}>
                    <ArrowDropDownRounded />
                  </IconButton>
                </Stack>
              </TableCell>
              <TableCell sx={{ textAlign: "right" }}>{order.price}</TableCell>
              <TableCell sx={{ textAlign: "right" }}>{order.total()}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>TOTAL</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell sx={{ textAlign: "right", fontWeight: "bold" }}>
              {totalprice()}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CartTable;
