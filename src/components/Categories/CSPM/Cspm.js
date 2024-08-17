import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import "./Cspm.css";


ChartJS.register(ArcElement, Tooltip, Legend);

const DoughChartComponent = ({ widgets, addwidget }) => {
  const options = {
    cutout: '60%', 
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: false, 
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  const plugins = [
    {
      id: 'textCenter',
      beforeDraw: (chart) => {
        const { ctx, chartArea, data } = chart;
        const width = chartArea.width;
        const height = chartArea.height;
        const textX = chartArea.left + width / 2;
        const textY = chartArea.top + height / 2;
        
        if (data && data.datasets && data.datasets.length > 0) {
          const total = data.datasets[0].data.reduce((a, b) => a + b, 0);

          ctx.restore();
          ctx.font = 'bolder 20px Arial';
          ctx.textBaseline = 'middle';
          ctx.textAlign = 'center';
          ctx.fillText(total, textX, textY - 10);
          ctx.font = '14px Arial';
          ctx.fillText('Total', textX, textY + 10);
          ctx.save();
        }
      },
    },
  ];

  return (
    <div className='d-flex flex-column '>
      <h5 className='px-5 mt-5'>CSPM Dashboard</h5>
      <div className='d-flex flex-wrap justify-content-center'>
        {widgets.map((widget, index) => (
          <div className='cspm-main card m-2' key={index}>
            <h5 className=' mx-3 my-2'>{widget.data.name}</h5>
            <div className='card-body '>
            
              <div className="chart-container">
                <Doughnut data={widget.data} options={options} plugins={plugins} />
              </div>
              <div className="chart-legend">
                {widget.data.labels.map((label, i) => (
                  <div key={i} className="legend-item">
                    <span className="legend-color" style={{ backgroundColor: widget.data.datasets[0].backgroundColor[i] }}></span>
                    {label} ({widget.data.datasets[0].data[i]})
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
        <div 
          className='cspm-main card m-2 add-widget-btn'
          onClick={addwidget}
        >
          <div className='card-body d-flex justify-content-center align-items-center'>
       
       <button className="add-widget-button" >
   <span className="icon">+</span>
   <span>Add Widget</span>
 </button>
     </div>
        </div>
      </div>
    </div>
  );
};

export default DoughChartComponent;
