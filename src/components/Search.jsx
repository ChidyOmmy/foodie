import { styled } from "@mui/material/styles";
import { Button, debounce, IconButton } from "@mui/material";
import { useContext, useState } from "react";
import { MenuContext, UserContext } from "../App";

import Clear from "@mui/icons-material/Clear";

const UserInput = styled("input")(({ theme }) => ({
  width: "35ch",
  m: 0,
  outline: "none",
  border: "none",
  textDecoration: "none !important",
  [theme.breakpoints.down("sm")]: {
    width: "35ch"
  }
}));

const SearchBox = styled("span")(({ theme }) => ({
  backgroundColor: "#fff",
  display: "inline-flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  borderRadius: 15,
  padding: 0,
  paddingLeft: 20,
  filter: theme.filter.dropShadow,
  [theme.breakpoints.down("sm")]: {
    maxWidth: "100%",
    margin: 0
  }
}));

const Search = () => {
  const [menulist] = useContext(MenuContext);
  const [userData, setUserData] = useContext(UserContext);
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedFilterItems = debounce(() => {
    const filteredItems = menulist.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setUserData({ ...userData, searchResults: filteredItems });
  }, 600);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    if (searchTerm === "") {
      setUserData({ ...userData, searchResults: [] });
      return;
    }
    debouncedFilterItems();
    console.log(userData.searchResults);
  };

  return (
    <SearchBox>
      <UserInput
        id='search'
        type='search'
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder='search for offers, meals and recipes..'
      />
      <IconButton
        onClick={() => {
          setSearchTerm("");
          setUserData({ ...userData, searchResults: [] });
        }}>
        <Clear />
      </IconButton>
      <Button
        onClick={debouncedFilterItems}
        variant='contained'
        sx={{ borderRadius: 15, margin: 0 }}>
        Search
      </Button>
    </SearchBox>
  );
};
export default Search;
