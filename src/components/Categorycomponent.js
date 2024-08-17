import React from 'react';
import DoughChartComponent from "../components/Categories/CSPM/Cspm";
import Registry from './Categories/RegistryScan/Registryscan';
import LineChartComponent from './Categories/CWPP/Cwpp';

const CategoryComponent = ({ category, addWidget }) => {
  const { chartType, widgets } = category;

  const renderChart = () => {
    switch (chartType) {
      case 'CSPM':
        return <DoughChartComponent widgets={widgets} addwidget={() => addWidget(category)} />;
      case 'Registry':
        return <Registry widgets={widgets} addwidget={() => addWidget(category)} />;
      case 'CWPP':
        return <LineChartComponent widgets={widgets} addwidget={() => addWidget(category)} />;
      default:
        return null;
    }
  };

  return (
    <div>
      {renderChart()}
    </div>
  );
};

export default CategoryComponent;
