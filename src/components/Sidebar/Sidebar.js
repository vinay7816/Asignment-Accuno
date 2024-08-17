import React, { useState, useEffect } from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { useSelector, useDispatch } from 'react-redux';
import Form from '../Form';
import DeleteIcon from '@mui/icons-material/Delete';
import { Tooltip } from '@mui/material';

import './Sidebar.css'; 
import { remove } from '../../redux/Slices/dataslice';

export default function Sidebar({ open, onClose, category }) {
  const [openwid, setOpenWid] = useState(false);
  const dispatch = useDispatch();
  const initialcategories = useSelector((state) => state.categories);
  const [categories, setCategories] = useState(initialcategories);

  const { chartType = '', widgets = [] } = category || {};

  const [selectedChartType, setSelectedChartType] = useState(chartType || 'CSPM');

  const handleWidget = () => {
    setOpenWid(!openwid);
  };

  useEffect(() => {
    if (category) {
      setSelectedChartType(category.chartType || 'CSPM');
    }
  }, [category]);

  const handleChartTypeChange = (newValue) => {
    setSelectedChartType(newValue);
  };

  const selectedCategory = categories.find((cat) => cat.chartType === selectedChartType);
  const filteredWidgets = selectedCategory ? selectedCategory.widgets : [];

  useEffect(() => {
    setCategories(initialcategories);
  }, [initialcategories, selectedChartType]);

  const handleRemoveWidget = (widgetName) => {
    console.log(selectedChartType, widgetName )
    dispatch(remove({ chartType: selectedChartType, widgetName }));
  };

  const list = () => (
    <div className="sidebar-container">
      <div className="sidebar-header">Select Chart Type</div>
      <div className="sidebar-tabs">
        {["CSPM", "CWPP", "Registry"].map((item) => (
          <div
            key={item}
            className={`sidebar-tab ${selectedChartType === item ? 'selected' : ''}`}
            onClick={() => handleChartTypeChange(item)}
          >
            {item}
          </div>
        ))}
      </div>
      <div className="sidebar-content">
        {filteredWidgets.length === 0 ? (
          <div>No charts available for this category.</div>
        ) : (
          filteredWidgets.map((widget) => (
            <div key={widget.data.name} className='d-flex justify-content-between align-items-center widget-item'>
              <div>
                {widget.data.name}
              </div>
              <Tooltip title="Remove widget">
                <div style={{ cursor: "pointer" }} onClick={() => handleRemoveWidget(widget.data.name)}>
                  <DeleteIcon />
                </div>
              </Tooltip>
            </div>
          ))
        )}
        <button type="button" className="add-more-btn" onClick={handleWidget}>
          + Add widget
        </button>
       
        {openwid && <Form selectedChartType={selectedChartType} handleWidget={handleWidget}/>}
      </div>
    </div>
  );

  return (
    <SwipeableDrawer anchor="right" open={open} onClose={onClose}>
      {list()}
    </SwipeableDrawer>
  );
}