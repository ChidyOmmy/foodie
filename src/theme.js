import { createTheme } from "@mui/material/styles";

const palette = {
  mode: "dark",
  primary: {
    main: "#EC135F"
  },
  secondary: {
    main: "#FFC100"
  }
};
export const theme = createTheme({
  palette,
  filter: {
    dropShadow: `drop-shadow(-4px 15px 25px ${palette.primary.main})`
  }
});
