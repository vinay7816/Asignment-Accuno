import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChartComponent = ({ widgets, addwidget }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        type: 'category',
        grid: {
          display: false,
        },
      },
      y: {
        type: 'linear',
        beginAtZero: true,
        grid: {
          borderDash: [5, 5],
        },
      },
    },
  };

  return (
    <div className="d-flex flex-column ">
      <h5 className='px-5 mt-5'>CWPP Dashboard</h5>
      <div className='d-flex flex-wrap justify-content-center'>
        {widgets.map((widget, index) => {
          const { name, labels, datasets } = widget.data;

          const dataset = datasets[0];

          const data = {
            labels: labels,
            datasets: [{
              label: name,
              data: dataset.data,
              borderColor: dataset.backgroundColor[0],
              backgroundColor: dataset.backgroundColor[0],
              fill: false,
              tension: 0.1,
            }],
          };

          return (
            <div key={index} className='cspm-main card m-2' >
              <div className='card-body d-flex flex-column align-items-center justify-content-center' style={{ padding: '1.5rem' }}>
                <h6 className='mb-3'>{name}</h6>
                <div className="chart-container" style={{ position: 'relative', height: '300px', width: '90%' }}>
                  <Line data={data} options={options} />
                </div>
              </div>
            </div>
          );
        })}
        
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

export default LineChartComponent;
