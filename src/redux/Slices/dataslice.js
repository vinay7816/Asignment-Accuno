// redux/Slices/dataslice.js

import { createSlice } from "@reduxjs/toolkit";

const initialcategories = [
  {
    chartType: 'CSPM',
    widgets: [
      {
        data: {
          name: "cloud risk1",
          labels: ['Connected', 'Not Connected'],
          datasets: [{
            data: [2, 2],
            backgroundColor: ['rgb(54, 162, 235)', 'rgb(201, 203, 207)'],
            hoverOffset: 4,
          }]
        }
      },
      {
        data: {
          name: "cloud risk2",
          labels: ['high', 'critical', 'low', 'poor'],
          datasets: [{
            data: [1780, 240, 560, 250],
            backgroundColor: ['red', 'blue', 'green', 'yellow'],
            hoverOffset: 4,
          }]
        }
      }
    ]
  },
  {
    chartType: 'CWPP',
    widgets: [
      {
        data: {
          name: "Top 5 Name specific alerts",
          labels: ['Critical', 'High', 'Medium', 'Low'],
          datasets: [{
            data: [9, 150, 1000, 311],
            backgroundColor: ['rgb(255, 0, 0)', 'rgb(255, 99, 132)', 'rgb(255, 205, 86)', 'rgb(75, 192, 192)'],
            hoverOffset: 4,
          }]
        }
      },
      {
        data: {
          name: "Workload alerts",
          labels: ['Critical', 'High', 'Medium', 'Low'],
          datasets: [{
            data: [9, 150, 1000, 311],
            backgroundColor: ['rgb(255, 0, 0)', 'rgb(255, 99, 132)', 'rgb(255, 205, 86)', 'rgb(75, 192, 192)'],
            hoverOffset: 4,
          }]
        }
      }
    ]
  },
  {
    chartType: 'Registry',
    widgets: [
      {
        data: {
          name: "Image Risk Assesment ",
          labels: ['Critical', 'High', 'Medium', 'Low'],
          datasets: [{
            data: [9, 150, 1000, 311],
            backgroundColor: ['rgb(255, 0, 0)', 'rgb(255, 99, 132)', 'rgb(255, 205, 86)', 'rgb(75, 192, 192)'],
            hoverOffset: 4,
          }]
        }
      },
      {
        data: {
          name: "Image Security issues",
          labels: ['Critical', 'High', 'Medium', 'Low'],
          datasets: [{
            data: [9, 150, 1000, 311],
            backgroundColor: ['rgb(255, 0, 0)', 'rgb(255, 99, 132)', 'rgb(255, 205, 86)', 'rgb(75, 192, 192)'],
            hoverOffset: 4,
          }]
        }
      }
    ]
  }
   
];

const DataSlice = createSlice({
    name: "categories",
    initialState: initialcategories,
    reducers: {
      add(state, action) {
        const { chartType, widgetData } = action.payload;
        const category = state.find(cat => cat.chartType === chartType);
        if (category) {
          category.widgets.push({
            data: {
              name: widgetData.widgetname,
              labels: widgetData.labels.map(label => label.labelname),
              datasets: [{
                data: widgetData.labels.map(label => parseInt(label.quantity, 10)),
                backgroundColor: widgetData.labels.map(label => label.backgroundcolor),
                hoverOffset: 4,
              }]
            }
          });
        }
      },
      remove(state, action) {
        console.log("here in remove")
        const { chartType, widgetName } = action.payload;
        const category = state.find(cat => cat.chartType === chartType);
       
        if (category) {
          category.widgets = category.widgets.filter(widget => widget.data.name !== widgetName);
        }
      }
    }
  });
  
  export const { add, remove } = DataSlice.actions;
  export default DataSlice.reducer;