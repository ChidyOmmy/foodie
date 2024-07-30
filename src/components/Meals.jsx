import { useContext, useState } from "react";
import { Box, ImageList, ImageListItem, Typography } from "@mui/material";
import MealCard from "./MealCard";
import MealsList from "./MealsList";
import { MenuContext, UserContext } from "../App";

const Meals = () => {
  const [menulist, setMenuList] = useContext(MenuContext);
  const [userData, setuserData] = useContext(UserContext);
  return (
    <Box sx={{ padding: 0, marginTop: 10 }}>
      <Typography variant='h5'>Favorable,this time of the year</Typography>
      {userData.searchResults.length > 0 ? (
        <MealsList list={userData.searchResults} />
      ) : (
        <MealsList list={menulist} />
      )}
    </Box>
  );
};
export default Meals;
