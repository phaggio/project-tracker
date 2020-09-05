import React from 'react';
import { Doughnut } from 'react-chartjs-2';

type PropsType = {
  title: string;
  data: number[];
}

const DonutChart = (props: PropsType) => {

  const data = {
    labels: ['Open', 'Active', 'Completed',
      'In-review', 'Closed'],
    datasets: [
      {
        backgroundColor: [
          'BlanchedAlmond',
          'Orange',
          'ForestGreen',
          'DarkOrchid',
          'Gray'
        ],
        hoverBackgroundColor: [
          'Bisque',
          'DarkOrange',
          'DarkGreen',
          'DarkMagenta',
          'DimGray'
        ],
        data: props.data
      },
      {
        backgroundColor: [
          'BlanchedAlmond',
          'Orange',
          'ForestGreen',
          'DarkOrchid',
          'Gray'
        ],
        hoverBackgroundColor: [
          'Bisque',
          'DarkOrange',
          'DarkGreen',
          'DarkMagenta',
          'DimGray'
        ],
        data: [10,2,3,4,5]
      },
    ]
  }

  return (
    <div>
      <Doughnut data={data}
        height={300}
        options={{
          title: {
            display: true,
            text: props.title,
            fontSize: 12,
            position: 'top'
          },
          legend: {
            display: true,
            position: 'bottom'
          },
          responsive: false
        }}
      />

    </div>
  )
}

export default DonutChart