import { useState, createContext, lazy, Suspense } from "react";
import { Container, Box, Skeleton, Stack } from "@mui/material";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { Routes, Route } from "react-router-dom";
import { menu, user } from "./Context";
import Footer from "./components/Footer";

const LandingPage = lazy(() => import("./pages/LandingPage"));
const CheckOutPage = lazy(() => import("./pages/CheckOutPage"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const Error404 = lazy(() => import("./pages/Error404"));

const LoadingSkeleton = () => {
  return (
    <Box>
      <Stack direction='row' spacing={2}>
        <Skeleton
          sx={{ backgroundColor: "#ccc", maxWidth: "100%" }}
          animation='wave'
          variant='rectangular'
          height={410}
          width='50%'
        />
        <Skeleton
          sx={{ backgroundColor: "#ccc", maxWidth: "100%" }}
          animation='wave'
          variant='rectangular'
          height={410}
          width='50%'
        />
      </Stack>
    </Box>
  );
};
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
            <Suspense fallback={<LoadingSkeleton />}>
              <Routes>
                <Route path='/' element={<LandingPage />} />
                <Route path='/product' element={<ProductPage />} />
                <Route path='/product/:id' element={<ProductPage />} />
                <Route path='/checkout' element={<CheckOutPage />} />
                <Route path='/about' element={<AboutPage />} />
                <Route path='*' element={<Error404 />} />
              </Routes>
            </Suspense>
          </Container>
          <Footer />
        </UserContext.Provider>
      </MenuContext.Provider>
    </ThemeProvider>
  );
}

export default App;
