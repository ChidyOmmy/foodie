import { useTheme } from "@mui/material/styles";
import {
  Box,
  Card,
  CardActions,
  CardMedia,
  Typography,
  Stack,
  Skeleton,
  ImageListItem
} from "@mui/material";
import { useState, memo, useEffect } from "react";
import { Link } from "react-router-dom";
import AddToCart from "./AddToCart";

import Ratings from "./Ratings";
import PurchasedBox from "./PurchasedBox";

const MealCard = memo(({ purchased, meal }) => {
  const theme = useTheme();
  const [loaded, setLoaded] = useState(true);
  useEffect(() => console.log("MealCard mounted", meal.id), [meal]);

  return (
    <ImageListItem>
      <Card sx={{ maxWidth: "100%" }}>
        <Stack
          direction='row'
          sx={{
            zIndex: 2,
            justifyContent: "space-between",
            position: "absolute",
            bottom: 52,
            [theme.breakpoints.down("sm")]: {
              bottom: 60
            },
            width: "100%",
            backgroundImage:
              "linear-gradient(to top, rgba(0,0,0,0.2), rgba(0,0,0,0.1))"
          }}>
          <Typography
            sx={{
              color: "#fff",
              fontWeight: "900"
            }}
            variant='h6'>
            {meal.title}{" "}
          </Typography>
          <Ratings meal={meal} />
        </Stack>
        {loaded ? (
          <Link to={`product/${meal.id}`}>
            <CardMedia
              component='img'
              onLoad={() => setLoaded(true)}
              loading='lazy'
              src={`http://localhost:8000/${meal.image}`}
              alt='image of food'
              height={410}
              sx={{
                maxWidth: "100%",
                cursor: "pointer"
              }}
            />
          </Link>
        ) : (
          <Skeleton
            sx={{ backgroundColor: "#ccc", maxWidth: "100%" }}
            animation='wave'
            variant='rectangular'
            height={410}
          />
        )}

        <CardActions
          sx={{
            display: "flex",
            justifyContent: "space-between",
            whiteSpace: "nowrap",
            backgroundColor: theme.palette.secondary.main
          }}>
          {purchased > 0 && <PurchasedBox purchased={purchased} />}
          <Box>
            <Typography sx={{ color: "#fff", fontWeight: 500 }}>
              TZS {meal.price}
            </Typography>
          </Box>
          <AddToCart order={meal} />
        </CardActions>
      </Card>
    </ImageListItem>
  );
});
export default MealCard;
