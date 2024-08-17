import React, { useState } from 'react';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const Navbar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div 
      className='d-flex justify-content-between align-items-center' 
      style={{ 
        width: "100%", 
        height: "50px", 
        backgroundColor: "white", 
        boxShadow: "0px 4px 2px rgba(0, 0, 0, 0.1)", 
       
        boxSizing: "border-box" 
      }}
    >
      <div className="d-flex align-items-center">
        <span className='dash-heading' style={{ color: "#6c757d",paddingLeft:"20px" }}>Home</span>
        <ChevronRightIcon style={{ margin: "0 5px", color: "#6c757d", fontSize: "7px" }} />
        <span className='dash-heading' style={{ fontWeight: "bold" }}>Dashboard V2</span>
      </div>
      <div className='d-flex align-items-center'>
        <input 
          className="form-control" 
          type="search" 
          placeholder="Search anything..." 
          aria-label="Search" 
          value={searchQuery}
          onChange={handleSearchChange}
          style={{ 
            borderRadius: "20px", 
            padding: "5px 10px", 
            width: "90%", 
            boxSizing: "border-box"  
          }} 
        />
      </div>
    </div>
  );
};

export default Navbar;
