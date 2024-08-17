import React, { useEffect } from 'react';
import "./Registryscan.css";

const Registry = ({ widgets, addwidget }) => {
  useEffect(() => {
    console.log(widgets);
  }, [widgets]);

  return (
    <div className='d-flex flex-column '>
        <h5 className='px-5 mt-5'>Registry Scan</h5>
        <div className=" d-flex flex-wrap justify-content-center">
          {widgets.map((widget, index) => {
            const data = widget.data.datasets[0].data; 
            const total = data.reduce((acc, value) => acc + value, 0); 

            const getPercentage = (value) => (value / total) * 100; 

            return (
              <div key={index} className="cspm-main card m-2" >
                <div className="card-body">
                  <div className="risk-assessment-container">
                    <h5>{widget.data.name}</h5>
                    <div className="total-vulnerabilities">
                      <strong>{total}</strong> Total Vulnerabilities
                    </div>
                    <div className="risk-bar">
                      {data.map((value, i) => (
                        <div
                          key={i}
                          className="risk-segment"
                          style={{
                            height: "16px",
                            width: `${getPercentage(value)}%`,
                            backgroundColor: widget.data.datasets[0].backgroundColor[i],
                          }}
                        />
                      ))}
                    </div>
                    <div className="risk-legend mt-3">
                      {data.map((value, i) => (
                        <div
                          key={i}
                          className="legend-item"
                          style={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}
                        >
                          <div
                            style={{
                              backgroundColor: widget.data.datasets[0].backgroundColor[i],
                              width: '14px',
                              height: '12px',
                              marginRight: '8px',
                              borderRadius: '2px',
                            }}
                          />
                          <span>{widget.data.labels[i]} ({value})</span>
                        </div>
                      ))}
                    </div>
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

export default Registry;