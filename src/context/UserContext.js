import React, { createContext, useState, useMemo } from "react";

export const UserContext = createContext();
const user = {
  cart: [],
  searchResults: []
};
const UserContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(user);

  const value = useMemo(() => ({ userData, setUserData }), [userData]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
