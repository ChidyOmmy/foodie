import React, { useState, useContext } from "react";
import {
  Avatar,
  Box,
  Button,
  Collapse,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Logout from "@mui/icons-material/Logout";
import { emptyUser, UserContext } from "../context/UserContext";
import PhoneInputWithCountryCode from "../components/PhoneInputWithCountryCode";
import OrderTable from "./../components/OrderTable";

const ProfilePage = () => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.up("xs"));
  const tablet = useMediaQuery(theme.breakpoints.up("sm"));
  const desktop = useMediaQuery(theme.breakpoints.up("md"));

  const direction = () => {
    if (desktop) return "row";
    if (tablet) return "row";
    if (mobile) return "column";
  };
  const { userData, setUserData } = useContext(UserContext);
  const [editMode, setEditMode] = useState(false);
  const [fullName, setFullName] = useState(
    `${userData.first} ${userData.last}`
  );
  const [phoneNumber, setPhoneNumber] = useState(userData.profile.phone);
  const [address, setAddress] = useState(userData.profile.location);
  const logout = () => {
    setUserData(() => emptyUser);
    localStorage.clear();
  };
  const handleEditClick = () => {
    setEditMode(!editMode);
  };

  const handleSave = async () => {
    try {
      const response = await fetch("http://localhost:8000/editprofile/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData.access}` // Include the access token in the Authorization header
        },
        body: JSON.stringify({
          full_name: fullName,
          phone_number: phoneNumber,
          address: address,
          phone: phoneNumber
        })
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const data = await response.json();
      console.log("Profile updated successfully:", data);
      if (data) {
        setEditMode(false);
        setUserData((prevData) => ({
          ...prevData,
          first: fullName.split(" ")[0],
          last: fullName.split(" ")[1],
          profile: {
            ...prevData.profile,
            phone: phoneNumber,
            location: address
          }
        }));
      }
    } catch (error) {
      console.error("Error:", error);
      //   setErrorMessage("Failed to update profile. Please try again.");
    }
  };

  const initials = `${userData.first} ${userData.last}`
    .split(" ")
    .map((name) => name[0])
    .join("");

  return (
    <Stack
      direction={desktop ? "row" : tablet ? "column" : direction()}
      spacing={2}
      sx={{ my: 4 }}>
      <Box sx={{ maxWidth: 400, mt: 4, alignSelf: "center" }}>
        <Stack spacing={2} alignItems='center'>
          <Avatar sx={{ bgcolor: "primary.main", width: 64, height: 64 }}>
            {initials}
          </Avatar>
          <Typography variant='h5'>{`${userData.first} ${userData.last}`}</Typography>
          <Stack direction='row' spacing={1}>
            <Tooltip title='Edit'>
              <IconButton onClick={handleEditClick}>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title='Log out'>
              <IconButton onClick={logout}>
                <Logout />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
        <Collapse in={editMode}>
          <Box sx={{ mt: 2 }}>
            <Stack spacing={2}>
              <TextField
                label='Full Name'
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                fullWidth
              />
              <PhoneInputWithCountryCode
                value={phoneNumber}
                onChange={(value) => setPhoneNumber(() => value)}
              />
              <TextField
                label='Address'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                fullWidth
              />
              <Button variant='contained' color='primary' onClick={handleSave}>
                Save
              </Button>
            </Stack>
          </Box>
        </Collapse>
      </Box>
      <Box>
        <Typography sx={{ mx: "auto" }}>My Orders</Typography>
        <OrderTable />
      </Box>
    </Stack>
  );
};

export default ProfilePage;
