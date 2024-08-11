import { useTheme } from "@mui/material/styles";
import {
  Box,
  Card,
  CardActions,
  CardMedia,
  Typography,
  Stack,
  Skeleton,
  Button
} from "@mui/material";
import { useState } from "react";
import AddToCart from "./AddToCart";
import { useNavigate } from "react-router-dom";

import Ratings from "./Ratings";

const MealCard = ({ purchased, meal, variant = "default" }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [loaded, setLoaded] = useState(true);
  return (
    <>
      {variant === "standalone" ? (
        <Box>
          <Card sx={{ width: "100%", maxWidth: "100%" }}>
            <Stack
              direction='row'
              spacing={2}
              sx={{
                padding: 0,
                margin: 0,
                justifyContent: "flex-start",
                width: "100%",
                maxWidth: "100%"
              }}>
              <Box
                sx={{ width: "70%" }}
                component='img'
                alt={meal.title}
                src={`http://localhost:8000/${meal.image}`}
              />
              <Stack
                sx={{
                  width: "50%",
                  justifyContent: "space-between",
                  padding: 2
                }}
                direction='column'
                spacing={2}>
                <Stack direction='column' spacing={2}>
                  <Typography
                    variant='h5'
                    color='secondary'
                    sx={{ fontWeight: "500" }}>
                    {meal.title.toUpperCase()}
                  </Typography>
                  <Typography sx={{ fontSize: "130%" }}>
                    {" "}
                    {meal.description}
                  </Typography>
                </Stack>
                <Stack direction='column' spacing={2}>
                  <Stack
                    direction='row'
                    sx={{ justifyContent: "space-between" }}>
                    <Typography>TZS {meal.price} </Typography>
                    {purchased ? (
                      <Box
                        sx={{
                          display: "flex",
                          width: "30px",
                          height: "30px",
                          justifyContent: "center",
                          alignItems: "center",
                          padding: 0,
                          borderRadius: "25px",
                          backgroundColor: theme.palette.primary.main
                        }}>
                        <Typography
                          sx={{
                            color: "#fff",
                            margin: 0,
                            paddign: 0
                          }}
                          variant='h6'>
                          {purchased}
                        </Typography>
                      </Box>
                    ) : (
                      <></>
                    )}
                  </Stack>
                  <Stack direction='row' justifyContent='space-between'>
                    <AddToCart order={meal} />
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Card>
        </Box>
      ) : (
        <Card sx={{ maxWidth: "100%" }}>
          <Stack
            direction='row'
            sx={{
              zIndex: 2,
              justifyContent: "space-between",
              position: "absolute",
              bottom: 50,
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
            <CardMedia
              onClick={() => navigate(`product/${meal.id}`)}
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
              backgroundColor: theme.palette.secondary.main
            }}>
            {purchased ? (
              <Box
                sx={{
                  display: "flex",
                  width: "30px",
                  height: "30px",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 0,
                  borderRadius: "25px",
                  backgroundColor: theme.palette.primary.main
                }}>
                <Typography
                  sx={{
                    color: "#fff",
                    margin: 0,
                    paddign: 0
                  }}
                  variant='h6'>
                  {purchased}
                </Typography>
              </Box>
            ) : (
              <></>
            )}
            <Box>
              <Typography sx={{ color: "#fff", fontWeight: 500 }}>
                TZS {meal.price}
              </Typography>
            </Box>
            <AddToCart order={meal} />
          </CardActions>
        </Card>
      )}
    </>
  );
};

export default MealCard;
