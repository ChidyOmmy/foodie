import { createTheme } from "@mui/material/styles";

const palette = {
  primary: {
    main: "#EC135F"
  },
  secondary: {
    main: "#FFC100"
  }
};

const getTheme = (mode) =>
  createTheme({
    palette: { mode, ...palette },
    filter: {
      dropShadow: `drop-shadow(-1px 5px 7px ${palette.primary.main})`
    }
  });

export default getTheme;
