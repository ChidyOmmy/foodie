import { useContext } from "react";
import {
  Button,
  Box,
  Stack,
  Typography,
  TextField,
  Avatar
} from "@mui/material";
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
        flexDirection: "row",
        width: "80%"
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
        <Stack mt={2} direction='column'>
          <Stack direction='row' spacing={2} alignItemsItems='center' mb={2}>
            <Avatar>M</Avatar>
            <Typography>Guest(Anonymous)</Typography>
          </Stack>
          <TextField mt={2} placeholder='Leave a comment' />
          <Ratings meal={menu} />
          <Stack direction='column' mt={5}>
            <Stack direction='row' justifyContent='space-between'>
              <Stack direction='row' spacing={1} alignItems='center'>
                <Avatar>K</Avatar>
                <Typography>Average Meal Enjoyer</Typography>
              </Stack>
              <Stack direction='row' alignItems='center'>
                <Typography> {menu.ratings} Stars </Typography>
                <Ratings meal={menu} />
              </Stack>
            </Stack>
            <Typography>
              This is my favorite dish and it's well cooked in here. the
              delivery was on time and the food came hot so 5 Stars
            </Typography>
          </Stack>
          <Typography sx={{ alignSelf: "flex-end" }}>
            ...more reviews
          </Typography>
        </Stack>
        <Stack direction='row' spacing={5}>
          <Button variant='contained' onClick={() => navigate("/checkout")}>
            Checkout Now
          </Button>
          <Button
            onClick={() => navigate("/")}
            color='secondary'
            variant='outlined'>
            View More Orders
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default ProductPage;
