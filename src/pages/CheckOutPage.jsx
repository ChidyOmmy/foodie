import { useContext, useState } from "react";
import {
  Box,
  Typography,
  Stack,
  FormHelperText,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  debounce,
  Card,
  CardContent
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { UserInput, SearchBox } from "../components/Search";
import LocationOn from "@mui/icons-material/LocationOn";
import delivery from "../images/delivery.png";
import CartTable from "../components/CartTable";
import PhoneInputWithCountryCode from "../components/PhoneInputWithCountryCode";
import LoginCard from "../components/LoginCard";
import VodacomPayCard from "../components/CardWithDigits";
import CircularIntegration from "../components/CompleteOrder";
import { UserContext } from "../context/UserContext";

const CheckOutPage = () => {
  const { userData } = useContext(UserContext);
  const [order, setOrder] = useState({
    location: "salasala",
    fullname: "Rashid Shakili",
    phonenumber: "255764044285",
    additionalinfo: "nothing",
    transaction: "sandvf",
    cart: userData.cart
  });

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [showConfirmHelper, setShowConfirmHelper] = useState(false);

  const handlePhoneNumberChange = (number) => {
    setOrder({
      ...order,
      phonenumber: number
    });
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    debounceValidatePasswordConfirm(newPassword, passwordConfirm);
  };

  const handlePasswordConfirmChange = (event) => {
    const newPasswordConfirm = event.target.value;
    setPasswordConfirm(newPasswordConfirm);
    setShowConfirmHelper(true);
    debounceValidatePasswordConfirm(password, newPasswordConfirm);
  };

  const validatePasswordConfirm = (password, confirmPassword) => {
    setPasswordError(password !== confirmPassword);
  };

  const debounceValidatePasswordConfirm = debounce(
    validatePasswordConfirm,
    300
  );

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowPasswordConfirm = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };

  return (
    <Box mt={5} mb={5}>
      <Typography>
        Checkout your order now and get it delivered to you as fast as it can
        get
      </Typography>
      <Stack direction='row' spacing={2} mb={5}>
        <CartTable />
        <Box
          component='img'
          src={delivery}
          alt='delivery'
          sx={{ width: 340, maxWidth: "100%" }}
        />
      </Stack>
      <Typography>sign in to checkout or fill form below</Typography>
      <LoginCard />
      <SearchBox>
        <UserInput
          value={order.location}
          onChange={(event) =>
            setOrder({
              ...order,
              location: event.target.value
            })
          }
          placeholder='Enter your destination'
        />
        <LocationOn size='small' color='secondary' />
      </SearchBox>
      <Stack direction='row' spacing={2} mt={3} mb={3}>
        <Box
          width={410}
          height={300}
          sx={{ border: "none", backgroundColor: "#ccc" }}></Box>
        <Stack direction='column' spacing={2}>
          <Stack direction='column' spacing={1}>
            <TextField
              value={order.fullname}
              onChange={(event) =>
                setOrder({
                  ...order,
                  fullname: event.target.value
                })
              }
              id='full-name'
              label='Full name'
              variant='outlined'
              sx={{ width: "35ch" }}
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
              This will help us contact you and deliver in ease
            </FormHelperText>
          </Stack>
          <Stack direction='column' spacing={1}>
            <TextField
              id='additional-direction'
              label='Additional direction'
              variant='outlined'
              value={order.additionalinfo}
              onChange={(event) =>
                setOrder({
                  ...order,
                  additionalinfo: event.target.value
                })
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

      {/* New Stack for Password and Password Verification */}
      <Stack direction='row' spacing={2} mt={3} mb={3}>
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
                    {showPasswordConfirm ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          {showConfirmHelper && (
            <FormHelperText
              error={passwordError}
              sx={{ color: passwordError ? "error.main" : "success.main" }}>
              {passwordError
                ? "Passwords do not match. Please try again."
                : "Passwords match!"}
            </FormHelperText>
          )}
        </Stack>
      </Stack>

      <Typography>
        You can pay right away through M-Pesa, Airtel Money or Tigo Pesa
      </Typography>
      <Stack direction='row' mb={2} mt={2} spacing={2}>
        <VodacomPayCard />
        <VodacomPayCard />
        <VodacomPayCard />
      </Stack>
      <Typography mb={2}>
        Please enter the transaction code before continuing with the purchase to
        confirm the payment
      </Typography>
      <TextField
        value={order.transaction}
        onChange={(event) => {
          setOrder({
            ...order,
            transaction: event.target.value
          });
        }}
        id='transaction-code'
        label='Transaction code'
        variant='outlined'
        sx={{ width: "35ch" }}
      />
      <Box mt={3}>
        {passwordError ? (
          <>
            <Typography>Please correct password fields </Typography>
            <Button disabled>
              <CircularIntegration order={order} />
            </Button>
          </>
        ) : (
          <CircularIntegration order={{ ...order, password }} />
        )}
      </Box>
    </Box>
  );
};

export default CheckOutPage;
