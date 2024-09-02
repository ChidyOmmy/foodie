import { styled } from "@mui/material/styles";
import { Button, IconButton } from "@mui/material";
import { grey } from "@mui/material/colors";
import Clear from "@mui/icons-material/Clear";
import { useStore } from "../store/productsStore";

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
  const searchTerm = useStore((state) => state.searchTerm);
  const searchType = useStore((state) => state.searchType);
  const setSearchTerm = useStore((state) => state.setSearchTerm);
  const setSearchType = useStore((state) => state.setSearchType);

  const clearSearch = () => {
    setSearchTerm("");
  };

  const handleSearchChange = (event) => {
    const newSearchTerm = event.target.value;
    if (searchType !== "title") {
      setSearchType("title");
    }
    setSearchTerm(newSearchTerm);
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
        value={searchTerm}
        onClick={() => console.log("searching...")}
        variant='contained'
        sx={{ borderRadius: 15, margin: 0 }}>
        Search
      </Button>
    </SearchBox>
  );
};

export default Search;
