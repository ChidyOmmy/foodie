import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Stack,
  Box,
  useTheme
} from "@mui/material";

const PayCard = ({ payNumber, color, title, name }) => {
  // Split the number into an array of digits
  const digits = payNumber.split("");
  const theme = useTheme();
  return (
    <Card
      sx={{
        backgroundColor: color,
        width: 250,
        margin: "0 auto",
        padding: 5,
        [theme.breakpoints.down("xs")]: {
          width: "100%",
          maxWidth: "100",
          boxSizing: "border-box"
        },
        [theme.breakpoints.down("sm")]: {
          width: "50%",
          boxSizing: "border-box"
        }
      }}>
      <CardContent>
        <Typography variant='h6' sx={{ color: "white" }}>
          {title}
        </Typography>

        {/* Digit boxes */}
        <Stack
          direction='row'
          justifyContent='center'
          alignItems='center'
          spacing={1}
          sx={{ marginTop: "10px" }}>
          {digits.map((digit, index) => (
            <Box
              key={index}
              sx={{
                backgroundColor: "white",
                padding: "10px",
                borderRadius: "4px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "40px",
                height: "40px"
              }}>
              <Typography variant='h5' sx={{ color: "black" }}>
                {digit}
              </Typography>
            </Box>
          ))}
        </Stack>
      </CardContent>
      <CardActions>
        <Stack direction='column'>
          <Typography variant='body2' sx={{ color: "white" }}>
            NAME:
          </Typography>
          <Typography variant='h6' sx={{ color: "white" }}>
            {name}
          </Typography>
        </Stack>
      </CardActions>
    </Card>
  );
};

export default PayCard;
