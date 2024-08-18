import React, { useContext, useCallback, useMemo } from "react";
import { Button, ButtonGroup, Tooltip, Stack, IconButton } from "@mui/material";
import { UserContext } from "../context/UserContext";
import { MenuContext } from "../context/MenuContext";
import ArrowDropUpRounded from "@mui/icons-material/ArrowDropUpRounded";
import ArrowDropDownRounded from "@mui/icons-material/ArrowDropDownRounded";

const AddToCart = React.memo(({ order, arrowButtons = false }) => {
  const { userData, setUserData } = useContext(UserContext);
  const { menulist, setMenulist } = useContext(MenuContext);

  /**
   * Updates the inStock value for a specific item in the list.
   *
   * @param {Array} list - The array of menu items to update.
   * @param {number} operation - The operation to perform (+1 for add, -1 for minus).
   * @returns {Array} A new list with the updated inStock value for the matching item.
   */
  const changeInStock = useCallback(
    (list, operation) => {
      return list.map((menu) =>
        menu.title === order.title
          ? {
              ...menu,
              inStock: menu.inStock + operation
            }
          : menu
      );
    },
    [order.title]
  );

  /**
   * Updates the userData and menulist based on the operation (add or reduce).
   *
   * @param {number} operation - The change in the purchased count (1 for add, -1 for reduce).
   * @param {number} inStockChange - The change in the inStock value (-1 for decrease, +1 for increase).
   */

  const updateUserData = useCallback(
    (operation, inStockChange) => {
      console.time("TheEntireUpdateFn");
      const orderId = order.id;

      // Memoize the returnedList based on userData.searchResults and inStockChange
      const returnedList = changeInStock(userData.searchResults, inStockChange);

      // Find if the current order is already in the cart
      const orderInCart = userData.cart.find((object) => object.id === orderId);

      if (orderInCart) {
        // If the order is in the cart, update its inStock and purchased values
        setUserData((prevUserData) => {
          const updatedCart = prevUserData.cart.map((object) =>
            object.id === orderId
              ? {
                  ...object,
                  inStock: object.inStock + inStockChange,
                  purchased: object.purchased + operation
                }
              : object
          );
          return {
            ...prevUserData,
            cart:
              operation === -1 && orderInCart.purchased === 1
                ? updatedCart.filter((object) => object.id !== orderId) // Remove item if purchased count reaches 0
                : updatedCart,
            searchResults: returnedList
          };
        });
      } else if (operation === 1) {
        // If the order is not in the cart and it's an add operation, add it to the cart
        setUserData((prevUserData) => ({
          ...prevUserData,
          cart: [
            ...prevUserData.cart,
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
        }));
      }

      // Update the inStock value in menulist
      setMenulist(changeInStock(menulist, inStockChange));
      console.timeEnd("TheEntireUpdateFn");
    },
    [changeInStock, menulist, order, userData]
  );

  // Memoize the orderInCart to avoid re-calculating on every render

  const orderInCart = useMemo(
    () => userData.cart.find((object) => object.id === order.id),
    [userData.cart, order.id]
  );

  // Memoize button states to avoid unnecessary re-renders
  const isDisabled = useMemo(() => order.inStock < 1, [order.inStock]);

  // Memoize the handlers to avoid re-creating them on every render
  const addOrder = useCallback(() => updateUserData(1, -1), [updateUserData]);
  const reduceOrder = useCallback(
    () => updateUserData(-1, 1),
    [updateUserData]
  );

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
          <IconButton size='small' disabled={isDisabled} onClick={addOrder}>
            <ArrowDropUpRounded />
          </IconButton>
          <IconButton size='small' onClick={reduceOrder}>
            <ArrowDropDownRounded />
          </IconButton>
        </Stack>
      ) : (
        <ButtonGroup variant='contained'>
          {orderInCart ? <Button onClick={reduceOrder}>-</Button> : null}

          <Button
            disabled={isDisabled}
            color={orderInCart ? "secondary" : "primary"}
            variant='contained'
            onClick={addOrder}>
            Add To Cart
          </Button>
          {orderInCart ? (
            <Button disabled={isDisabled} onClick={addOrder}>
              +
            </Button>
          ) : null}
        </ButtonGroup>
      )}
    </Tooltip>
  );
});
export default AddToCart;
