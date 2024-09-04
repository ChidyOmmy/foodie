import React, { useContext, useState, useCallback, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { DarkModeSwitch } from "react-toggle-dark-mode";

const DarkModeButton = () => {
  const { setThemeMode } = useContext(UserContext);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prevMode) => !prevMode);
  }, []);

  useEffect(() => setThemeMode(isDarkMode ? "dark" : "light"), [isDarkMode]);

  return (
    <>
      <DarkModeSwitch
        style={{}}
        checked={isDarkMode}
        onChange={toggleDarkMode}
        size={20}
      />
    </>
  );
};

export default DarkModeButton;
