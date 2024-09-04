import { memo, useEffect } from "react";
import { Box } from "@mui/material";
import MealsList from "./MealsList";
import Categories from "./Categories";

const Meals = memo(() => {
  console.log("Meals mounted");
  return (
    <Box sx={{ padding: 0, marginTop: 10 }}>
      <MealsList children={<Categories />} />
    </Box>
  );
});

export default Meals;
