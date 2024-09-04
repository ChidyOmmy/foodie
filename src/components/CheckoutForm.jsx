import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  useMemo
} from "react";
import { Box } from "@mui/material";
import { Stack } from "@mui/material";
import { FormHelperText } from "@mui/material";
import {
  IconButton,
  InputAdornment,
  TextField,
  Button,
  debounce,
  useTheme,
  useMediaQuery,
  Typography
} from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LocationOn from "@mui/icons-material/LocationOn";
import { SearchBox, UserInput } from "./Search";
import Visibility from "@mui/icons-material/Visibility";
import PhoneInputWithCountryCode from "../components/PhoneInputWithCountryCode";
import { UserContext } from "../context/UserContext";
import LoginCard from "./LoginCard";
import CircularIntegration from "./CompleteOrder";
import PayCard from "./PayCard";
import { useStore } from "../store/productsStore";

const CheckoutForm = ({ children }) => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.up("xs"));
  const tablet = useMediaQuery(theme.breakpoints.up("sm"));
  const desktop = useMediaQuery(theme.breakpoints.up("md"));

  const direction = () => {
    if (desktop) return "row";
    if (tablet) return "row";
    if (mobile) return "column";
  };
  const cart = useStore((state) => state.cart);

  const { userData } = useContext(UserContext);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [showConfirmHelper, setShowConfirmHelper] = useState(false);

  const [order, setOrder] = useState({
    location: "",
    fullname: "",
    phonenumber: "",
    additionalinfo: "",
    transaction: ""
  });

  // Update order details when the user is logged in
  useEffect(() => {
    if (userData.loggedIn) {
      setOrder((prevOrder) => ({
        ...prevOrder,
        location: userData.profile.location,
        fullname: `${userData.first} ${userData.last}`,
        phonenumber: userData.profile.phone
      }));
    }
  }, [userData.loggedIn]);

  // Debounce function to validate password confirmation
  const debounceValidatePasswordConfirm = useMemo(
    () =>
      debounce((password, confirmPassword) => {
        setPasswordError(password !== confirmPassword);
      }, 300),
    []
  );

  // Clean up the debounce on unmount
  useEffect(() => {
    return () => {
      debounceValidatePasswordConfirm.clear();
    };
  }, [debounceValidatePasswordConfirm]);

  const handlePasswordChange = useCallback((event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
  }, []);

  const handlePasswordConfirmChange = useCallback((event) => {
    const newPasswordConfirm = event.target.value;
    setPasswordConfirm(newPasswordConfirm);
    setShowConfirmHelper(true);
  }, []);

  useEffect(() => {
    debounceValidatePasswordConfirm(password, passwordConfirm);
  }, [password, passwordConfirm, debounceValidatePasswordConfirm]);

  const toggleShowPassword = useCallback(() => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  }, []);

  const toggleShowPasswordConfirm = useCallback(() => {
    setShowPasswordConfirm(
      (prevShowPasswordConfirm) => !prevShowPasswordConfirm
    );
  }, []);

  // Reusable function for updating order fields
  const updateOrderField = useCallback((field, value) => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      [field]: value
    }));
  }, []);

  const handlePhoneNumberChange = useCallback(
    (number) => {
      updateOrderField("phonenumber", number);
    },
    [updateOrderField]
  );
  return (
    <>
      <Stack
        direction={desktop ? "row" : tablet ? "column" : direction()}
        spacing={1}
        my={2}>
        <Box sx={{ marginY: 2 }}>
          <LoginCard />
        </Box>
        <Box>
          <SearchBox>
            <UserInput
              value={order.location}
              onChange={(event) =>
                updateOrderField("location", event.target.value)
              }
              placeholder='Enter your destination'
            />
            <LocationOn size='small' color='secondary' />
          </SearchBox>
          <Stack direction={direction()} spacing={2} mt={3} mb={3}>
            <Box
              width={400}
              height={300}
              sx={{
                border: "none",
                backgroundColor: "#ccc",
                maxWidth: "100%"
              }}></Box>
            <Stack direction='column' spacing={2}>
              <Stack direction='column' spacing={1}>
                <TextField
                  value={order.fullname}
                  onChange={(event) =>
                    updateOrderField("fullname", event.target.value)
                  }
                  id='full-name'
                  label='Full name'
                  variant='outlined'
                  sx={{
                    width: "35ch"
                  }}
                />
                <FormHelperText>
                  This name will appear on your order.
                </FormHelperText>
              </Stack>
              <Stack direction='column' spacing={1}>
                <PhoneInputWithCountryCode
                  value={order.phonenumber}
                  onChangeProp={handlePhoneNumberChange}
                />
                <FormHelperText>
                  This will help us contact you and deliver with ease
                </FormHelperText>
              </Stack>
              <Stack direction='column' spacing={1}>
                <TextField
                  id='additional-direction'
                  label='Additional direction'
                  variant='outlined'
                  value={order.additionalinfo}
                  onChange={(event) =>
                    updateOrderField("additionalinfo", event.target.value)
                  }
                  multiline
                  rows={2}
                  sx={{ width: "35ch" }}
                />
                <FormHelperText>
                  You can add more specific areas our delivery person can find
                  (optional)
                </FormHelperText>
              </Stack>
            </Stack>
          </Stack>
          {!userData.loggedIn && (
            <Stack
              direction={tablet ? "row" : direction()}
              spacing={2}
              mt={3}
              mb={3}>
              <Stack direction='column' spacing={1}>
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
                  We'll create your account along with your order.
                </FormHelperText>
              </Stack>
              <Stack direction='column' spacing={1}>
                <TextField
                  id='password-confirm'
                  label='Confirm Password'
                  variant='outlined'
                  type={showPasswordConfirm ? "text" : "password"}
                  value={passwordConfirm}
                  onChange={handlePasswordConfirmChange}
                  error={passwordError}
                  sx={{ width: "35ch" }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          onClick={toggleShowPasswordConfirm}
                          aria-label='toggle password visibility'
                          edge='end'>
                          {showPasswordConfirm ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
                {showConfirmHelper && (
                  <FormHelperText
                    error={passwordError}
                    sx={{
                      color: passwordError ? "error.main" : "success.main"
                    }}>
                    {passwordError
                      ? "Passwords do not match. Please try again."
                      : "Passwords match!"}
                  </FormHelperText>
                )}
              </Stack>
            </Stack>
          )}
        </Box>
      </Stack>
      <Typography>
        You can pay right away through M-Pesa, Tigo Pesa or HaloPesa
      </Typography>
      <Stack
        sx={{
          maxWidth: "100%",
          justifyContent: "space-between",
          alignItems: tablet || mobile ? "center" : "space-around"
        }}
        spacing={1}
        direction={desktop ? "row" : tablet ? "column" : direction()}>
        <PayCard
          title='Vodacom Pay Number'
          name='Foodies Point'
          payNumber='56789'
          color='#e32730'
        />
        <PayCard
          title='Tigo Pay Number'
          name='Foodies Point'
          payNumber='98765'
          color='#14661d'
        />
        <PayCard
          title='Halotel Pay Number'
          name='Foodies Point'
          payNumber='65432'
          color='tomato'
        />
      </Stack>
      <Typography mb={2}>
        Please enter the transaction code before continuing with the purchase to
        confirm the payment
      </Typography>
      <TextField
        value={order.transaction}
        onChange={(event) =>
          updateOrderField("transaction", event.target.value)
        }
        id='transaction-code'
        label='Transaction code'
        variant='outlined'
        sx={{ width: "35ch" }}
      />
      <Box mt={3}>
        {passwordError || !order.transaction ? (
          <Stack
            direction='column'
            sx={{ alignItems: "flex-start", justifyContent: "flex-start" }}>
            <Typography variant='small'>
              Please fill in all necessary fields
            </Typography>
            <Button disabled={passwordError || !order.transaction}>
              <CircularIntegration />
            </Button>
          </Stack>
        ) : (
          <CircularIntegration order={{ ...order, password, cart }} />
        )}
      </Box>
    </>
  );
};

export default CheckoutForm;
