import React, { useState } from 'react';
import './Form.css'; // Ensure this path is correct
import { useDispatch } from 'react-redux';
import { add } from '../redux/Slices/dataslice';

const Form = ({ selectedChartType, onAddWidget, handleWidget }) => {
  const [formData, setFormData] = useState({
    widgetname: '',
    labels: [{ labelname: '', quantity: '', backgroundcolor: '' }],
  });

  const dispatch = useDispatch();

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedLabels = formData.labels.map((label, i) =>
      i === index ? { ...label, [name]: value } : label
    );
    setFormData({ ...formData, labels: updatedLabels });
  };

  const handleAddMore = () => {
    setFormData({
      ...formData,
      labels: [...formData.labels, { labelname: '', quantity: '', backgroundcolor: '' }],
    });
  };

  const handleWidgetNameChange = (e) => {
    setFormData({ ...formData, widgetname: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.widgetname || formData.labels.some(label => !label.labelname || !label.quantity || !label.backgroundcolor)) {
      console.error('Form data is incomplete:', formData);
      return;
    }

    dispatch(add({ chartType: selectedChartType, widgetData: formData }));
    console.log('Widget data submitted:', formData);

    if (onAddWidget) {
      onAddWidget();
    }
    setFormData({ widgetname: '',
      labels: [{ labelname: '', quantity: '', backgroundcolor: '' }],
    })
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <button 
          type="button" 
          className="close-button position-absolute top-0 end-0" 
          onClick={handleWidget}
        >
          X
        </button>
        <div className="form-group">
          <label htmlFor="widgetname" className="form-label">Widget Name</label>
          <input
            type="text"
            id="widgetname"
            name="widgetname"
            className="form-input"
            value={formData.widgetname}
            onChange={handleWidgetNameChange}
            required
          />
        </div>

        {formData.labels.map((label, index) => (
          <div key={index} className="form-group">
            <label htmlFor={`labelname-${index}`} className="form-label">Label Name</label>
            <input
              type="text"
              id={`labelname-${index}`}
              name="labelname"
              className="form-input"
              value={label.labelname}
              onChange={(e) => handleInputChange(e, index)}
              required
            />
            <label htmlFor={`quantity-${index}`} className="form-label">Items</label>
            <input
              type="number"
              id={`quantity-${index}`}
              name="quantity"
              className="form-input"
              value={label.quantity}
              onChange={(e) => handleInputChange(e, index)}
              required
            />
            <label htmlFor={`backgroundcolor-${index}`} className="form-label">Enter Background Color</label>
            <input
              type="text"
              id={`backgroundcolor-${index}`}
              name="backgroundcolor"
              className="form-input"
              value={label.backgroundcolor}
              onChange={(e) => handleInputChange(e, index)}
              required
            />
          </div>
        ))}

        <div className="d-flex justify-content-between align-items-center">
          <button
            type="button"
            className="add-more-btn2"
            onClick={handleAddMore}
          >
            + Add More Data
          </button>
          <button
            type="submit"
            className="save-btn"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
