import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Stack,
  Box
} from "@mui/material";

const VodacomPayCard = () => {
  // Split the number into an array of digits
  const digits = "555555".split("");

  return (
    <Card
      sx={{
        backgroundColor: "#ab2310",
        width: "25%",
        margin: "0 auto",
        padding: "20px"
      }}>
      <CardContent>
        <Typography variant='h6' sx={{ color: "white" }}>
          VODACOM PAY NUMBER
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
            FOODIES POINT
          </Typography>
        </Stack>
      </CardActions>
    </Card>
  );
};

export default VodacomPayCard;
