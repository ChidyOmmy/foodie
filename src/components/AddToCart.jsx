import { Button, ButtonGroup, Tooltip } from "@mui/material";
import { useContext } from "react";
import { UserContext, MenuContext } from "../App";
import ArrowDropUpRounded from "@mui/icons-material/ArrowDropUpRounded";
import ArrowDropDownRounded from "@mui/icons-material/ArrowDropDownRounded";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";

const AddToCart = ({ order, arrowButtons = false }) => {
  const [userData, setUserData] = useContext(UserContext);
  const [menulist, setMenulist] = useContext(MenuContext);

  function changeInStock(list, operation) {
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

  const addOrder = () => {
    const orderId = order.id;
    const returnedList = changeInStock(userData.searchResults, "minus");
    const orderInCart = userData.cart.find((object) => object.id === orderId);
    if (orderInCart) {
      console.log("order is in cart", userData);
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

    setMenulist(changeInStock(menulist, "minus"));
  };
  const reduceOrder = () => {
    const orderId = order.id;
    const returnedList = changeInStock(userData.searchResults, "add");
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

    setMenulist(changeInStock(menulist, "add"));
  };
  return (
    <Tooltip
      title={order.inStock ? `${order.inStock} in stock` : "stock is empty"}>
      {arrowButtons ? (
        <Stack
          direction='column'
          spacing={0}
          sx={{
            width: 50,
            height: 50,
            alignItems: "center",
            justifyContent: "center"
          }}>
          <IconButton
            size='small'
            disabled={order.inStock < 1 ? true : false}
            onClick={() => addOrder()}>
            <ArrowDropUpRounded />
          </IconButton>
          <IconButton size='small' onClick={() => reduceOrder()}>
            <ArrowDropDownRounded />
          </IconButton>
        </Stack>
      ) : (
        <ButtonGroup variant='contained'>
          {userData.cart.find((object) => object.id === order.id) ? (
            <Button
              onClick={() => {
                reduceOrder();
              }}>
              -
            </Button>
          ) : (
            <></>
          )}

          <Button
            disabled={order.inStock < 1 ? true : false}
            color={
              userData.cart.find((object) => object.id === order.id)
                ? "secondary"
                : "primary"
            }
            variant='contained'
            onClick={() => addOrder()}>
            Add To Cart
          </Button>
          {userData.cart.find((object) => object.id === order.id) ? (
            <Button
              disabled={order.inStock < 1 ? true : false}
              onClick={() => {
                addOrder();
              }}>
              +
            </Button>
          ) : (
            <></>
          )}
        </ButtonGroup>
      )}
    </Tooltip>
  );
};

export default AddToCart;
