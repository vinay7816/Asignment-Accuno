import React, { useState, useEffect } from 'react';
import DoughChartComponent from "../components/Categories/CSPM/Cspm";
import Sidebar from './Sidebar/Sidebar';
import Registry from './Categories/RegistryScan/Registryscan';
import LineChartComponent from './Categories/CWPP/Cwpp';


const CategoryComponent = ({ category}) => {
  const { chartType, widgets } = category;
  
  const [selectedCategory, setSelectedCategory] = useState(category);
    
     const addWidget=(category) => {
      setOpenSidebar(true);
      setSelectedCategory(category);
     }
 
     const [openSidebar, setOpenSidebar] = useState(false);

  useEffect(() => {
    console.log("category",category)
    setSelectedCategory(category); 
    console.log("cccc",selectedCategory)
  }, [selectedCategory]);
  
  const renderChart = () => {
    switch (chartType) {
      case 'CSPM':
        return <DoughChartComponent widgets={widgets} addwidget={addWidget} />;
      case 'Registry':
        return <Registry widgets={widgets} addwidget={addWidget}/>
      case 'CWPP':
        return <LineChartComponent widgets={widgets} addwidget={addWidget} />;
     
      
     
      default:
        return null;
    }
  };

  return (
    <div>
      {renderChart()}
      <Sidebar
        open={openSidebar}
        onClose={() => setOpenSidebar(false)}
        category={selectedCategory} 
      />
    </div>
  );
};

export default CategoryComponent;
