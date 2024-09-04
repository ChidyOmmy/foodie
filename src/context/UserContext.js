import React, { createContext, useState, useMemo, useEffect } from "react";
import { ThemeProvider, responsiveFontSizes } from "@mui/material";

import getTheme from "../theme";

export const UserContext = createContext();
export const emptyUser = {
  access: "",
  refresh: "",
  first: "",
  last: "",
  profile: {
    location: "",
    phone: ""
  },
  loggedIn: false,
  cart: [],
  searchResults: []
};
const UserContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(emptyUser);
  const [themeMode, setThemeMode] = useState("dark");

  const theme = responsiveFontSizes(
    useMemo(() => getTheme(themeMode), [themeMode])
  );

  useEffect(() => {
    const localUserData = JSON.parse(localStorage.getItem("userData"));
    const localProfile = localUserData?.profile ? localUserData.profile : {};
    const accessToken = localStorage.getItem("access");
    const refreshToken = localStorage.getItem("refresh");

    if (localUserData && accessToken) {
      setUserData((prevUserData) => ({
        ...prevUserData,
        access: accessToken ? accessToken : "",
        refresh: refreshToken ? refreshToken : "",
        loggedIn: accessToken ? true : false,
        first: localUserData ? localUserData.first : "",
        last: localUserData ? localUserData.last : "",
        profile: {
          location: localProfile ? localProfile.location : "",
          phone: localProfile ? localProfile.phone : ""
        }
      }));
    } else {
      localStorage.removeItem("userData");
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
    }
  }, []);

  const value = useMemo(
    () => ({ userData, setUserData, themeMode, setThemeMode }),
    [userData, themeMode]
  );

  return (
    <UserContext.Provider value={value}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </UserContext.Provider>
  );
};

export default UserContextProvider;
