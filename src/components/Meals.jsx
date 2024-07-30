import { useContext } from "react";
import { Box, ImageList, ImageListItem, Typography } from "@mui/material";
import MealCard from "./MealCard";
import { MenuContext, UserContext } from "../App";

const Meals = () => {
  const [menulist, setMenuList] = useContext(MenuContext);
  const [userData, setuserData] = useContext(UserContext);
  return (
    <Box sx={{ padding: 0, marginTop: 10 }}>
      <Typography variant='h5'>Favorable,this time of the year</Typography>
      <ImageList width='100%' variant='masonry' cols={3} gap={2}>
        {menulist.map((menu) => (
          <ImageListItem key={menu.image}>
            <MealCard
              purchased={
                userData.cart[menu.title]
                  ? userData.cart[menu.title].purchased
                  : 0
              }
              meal={menu}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
};
export default Meals;
