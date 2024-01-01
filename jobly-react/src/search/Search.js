import React, { useState } from "react";

const Search = ({onSearch})=> {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (e)=> {
        setSearchTerm(e.target.value);
        onSearch(searchTerm)
    };

    return (
        <div>
        <label htmlFor="search">Search: </label>
        <input 
        type="text"
        id="search"
        value={searchTerm}
        placeholder="Enter search term.."
        onChange={handleSearchChange}
        />
      </div>
    )

};

export default Search;