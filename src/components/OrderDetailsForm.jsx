import { useState, useEffect, useCallback } from "react";
import { Box, Stack, TextField, FormHelperText } from "@mui/material";
import LocationOn from "@mui/icons-material/LocationOn";
import { SearchBox, UserInput } from "../components/Search";
import PhoneInputWithCountryCode from "../components/PhoneInputWithCountryCode";

const OrderDetailsForm = ({
  order,
  updateOrderField,
  handlePhoneNumberChange
}) => {
  return (
    <Box>
      <SearchBox>
        <UserInput
          value={order.location}
          onChange={(event) => updateOrderField("location", event.target.value)}
          placeholder='Enter your destination'
        />
        <LocationOn size='small' color='secondary' />
      </SearchBox>
      <Stack direction='column' spacing={2} mt={3} mb={3}>
        <Stack direction='column' spacing={1}>
          <TextField
            value={order.fullname}
            onChange={(event) =>
              updateOrderField("fullname", event.target.value)
            }
            id='full-name'
            label='Full name'
            variant='outlined'
            sx={{ width: "35ch" }}
          />
          <FormHelperText>This name will appear on your order.</FormHelperText>
        </Stack>
        <Stack direction='column' spacing={1}>
          <PhoneInputWithCountryCode
            value={order.phonenumber}
            onChangeProp={handlePhoneNumberChange}
          />
          <FormHelperText>
            This will help us contact you and deliver with ease.
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
    </Box>
  );
};

export default OrderDetailsForm;
