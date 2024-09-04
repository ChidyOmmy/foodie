import React from "react";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import { styled } from "@mui/system";
import { useTheme } from "@mui/material";
import TextField from "@mui/material/TextField";

export const CustomPhoneInput = styled(PhoneInput)(({ theme }) => ({}));

const PhoneInputWithCountryCode = ({ value, onChangeProp }) => {
  const theme = useTheme();
  return (
    <CustomPhoneInput
      sx={{
        "&:focus": {
          outline: `1px solid ${theme.palette.primary.main}`
        }
      }}
      country={"tz"}
      onlyCountries={["ke", "tz", "ug", "rw"]}
      placeholder='123 456 789'
      value={value}
      autoFormat
      disableCountryCodes={true}
      onChange={onChangeProp}
      inputStyle={{
        backgroundColor: "transparent",
        color: theme.palette.text.primary,
        width: "35ch",
        outline: `.5px solid ${theme.palette.divider}`,
        "&:focus fieldset": {
          outline: `1px solid ${theme.palette.primary.main}`
        },
        "&:hover fieldset": {
          outline: `1px solid ${theme.palette.primary.main}`
        }
      }}
      buttonStyle={{ backgroundColor: theme.palette.secondary.dark }}
      inputExtraProps={{
        name: "phone-number",
        required: true
      }}
    />
  );
};

export default PhoneInputWithCountryCode;
