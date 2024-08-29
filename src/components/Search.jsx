import { styled } from "@mui/material/styles";
import { Button, IconButton } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useContext, useState, useMemo } from "react";
import { UserContext } from "../context/UserContext";
import { MenuContext } from "../context/MenuContext";
import Clear from "@mui/icons-material/Clear";
import debounce from "@mui/material/utils/debounce";

export const UserInput = styled("input")(({ theme }) => ({
  width: "35ch",
  margin: 0,
  outline: "none",
  border: "none",
  textDecoration: "none !important",
  [theme.breakpoints.down("sm")]: {
    width: "25ch"
  }
}));

export const SearchBox = styled("span")(({ theme }) => ({
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
  const { menulist } = useContext(MenuContext);
  const { userData, setUserData } = useContext(UserContext);
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedFilterItems = useMemo(
    () =>
      debounce((term) => {
        const filteredItems = menulist.filter((item) =>
          item.title.toLowerCase().includes(term.toLowerCase())
        );
        setUserData((prevUserData) => ({
          ...prevUserData,
          searchResults: filteredItems
        }));
      }, 600),
    [menulist, setUserData]
  );
  const clearSearch = () => {
    setSearchTerm("");
    debouncedFilterItems.clear(); // Cancel any pending debounce calls
    setUserData((prevUserData) => ({ ...prevUserData, searchResults: [] }));
  };
  const handleSearchChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    if (newSearchTerm === "") {
      setUserData((prevUserData) => ({ ...prevUserData, searchResults: [] }));
      return;
    }
    debouncedFilterItems(newSearchTerm);
  };

  return (
    <SearchBox>
      <UserInput
        id='search'
        type='search'
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder='Search for offers, meals, and recipes..'
      />
      <IconButton onClick={clearSearch}>
        <Clear sx={{ color: grey[500] }} />
      </IconButton>
      <Button
        onClick={() => debouncedFilterItems(searchTerm)}
        variant='contained'
        sx={{ borderRadius: 15, margin: 0 }}>
        Search
      </Button>
    </SearchBox>
  );
};

export default Search;
