import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";

import { ImageListItem, ImageList, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MealCard from "./MealCard";

const MealsList = React.memo(({ list }) => {
  const { userData } = useContext(UserContext);
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.up("xs"));
  const tablet = useMediaQuery(theme.breakpoints.up("sm"));
  const desktop = useMediaQuery(theme.breakpoints.up("lg"));
  useEffect(() => console.log("MealsList mounted"));
  const cols = () => {
    if (desktop) return 3;
    if (tablet) return 2;
    if (mobile) return 1;
  };

  return (
    <ImageList
      width='100%'
      sx={{ maxWidth: "100%" }}
      variant='masonry'
      cols={cols()}
      gap={2}>
      {list.map((menu) => (
        <MealCard
          key={menu.id}
          purchased={
            userData.cart.find((object) => object.id === menu.id)
              ? userData.cart.find((object) => object.id === menu.id).purchased
              : 0
          }
          meal={menu}
        />
      ))}
    </ImageList>
  );
});

export default MealsList;
