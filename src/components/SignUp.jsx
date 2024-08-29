import React, { useState, useContext } from "react";
import {
  Stack,
  TextField,
  InputAdornment,
  IconButton,
  FormHelperText,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Avatar
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PhoneInputWithCountryCode from "./PhoneInputWithCountryCode";
import { UserContext } from "../context/UserContext";

const SignUp = () => {
  const { userData, setUserData } = useContext(UserContext);
  const [password, setPassword] = useState("juma");
  const [showPassword, setShowPassword] = useState(true);
  const [phoneValue, setPhoneValue] = useState("255711111112");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOnChangeProp = (value) => {
    setPhoneValue(value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    setLoading(true); // Show spinner
    try {
      const response = await fetch("http://localhost:8000/token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: phoneValue, // Sending phone number as 'username'
          password: password
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.detail || "Login failed.");
        return;
      }

      const data = await response.json();
      if (data) {
        // Now `data` contains the tokens, user, and profile info
        const { access, refresh, user, profile } = data;
        const first = user.first;
        const last = user.last;

        // Handle successful login, such as saving tokens and user data
        localStorage.setItem("access", access);
        localStorage.setItem("refresh", refresh);
        localStorage.setItem("userData", JSON.stringify(user));
        localStorage.setItem(
          "userData",
          JSON.stringify({
            ...userData,
            access,
            refresh,
            first,
            last,
            profile,
            loggedIn: true
          })
        );
        setUserData((prevUserData) => ({
          ...prevUserData,
          access,
          refresh,
          profile,
          loggedIn: true,
          first: user.first,
          last: user.last
        }));
      }
      console.log("Login successful", data);
      // Handle successful login, such as saving tokens, redirecting, etc.
    } catch (error) {
      console.error("Error during login", error);
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false); // Hide spinner
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 500,
        margin: "auto",
        mt: 5,
        boxShadow: 5,
        borderRadius: 3
      }}>
      <CardContent>
        <Avatar
          sx={{
            width: 52,
            height: 52,
            margin: "auto",
            marginTop: 0,
            marginBottom: 0
          }}>
          {userData.first}
        </Avatar>
        {userData.loggedIn ? (
          <>
            <Typography>Logged in as {userData.first} </Typography>
            <Typography>
              The checkout form has been filled with your data,you can fill any
              important field and continue to checkout{" "}
            </Typography>
          </>
        ) : (
          <>
            <Typography
              variant='h5'
              component='div'
              gutterBottom
              sx={{ fontWeight: "bold", textAlign: "center" }}>
              Welcome Back
            </Typography>
            <Typography
              variant='body2'
              color='text.secondary'
              sx={{ mb: 3, textAlign: "center" }}>
              Please login to your account
            </Typography>
            <Stack direction='column' spacing={2} mt={3} mb={3}>
              <PhoneInputWithCountryCode
                value={phoneValue}
                onChangeProp={handleOnChangeProp}
              />
              <TextField
                id='password'
                label='Password'
                variant='outlined'
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
                sx={{ width: "35ch" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        onClick={toggleShowPassword}
                        aria-label='toggle password visibility'
                        edge='end'>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <FormHelperText>
                Enter your phone number and password to continue.
              </FormHelperText>
              {errorMessage && (
                <FormHelperText error sx={{ mt: 1 }}>
                  {errorMessage}
                </FormHelperText>
              )}
            </Stack>
            <Button
              variant='contained'
              color='primary'
              fullWidth
              sx={{ mt: 2, borderRadius: 2 }}
              disabled={!password || !phoneValue || loading}
              onClick={handleLogin}>
              {loading ? <CircularProgress size={24} /> : "Login"}
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default SignUp;
