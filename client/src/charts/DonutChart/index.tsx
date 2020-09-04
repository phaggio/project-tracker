import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const title = 'Features'

const data = {
  labels: ['Open', 'Active', 'Completed',
    'In-review', 'Closed'],
  datasets: [
    {
      label: 'Open',
      backgroundColor: [
        '#B21F00',
        '#C9DE00',
        '#2FDE00',
        '#00A6B4',
        '#6800B4'
      ],
      hoverBackgroundColor: [
        '#501800',
        '#4B5000',
        '#175000',
        '#003350',
        '#35014F'
      ],
      data: [20, 12, 4, 8, 28]
    },
    {
      label: 'Closed',
      backgroundColor: [
        '#B21F00',
        '#C9DE00',
        '#2FDE00',
        '#00A6B4',
        '#6800B4'
      ],
      hoverBackgroundColor: [
        '#501800',
        '#4B5000',
        '#175000',
        '#003350',
        '#35014F'
      ],
      data: [30, 32, 14, 11, 18]
    }
  ]
}

const DonutChart = () => {


  return (
    <div>
      <Doughnut data={data}
        options={{
          title: {
            display: true,
            text: title,
            fontSize: 12
          },
          legend: {
            display: true,
            position: 'right'
          },
          responsive: false
        }}
      />

    </div>
  )
}

export default DonutChart