import React from "react";
import {
  Stack,
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery
} from "@mui/material";
import LoginCard from "../components/LoginCard";
import signup from "../images/signup.jpg";
import { Link } from "react-router-dom";

const SignInPage = () => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.up("xs"));
  const tablet = useMediaQuery(theme.breakpoints.up("sm"));
  const desktop = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <>
      <Stack
        sx={{ alignItems: "center", justifyContent: "center", marginTop: 2 }}
        direction='column'>
        <Typography>
          Login to access your orders and for an easy checkout
        </Typography>
        <Typography>
          If you dont have an account yet, we will create you one on your first
          checkout ✨
        </Typography>
      </Stack>
      <Stack
        direction='row'
        spacing={1}
        sx={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: 15,
          height: 415
        }}>
        <LoginCard />
        {desktop && (
          <Box height='100%' sx={{ position: "relative" }}>
            <Link to='/'>
              <Button
                variant='contained'
                color='secondary'
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 1
                }}>
                Back to Home
              </Button>
            </Link>
            <Box height='100%' component='img' src={signup} />
          </Box>
        )}
      </Stack>
    </>
  );
};

export default SignInPage;
