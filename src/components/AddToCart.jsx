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

  /**
   * Updates the inStock value for a specific item in the list.
   *
   * @param {Array} list - The array of menu items to update.
   * @param {string} operation - The operation to perform ("add" or "minus").
   * @returns {Array} A new list with the updated inStock value for the matching item.
   */
  function changeInStock(list, operation) {
    return list.map((menu) =>
      menu.title === order.title
        ? {
            ...menu,
            inStock: menu.inStock + operation
          }
        : menu
    );
  }

  /**
   * Updates the userData and menulist based on the operation (add or reduce).
   *
   * @param {number} operation - The change in the purchased count (1 for add, -1 for reduce).
   * @param {number} inStockChange - The change in the inStock value (-1 for add, +1 for reduce).
   */
  const updateUserData = (operation, inStockChange) => {
    console.time("UpdateUserData");
    const orderId = order.id;

    // Update the inStock value in userData.searchResults
    const returnedList = changeInStock(userData.searchResults, inStockChange);

    // Find if the current order is already in the cart
    const orderInCart = userData.cart.find((object) => object.id === orderId);

    if (orderInCart) {
      const index = userData.cart.indexOf(orderInCart);

      // If the order is in the cart, update its inStock and purchased values
      setUserData(() => {
        const updatedCart = userData.cart.map((object) =>
          object.id === orderId
            ? {
                ...orderInCart,
                inStock: orderInCart.inStock + inStockChange,
                purchased: userData.cart[index].purchased + operation
              }
            : object
        );

        return {
          ...userData,
          cart:
            operation === -1 && orderInCart.purchased === 1
              ? updatedCart.filter((object) => object.id !== orderId) // Remove item if purchased count reaches 0
              : updatedCart,
          searchResults: returnedList
        };
      });
    } else if (operation === 1) {
      // If the order is not in the cart and it's an add operation, add it to the cart
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
          ],
          searchResults: returnedList
        };
      });
    }

    // Update the inStock value in menulist
    console.time("changeInStock");
    setMenulist(changeInStock(menulist, inStockChange));
    console.timeEnd("changeInStock");

    console.timeEnd("UpdateUserData");
  };

  /**
   * Adds the current order to the user's cart.
   * Decreases the inStock value by 1.
   */
  const addOrder = () => updateUserData(1, -1);

  /**
   * Reduces the quantity of the current order in the user's cart.
   * Increases the inStock value by 1. If the purchased count is 1, removes the order from the cart.
   */
  const reduceOrder = () => updateUserData(-1, 1);

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
