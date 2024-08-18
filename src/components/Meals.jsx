import { useContext, useState, useEffect } from "react";
import { Box, Typography, Chip, Avatar, Stack, debounce } from "@mui/material";
import MealsList from "./MealsList";
import { UserContext } from "../context/UserContext";
import { MenuContext } from "../context/MenuContext";
import meal from "../images/meal.jpg";
import chickensticks from "../images/chickensticks.jpg";
import tanzaniansnacks from "../images/tanzaniansnacks.jpg";
import shawarma from "../images/shawarma.jpg";
import pilau from "../images/pilau.jpg";
import breakfast from "../images/breakfast.jpg";
import desserts from "../images/desserts.jpg";
import veganbreakfast from "../images/veganbreakfast.jpg";
import britishbreakfast from "../images/britishbreakfast.jpg";
import chapatimaini from "../images/chapatimaini.jpg";
import mixer from "../images/mixer.jpg";

const categoriesList = [
  { title: "meat", image: chickensticks },
  { title: "protein", image: meal },
  { title: "breakfast", image: tanzaniansnacks },
  { title: "fast", image: shawarma },
  { title: "lunch", image: pilau },
  { title: "snacks", image: breakfast },
  { title: "eggs", image: britishbreakfast },
  { title: "desserts", image: desserts },
  { title: "vegan", image: veganbreakfast },
  { title: "wheat", image: chapatimaini }
];
const Meals = () => {
  const { menulist } = useContext(MenuContext);
  const { userData, setUserData } = useContext(UserContext);
  const [categories] = useState(categoriesList);
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedFilterItems = debounce((keyword) => {
    const filteredItems = menulist.filter(
      (item) =>
        item.category
          .map((str) => str.toLowerCase())
          .find((title) => title === keyword.toLowerCase()) !== undefined
    );
    setUserData({ ...userData, searchResults: filteredItems });
  }, 300);

  const handleSearchChange = (keyword) => {
    if (keyword === "" || keyword === "all") {
      setUserData({ ...userData, searchResults: [] });
    } else {
      debouncedFilterItems(keyword);
    }
    setSearchTerm(keyword);
  };

  useEffect(() => {
    if (!userData.searchResults.length) {
      setSearchTerm("");
    }
  }, [userData.searchResults]);

  return (
    <Box sx={{ padding: 0, marginTop: 10 }}>
      <Typography variant='h5'>Favorable,this time of the year</Typography>
      <Stack
        direction='row'
        sx={{
          flexWrap: "wrap",
          maxWidth: "100%"
        }}>
        <Chip
          sx={{ marginTop: 1 }}
          disabled={searchTerm === "" || searchTerm === "all" ? true : false}
          onClick={() => {
            handleSearchChange("all");
          }}
          clickable
          label='All'
          avatar={<Avatar src={mixer} alt='Vegan' />}
        />
        {categories.map((category) => (
          <Chip
            sx={{ marginTop: 1 }}
            disabled={searchTerm === category.title ? true : false}
            onClick={() => {
              handleSearchChange(category.title);
            }}
            clickable
            key={category.title}
            label={category.title}
            avatar={<Avatar src={category.image} alt='Vegan' />}
          />
        ))}
      </Stack>
      {userData.searchResults.length > 0 ? (
        <MealsList list={userData.searchResults} />
      ) : (
        <MealsList list={menulist} />
      )}
    </Box>
  );
};
export default Meals;
