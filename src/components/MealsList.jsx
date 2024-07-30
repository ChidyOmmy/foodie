import { useContext } from "react";
import { UserContext } from "../App";

import { ImageListItem, ImageList } from "@mui/material";
import MealCard from "./MealCard";

const MealsList = ({ list }) => {
  const [userData, setuserData] = useContext(UserContext);

  return (
    <ImageList width='100%' variant='masonry' cols={3} gap={2}>
      {list.map((menu) => (
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
  );
};

export default MealsList;
