import { useContext } from "react";
import { Button, Box, Stack, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { MenuContext, UserContext } from "../App";

import MealCard from "../components/MealCard";
import Ratings from "../components/Ratings";

const ProductPage = () => {
  const [menulist] = useContext(MenuContext);
  const [userData] = useContext(UserContext);
  const params = useParams();

  const menu = menulist.find((object) => object.id === parseInt(params.id));

  const navigate = useNavigate(-1);
  return (
    <Box
      sx={{
        marginTop: 5,
        marginBottom: 5,
        display: "flex",
        justifyContent: "center",
        flexDirection: "row"
      }}>
      <Box>
        <Button onClick={() => navigate(-1)}> Go back</Button>

        <MealCard
          variant='standalone'
          purchased={
            userData.cart.find((object) => object.id === menu.id)
              ? userData.cart.find((object) => object.id === menu.id).purchased
              : 0
          }
          meal={menu}
        />
        <Ratings meal={menu} />
        <Stack direction='row' justifyContent='space-between'>
          <Typography> {menu.ratings} Stars </Typography>
          <Typography>340 Reviews </Typography>
        </Stack>
      </Box>
    </Box>
  );
};

export default ProductPage;
