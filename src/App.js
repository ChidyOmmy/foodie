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
import { theme } from "./theme";
import { Routes, Route } from "react-router-dom";
import { user } from "./Context";
import Footer from "./components/Footer";
import MenuContextProvider from "./context/MenuContext";
import UserContextProvider from "./context/UserContext";

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

const mytheme = theme;
function App() {
  const [userData, setUserData] = useState(user);

  // // Effect hook to fetch data when the component mounts
  // useEffect(() => {
  //   // Function to fetch data from the API
  //   const fetchData = async () => {
  //     try {
  //       // Make the fetch request
  //       const response = await fetch("http://localhost:8000", {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json"
  //         }
  //       });

  //       // Check if the response is successful
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }

  //       // Parse the JSON data
  //       const result = await response.json();

  //       // Update the state with the fetched data
  //       console.log(result);
  //       setMenulist(result);
  //     } catch (error) {
  //       // Handle errors
  //       console.error("There was a problem with the fetch operation:", error);
  //     }
  //   };

  //   // Call the fetch function
  //   fetchData();
  // }, []); // Empty dependency array means this effect runs once after the initial render

  return (
    <ThemeProvider theme={mytheme}>
      <MenuContextProvider>
        <UserContextProvider>
          <Paper>
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
          </Paper>
        </UserContextProvider>
      </MenuContextProvider>
    </ThemeProvider>
  );
}

export default App;
