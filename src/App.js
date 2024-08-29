import {
  useState,
  createContext,
  useContext,
  lazy,
  Suspense,
  useEffect
} from "react";
import { Container, Box, Skeleton, Stack } from "@mui/material";
import Navbar from "./components/Navbar";
import { ThemeProvider, Paper } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { user } from "./Context";
import Footer from "./components/Footer";
import MenuContextProvider from "./context/MenuContext";
import UserContextProvider from "./context/UserContext";
import TokenProvider from "./context/TokenContext";
import ScrollToTop from "./utils/ScrollToTop";

const LandingPage = lazy(() => import("./pages/LandingPage"));
const CheckOutPage = lazy(() => import("./pages/CheckOutPage"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const Error404 = lazy(() => import("./pages/Error404"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const SignInPage = lazy(() => import("./pages/SignInPage"));

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

function App() {
  useEffect(() => console.log("App mounted"), []);
  return (
    <MenuContextProvider>
      <UserContextProvider>
        <TokenProvider>
          <Paper sx={{ margin: 0, padding: 0, minHeight: "100%" }}>
            <Navbar />
            <Container sx={{ minHeight: "100vh" }}>
              <ScrollToTop />
              <Suspense fallback={<LoadingSkeleton />}>
                <Routes>
                  <Route path='/' element={<LandingPage />} />
                  <Route path='/product' element={<ProductPage />} />
                  <Route path='/product/:id' element={<ProductPage />} />
                  <Route path='/checkout' element={<CheckOutPage />} />
                  <Route path='/about' element={<AboutPage />} />
                  <Route path='/profile' element={<ProfilePage />} />
                  <Route path='/signin' element={<SignInPage />} />
                  <Route path='*' element={<Error404 />} />
                </Routes>
              </Suspense>
            </Container>
            <Footer />
          </Paper>
        </TokenProvider>
      </UserContextProvider>
    </MenuContextProvider>
  );
}

export default App;
