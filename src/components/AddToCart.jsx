import { Button, ButtonGroup } from "@mui/material";
import { useContext } from "react";
import { UserContext, MenuContext } from "../App";

const AddToCart = ({ order }) => {
  const orderTitle = order.title;
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
    const returnedList = changeInStock(userData.searchResults, "minus");
    if (userData.cart[orderTitle]) {
      setUserData(() => {
        return {
          ...userData,
          cart: {
            ...userData.cart,
            [orderTitle]: {
              ...userData.cart[orderTitle],
              purchased: userData.cart[orderTitle].purchased + 1
            }
          },
          searchResults: returnedList
        };
      });
    } else {
      setUserData(() => {
        return {
          ...userData,
          cart: {
            ...userData.cart,
            [orderTitle]: {
              price: order.price,
              purchased: 1,
              total: function () {
                return this.price * this.purchased;
              }
            }
          },
          searchResults: returnedList
        };
      });
    }

    setMenulist(changeInStock(menulist, "minus"));
    console.log("userData", userData);
  };
  const reduceOrder = () => {
    const returnedList = changeInStock(userData.searchResults, "minus");
    if (userData.cart[orderTitle]) {
      if (userData.cart[orderTitle].purchased <= 1) {
        let newCart = userData.cart;
        delete newCart[orderTitle];
        setUserData({
          ...userData,
          cart: newCart,
          searchResults: returnedList
        });
      } else {
        setUserData({
          ...userData,
          cart: {
            ...userData.cart,
            [orderTitle]: {
              ...userData.cart[orderTitle],
              purchased: userData.cart[orderTitle].purchased - 1
            }
          },
          searchResults: returnedList
        });
      }
      setMenulist(changeInStock(menulist, "add"));
    }
  };

  return (
    <ButtonGroup variant='contained'>
      {userData.cart[orderTitle] ? (
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
        color={userData.cart[orderTitle] ? "secondary" : "primary"}
        variant='contained'
        onClick={() => addOrder()}>
        Add To Cart
      </Button>
      {userData.cart[orderTitle] ? (
        <Button
          disabled={order.inStock < 1 ? true : false}
          onClick={() => {
            addOrder();
            console.log("in order stock", order.inStock);
          }}>
          +
        </Button>
      ) : (
        <></>
      )}
    </ButtonGroup>
  );
};

export default AddToCart;
