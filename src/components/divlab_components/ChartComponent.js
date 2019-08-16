import React from 'react';
import { Chart } from '@bit/primefaces.primereact.chart';
import { parse } from '@babel/core';

export default function ChartComponent(props) {
  const { labels, datasets, dataTypes } = props.info;
  let separatedDatasets = datasets.split(' || ');
  let parsedDatatypes = dataTypes.split(', ');

  const data = {
    labels: labels.split(', '),
    datasets: [
      {
        type: 'line',
        label: parsedDatatypes[0],
        borderColor: '#2196F3',
        borderWidth: 2,
        fill: false,
        data: separatedDatasets[0] && [...separatedDatasets[0].split(', ')],
      },
      {
        type: 'bar',
        label: parsedDatatypes[1],
        backgroundColor: '#4CAF50',
        data: separatedDatasets[1] && [...separatedDatasets[1].split(', ')],
        borderColor: 'white',
        borderWidth: 2,
      },
      {
        type: 'bar',
        label: parsedDatatypes[2],
        backgroundColor: '#FFC107',
        data: separatedDatasets[2] && [...separatedDatasets[2].split(', ')],
      },
    ],
  };

  const options = {
    responsive: true,
    title: {
      display: true,
      text: 'Combo Bar Line Chart',
    },
    tooltips: {
      mode: 'index',
      intersect: true,
    },
  };

  return labels.length || datasets.length || dataTypes.length ? (
    <div>
      <div style={{ width: 500 }}>
        <Chart type="bar" data={data} options={options} />
      </div>
    </div>
  ) : (
    <img alt="" src="images/ChartExample.png" />
  );
}
