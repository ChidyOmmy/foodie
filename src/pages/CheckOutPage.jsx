import { useContext, useState } from "react";
import {
  Box,
  Typography,
  Stack,
  FormControl,
  FormHelperText,
  InputLabel,
  TextField,
  CardHeader,
  Card,
  CardActions,
  CardContent,
  Button
} from "@mui/material";
import { UserInput, SearchBox } from "../components/Search";
import LocationOn from "@mui/icons-material/LocationOn";
import delivery from "../images/delivery.png";
import CartTable from "../components/CartTable";
import PhoneInputWithCountryCode from "../components/PhoneInputWithCountryCode";
import VodacomPayCard from "../components/CardWithDigits";
import { UserContext } from "../App";

const CheckOutPage = () => {
  const [userData, setUserData] = useContext(UserContext);
  const [order, setOrder] = useState({
    location: "salasala",
    fullname: "",
    phonenumber: "",
    additionalinfo: "",
    transaction: "",
    cart: userData.cart
  });
  async function postOrder() {
    try {
      const response = await fetch("http://localhost:8000/createorder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
          // If CSRF protection is enabled, include the CSRF token here:
          // 'X-CSRFToken': getCookie('csrftoken'),
        },
        body: JSON.stringify(order)
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Order created successfully:", data);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  }
  const handlePhoneNumberChange = (number) => {
    setOrder({
      ...order,
      phonenumber: number
    });
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
        id='full-name'
        label='Transaction code: '
        variant='outlined'
        sx={{ width: "35ch" }}
      />
      <Box mt={3}>
        <Button
          size='large'
          variant='contained'
          onClick={() => {
            console.log(order);
            postOrder();
          }}>
          COMPLETE ORDER{" "}
        </Button>
      </Box>
    </Box>
  );
};

export default CheckOutPage;
