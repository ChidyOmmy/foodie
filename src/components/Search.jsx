import { styled } from "@mui/material/styles";
import { Button, debounce, IconButton, Box } from "@mui/material";
import { useContext, useState } from "react";
import { MenuContext } from "../App";

import Clear from "@mui/icons-material/Clear";

const UserInput = styled("input")(({ theme }) => ({
  width: "35ch",
  m: 0,
  outline: "none",
  border: "none",
  textDecoration: "none !important"
}));

const SearchBox = styled("span")(({ theme }) => ({
  backgroundColor: "#fff",
  display: "inline-flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  borderRadius: 15,
  padding: 0,
  paddingLeft: 20,
  filter: theme.filter.dropShadow
}));

const Search = () => {
  const [menulist, setMenulist] = useContext(MenuContext);
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedFilterItems = debounce(() => {
    const filteredItems = menulist.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setMenulist(filteredItems);
  }, 600);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    if (searchTerm === "") {
      setMenulist(() => menulist);
      return;
    }
    debouncedFilterItems();
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
          setMenulist(() => menulist);
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
