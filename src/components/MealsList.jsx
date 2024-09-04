import React, { useEffect } from "react";
import { useStore } from "../store/productsStore";
import { ImageList, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MealCard from "./MealCard";

const MealsList = React.memo(({ children }) => {
  const products = useStore((state) => state.products);
  const searchType = useStore((state) => state.searchType);
  const searchTerm = useStore((state) => state.searchTerm);
  const searchProducts = useStore((state) => state.searchProducts);
  const cart = useStore((state) => state.cart);

  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.up("xs"));
  const tablet = useMediaQuery(theme.breakpoints.up("sm"));
  const desktop = useMediaQuery(theme.breakpoints.up("lg"));

  const cols = () => {
    if (desktop) return 3;
    if (tablet) return 2;
    if (mobile) return 1;
  };

  const displayList = searchProducts(searchType).length
    ? searchProducts(searchType)
    : products;

  return (
    <>
      {children}
      <ImageList
        width='100%'
        sx={{ maxWidth: "100%" }}
        variant='masonry'
        cols={cols()}
        gap={2}>
        {displayList.map((menu) => (
          <MealCard
            key={menu.id}
            purchased={
              cart.find((object) => object.id === menu.id)
                ? cart.find((object) => object.id === menu.id).quantity
                : 0
            }
            meal={menu}
          />
        ))}
      </ImageList>
    </>
  );
});

export default MealsList;
