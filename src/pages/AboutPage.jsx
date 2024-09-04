import { useEffect } from "react";
import { Box, Stack } from "@mui/material";
import { useStore } from "../store/productsStore";

const AboutPage = () => {
  const products = useStore((state) => state.products);
  const initializeProducts = useStore((state) => state.initializeProducts);
  const cart = useStore((state) => state.cart);
  const addToCart = useStore((state) => state.addToCart);

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

  return (
    <Box sx={{ mx: "auto", mt: 14 }}>
      <Stack direction='row' justifyContent='space-between'>
        <ul>
          {products.map((product) => (
            <>
              <li key={product.id}>
                {" "}
                {product.id}: {product.title} - stock: {product.inStock}{" "}
              </li>
              <button
                onClick={() => {
                  addToCart(product.id, 1);
                }}>
                Add to Cart
              </button>
              <button
                onClick={() => {
                  addToCart(product.id, -1);
                }}>
                Remove from Cart
              </button>
            </>
          ))}
        </ul>
        <ul>
          {cart.map((product) => (
            <li key={product.id}>product: {JSON.stringify(product)}</li>
          ))}
        </ul>
      </Stack>
    </Box>
  );
};

export default AboutPage;
