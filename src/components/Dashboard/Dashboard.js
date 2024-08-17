import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import CategoryComponent from '../Categorycomponent';
import LoopIcon from '@mui/icons-material/Loop';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import { useSelector } from 'react-redux';
import Sidebar from "../Sidebar/Sidebar"
import './Dashboard.css'; 

const Dashboard = () => {
  const [selectedOption, setSelectedOption] = useState('Last 2 days');
  const [searchQuery, setSearchQuery] = useState('');
  const categories = useSelector((state) => state.categories);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSelect = (option) => {
    setSelectedOption(option);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const addWidget = (category) => {
    setSelectedCategory(category);
    setOpenSidebar(true);
  };

  const filteredCategories = categories.map((category) => ({
    ...category,
    widgets: category.widgets.filter(widget =>
      widget.data.name.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter(category => category.widgets.length > 0);

  return (
    <div className="dashboard-container">
      <Navbar onSearch={handleSearch} />
      <div className="dashboard-content">
        <div className="dashboard-header d-flex justify-content-between align-items-center p-3">
          <h5 className="dashboard-title">CNAPP Dashboard</h5>
          <div className="dashboard-controls d-flex align-items-center">
            <div className="icon-container mx-2">
              <LoopIcon />
            </div>
            <div className="icon-container">
              <MoreVertIcon />
            </div>
            <button className="btn add-widget-button mx-2" onClick={() => addWidget(null)}>
              <span className="icon">+</span>
              <span>Add Widget</span>
            </button>
            <div className="dropdown">
              <button
                className="btn dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <AccessTimeFilledIcon style={{ marginRight: '3px', color:"#1E2482" }} />
                <span className="vertical-line"></span>
                {selectedOption}
              </button>
              <ul className="dropdown-menu dropdown-menu-dark">
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() => handleSelect('Last 1 day')}
                  >
                    Last 1 day
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() => handleSelect('Last 7 days')}
                  >
                    Last 7 days
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() => handleSelect('Last 30 days')}
                  >
                    Last 30 days
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div>
          {filteredCategories.map((category) => (
            <CategoryComponent key={category.chartType} category={category} addWidget={addWidget} />
          ))}
        </div>
      </div>
      {openSidebar && (
        <Sidebar
          open={openSidebar}
          onClose={() => setOpenSidebar(false)}
          category={selectedCategory}
        />
      )}
    </div>
  );
};

export default Dashboard;
