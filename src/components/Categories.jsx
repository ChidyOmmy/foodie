import React, { useMemo } from "react";
import { Typography, Chip, Avatar, Stack } from "@mui/material";

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

import { useStore } from "../store/productsStore";

const Categories = () => {
  const searchTerm = useStore((state) => state.searchTerm);
  const searchType = useStore((state) => state.searchType);
  const setSearchTerm = useStore((state) => state.setSearchTerm);
  const setSearchType = useStore((state) => state.setSearchType);

  const categories = useMemo(
    () => [
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
    ],
    []
  );

  const handleSearchChange = (searchTerm) => {
    if (searchType !== "category") {
      setSearchType("category");
    }
    setSearchTerm(searchTerm);
  };

  return (
    <>
      <Typography variant='h5'>Favorable, this time of the year</Typography>
      <Stack
        direction='row'
        sx={{
          flexWrap: "wrap",
          maxWidth: "100%"
        }}>
        <Chip
          sx={{ marginTop: 1 }}
          disabled={!searchTerm || searchTerm === ""}
          onClick={() => handleSearchChange("")}
          clickable
          label='All'
          avatar={<Avatar src={mixer} alt='All' />}
        />
        {categories.map((category) => (
          <Chip
            sx={{ marginTop: 1 }}
            disabled={searchTerm === category.title}
            onClick={() => handleSearchChange(category.title)}
            clickable
            key={category.title}
            label={category.title}
            avatar={<Avatar src={category.image} alt={category.title} />}
          />
        ))}
      </Stack>
    </>
  );
};

export default Categories;
