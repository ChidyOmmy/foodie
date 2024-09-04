import { lazy, Suspense, useEffect } from "react";
import { Container, Box, Skeleton, Stack } from "@mui/material";
import Navbar from "./components/Navbar/Navbar";
import { Paper } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import MenuContextProvider from "./context/MenuContext";
import UserContextProvider from "./context/UserContext";
import TokenProvider from "./context/TokenContext";
import ScrollToTop from "./utils/ScrollToTop";
import { useStore } from "./store/productsStore";

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
  const initializeProducts = useStore((state) => state.initializeProducts);
  // Effect hook to fetch data when the component mounts
  useEffect(() => {
    // Function to fetch data from the API
    const fetchData = async () => {
      try {
        // Make the fetch request
        const response = await fetch("http://localhost:8000", {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });

        // Check if the response is successful
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        // Parse the JSON data
        const result = await response.json();

        // Update the state with the fetched data
        console.log(result);
        initializeProducts(result);
      } catch (error) {
        // Handle errors
        console.error("There was a problem with the fetch operation:", error);
      }
    };

    // Call the fetch function
    fetchData();
  }, []); // Empty dependency array means this effect runs once after the initial render
  console.log("App mounted");
  return (
    <MenuContextProvider>
      <UserContextProvider>
        <TokenProvider>
          <Paper sx={{ margin: 0, padding: 0, minHeight: "100%" }}>
            <ScrollToTop />
            <Navbar />
            <Container sx={{ minHeight: "100vh" }}>
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
