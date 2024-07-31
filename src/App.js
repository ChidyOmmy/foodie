import { useState, createContext } from "react";
import { Container } from "@mui/material";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import Hero from "./components/Hero";
import Meals from "./components/Meals";
import SpecialOffers from "./components/SpecialOffers";
import AdditionalMessage from "./components/AdditionalMessage";
import Footer from "./components/Footer";
import { menu, user } from "./Context";

export const MenuContext = createContext();
export const UserContext = createContext();

const mytheme = theme;
function App() {
  const [menulist, setMenulist] = useState(menu);
  const [userData, setUserData] = useState(user);
  return (
    <ThemeProvider theme={mytheme}>
      <MenuContext.Provider value={[menulist, setMenulist]}>
        <UserContext.Provider value={[userData, setUserData]}>
          <Navbar />
          <Container>
            <Hero />
            <Meals />
            <SpecialOffers />
            <AdditionalMessage />
          </Container>
          <Footer />
        </UserContext.Provider>
      </MenuContext.Provider>
    </ThemeProvider>
  );
}

export default App;
