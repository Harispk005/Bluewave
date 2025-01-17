import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
const Search = ({ searchquerry, setSearchquery }) => {
    const handleSearchChange = (e) => {
        setSearchquery(e.target.value);
    };

    return (
        <div style={{ marginRight: "20px", marginTop: "10px" }}>
            <input 
                type="text" 
                placeholder="🔍 Search" 
                value={searchquerry} 
                onChange={handleSearchChange} 
                style={{ padding: "8px", fontSize: "16px", borderRadius: "4px" }} // Optional: basic styling
            />
        </div>
    );
};

export default Search;
