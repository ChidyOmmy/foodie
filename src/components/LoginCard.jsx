import React, { useState } from "react";
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
  CircularProgress
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PhoneInputWithCountryCode from "./PhoneInputWithCountryCode";

const LoginCard = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [phoneValue, setPhoneValue] = useState(null);
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
      </CardContent>
    </Card>
  );
};

export default LoginCard;
