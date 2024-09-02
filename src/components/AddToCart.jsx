import React, { useContext, useCallback, useMemo } from "react";
import {
  Button,
  ButtonGroup,
  Tooltip,
  Stack,
  IconButton,
  useMediaQuery,
  useTheme
} from "@mui/material";

import { useStore } from "../store/productsStore";
import ArrowDropUpRounded from "@mui/icons-material/ArrowDropUpRounded";
import ArrowDropDownRounded from "@mui/icons-material/ArrowDropDownRounded";

const AddToCart = React.memo(({ order, arrowButtons = false }) => {
  const products = useStore((state) => state.products);
  const cart = useStore((state) => state.cart);
  const addToCart = useStore((state) => state.addToCart);

  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.up("xs"));
  const tablet = useMediaQuery(theme.breakpoints.up("sm"));
  const desktop = useMediaQuery(theme.breakpoints.up("md"));

  const sizes = () => {
    if (desktop) return "medium";
    if (tablet) return "small";
    if (mobile) return "medium";
  };

  const orderInCart = useMemo(
    () => cart.find((object) => object.id === order.id),
    [cart, order.id]
  );

  // Memoize button states to avoid unnecessary re-renders
  const product = products.find((product) => product.id == order.id);
  const isDisabled = useMemo(() => product.inStock < 1, [product.inStock]);

  return (
    <Tooltip
      placement='top'
      title={
        product.inStock ? `${product.inStock} in stock` : "stock is empty"
      }>
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
            disabled={isDisabled}
            onClick={() => addToCart(order.id)}>
            <ArrowDropUpRounded />
          </IconButton>
          <IconButton size='small' onClick={() => addToCart(order.id, -1)}>
            <ArrowDropDownRounded />
          </IconButton>
        </Stack>
      ) : (
        <ButtonGroup size={sizes()} variant='contained'>
          {orderInCart ? (
            <Button onClick={() => addToCart(order.id, -1)}>-</Button>
          ) : null}

          <Button
            sx={{
              whiteSpace: "nowrap",
              fontSize: {
                sm: "0.7rem"
              }
            }}
            disabled={isDisabled}
            color={orderInCart ? "secondary" : "primary"}
            variant='contained'
            onClick={() => addToCart(order.id)}>
            Add to Cart
          </Button>
          {orderInCart ? (
            <Button disabled={isDisabled} onClick={() => addToCart(order.id)}>
              +
            </Button>
          ) : null}
        </ButtonGroup>
      )}
    </Tooltip>
  );
});
export default AddToCart;
