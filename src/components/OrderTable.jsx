import React, { useEffect, useContext, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Collapse,
  IconButton,
  Box,
  Typography,
  Grid,
  useMediaQuery
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { green, red } from "@mui/material/colors";
import { UserContext } from "../context/UserContext";

const OrderTable = () => {
  const [orders, setOrders] = useState([]);
  const { userData } = useContext(UserContext);
  const [open, setOpen] = useState({});
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  useEffect(() => {
    fetch("http://localhost:8000/orders/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${userData.access}`, // Include the JWT token
        "Content-Type": "application/json"
      }
    })
      .then((response) => response.json())
      .then((data) => {
        const newOrders = data.map((object) => ({
          id: object.id,
          name: object.customer_name,
          mobile: object.customer_mobile,
          date: object.order_date,
          price: object.total_price,
          completed: object.is_completed,
          additionalInfo: object.additional_info,
          order_items: object.order_items // Include the order items
        }));
        setOrders(() => newOrders);
        console.log("User Orders:", data);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, []);

  const handleToggle = (index) => {
    setOpen((prevOpen) => ({ ...prevOpen, [index]: !prevOpen[index] }));
  };

  return (
    <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Order ID</TableCell>
            {!isMobile && <TableCell>Customer Name</TableCell>}
            <TableCell>Customer Mobile</TableCell>
            {!isMobile && <TableCell>Order Date</TableCell>}
            <TableCell>Total Price</TableCell>
            <TableCell>Completed</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order, index) => (
            <React.Fragment key={index}>
              <TableRow>
                <TableCell>
                  {order.order_items.length > 0 && (
                    <IconButton
                      aria-label='expand row'
                      size='small'
                      onClick={() => handleToggle(index)}>
                      {open[index] ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </IconButton>
                  )}
                </TableCell>
                <TableCell>{order.id}</TableCell>
                {!isMobile && <TableCell>{order.name}</TableCell>}
                <TableCell>{order.mobile}</TableCell>
                {!isMobile && <TableCell>{order.date}</TableCell>}
                <TableCell>{order.price}</TableCell>
                <TableCell>
                  {order.completed ? (
                    <CheckIcon sx={{ color: green[500] }} />
                  ) : (
                    <CloseIcon sx={{ color: red[500] }} />
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  style={{ paddingBottom: 0, paddingTop: 0 }}
                  colSpan={6}>
                  <Collapse in={open[index]} timeout='auto' unmountOnExit>
                    <Box margin={1} sx={{ backgroundColor: "primary.dark" }}>
                      <Typography variant='h6' gutterBottom component='div'>
                        Order Items
                      </Typography>
                      <Table size='small' aria-label='order-items'>
                        <TableHead>
                          <TableRow>
                            <TableCell>Meal</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Total Price</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {order.order_items.map((item, idx) => (
                            <TableRow key={idx}>
                              <TableCell>{item.meal.title}</TableCell>
                              <TableCell>{item.meal.price}</TableCell>
                              <TableCell>{item.quantity}</TableCell>
                              <TableCell>{item.total_price}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Box>
                  </Collapse>
                </TableCell>
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderTable;
