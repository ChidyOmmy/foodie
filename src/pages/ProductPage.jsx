import { useContext } from "react";
import {
  Button,
  Box,
  Stack,
  Typography,
  TextField,
  Avatar,
  useMediaQuery
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useStore } from "../store/productsStore";

import { useTheme } from "@mui/material/styles";
import MealCardLarge from "../components/MealCardLarge";
import Ratings from "../components/Ratings";
import { stringAvatar } from "./../components/StringAvatar";

const ProductPage = () => {
  const products = useStore((state) => state.products);
  const cart = useStore((state) => state.cart);

  const { userData } = useContext(UserContext);
  const params = useParams();
  const theme = useTheme();

  const mobile = useMediaQuery(theme.breakpoints.up("xs"));
  const tablet = useMediaQuery(theme.breakpoints.up("sm"));
  const desktop = useMediaQuery(theme.breakpoints.up("lg"));

  const direction = () => {
    if (desktop) return "row";
    if (tablet) return "row";
    if (mobile) return "column";
  };

  const menu = products.find((object) => object.id === parseInt(params.id));

  const navigate = useNavigate(-1);
  return (
    <Box
      sx={{
        marginTop: 5,
        marginBottom: 5,
        display: "flex",
        flexDirection: "row",
        width: "80%",
        [theme.breakpoints.down("sm")]: {
          width: "100%",
          maxWidth: "100%",
          minWidth: "100%"
        }
      }}>
      <Box>
        <Button onClick={() => navigate(-1)}> Go back</Button>

        <MealCardLarge
          purchased={
            cart.find((object) => object.id === menu.id)
              ? cart.find((object) => object.id === menu.id).purchased
              : 0
          }
          meal={menu}
        />
        <Stack mt={2} direction='row' justifyContent='space-between'>
          <Stack direction='column'>
            <Ratings meal={menu} />
            <Typography> {menu.ratings} Stars </Typography>
          </Stack>
          <Typography>340 Reviews </Typography>
        </Stack>
        <Stack mt={2} direction='column'>
          <Stack direction='row' spacing={2} alignItemsItems='flex-end' mb={2}>
            <Avatar
              {...stringAvatar(`${userData.first} ${userData.last}`, 45)}
            />
            <Typography>{`${userData.first} ${userData.last}`}</Typography>
          </Stack>
          <TextField
            sx={{ maxWidth: "100%" }}
            mt={2}
            placeholder='Leave a comment'
          />
          <Ratings meal={menu} />
          <Stack direction='column' mt={5}>
            <Stack direction='row' justifyContent='space-between'>
              <Stack direction='row' spacing={1} alignItems='center'>
                <Avatar>K</Avatar>
                <Typography>Average Meal Enjoyer</Typography>
              </Stack>
              <Stack direction={direction()} alignItems='center'>
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
