import React, { useContext, useEffect } from "react";
import TableContainer from "@mui/material/TableContainer";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AddToCart from "./AddToCart";

import { UserContext, MenuContext } from "../App";

const CartTable = () => {
  const [userData, setUserData] = useContext(UserContext);
  const totalprice = () => {
    if (!Array.isArray(userData.cart)) {
    console.error("cart is not an array");
    return 0;
  }

  return userData.cart.reduce((total, item) => {
    if (typeof item.total === "function") {
      return total + item.total();
    } else {
      console.warn("item does not have a total method");
      return total;
    }
  }, 0);
};
  return (
    <TableContainer sx={{ width: 540, maxWidth: "100%" }} component={Paper}>
      {totalprice() !== 0 ? (
        <Table sx={{ maxWidth: "100%" }} size='small' aria-label='Cart table'>
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
                    src={`http://localhost:8000/${order.image}`}
                  />
                </TableCell>
                <TableCell>{order.title}</TableCell>
                <TableCell sx={{ textAlign: "right" }}>
                  {order.purchased}
                </TableCell>
                <TableCell>
                  <AddToCart order={order} arrowButtons={true} />
                </TableCell>
                <TableCell sx={{ textAlign: "right" }}>{order.price}</TableCell>
                <TableCell sx={{ textAlign: "right" }}>
                  {order.total()}
                </TableCell>
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
      ) : (
        <Typography>
          No item in cart yet. View some products and add them in cart to see
          them here.
        </Typography>
      )}
    </TableContainer>
  );
};

export default CartTable;
