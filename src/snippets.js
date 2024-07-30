import React, { useState } from "react";

const SearchComponent = () => {
  // Sample list of items
  const [items, setItems] = useState([
    "Apple",
    "Banana",
    "Orange",
    "Mango",
    "Pineapple",
    "Grapes"
  ]);

    // Debounced filter function
  const debouncedFilterItems = debounce((term) => {
    const lowercasedTerm = term.toLowerCase();
    const newFilteredItems = originalList.filter(item =>
      item.name.toLowerCase().includes(lowercasedTerm)
    );
    setFilteredItems(newFilteredItems);
  }, 300); // Adjust the delay (300ms) as needed
  
  // State to keep track of the search input
  const [searchTerm, setSearchTerm] = useState("");

  // Filtered items based on the search input
  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handler for search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <h1>Search List</h1>
      <input
        type='text'
        placeholder='Search...'
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <ul>
        {filteredItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
  
  

export default SearchComponent;
