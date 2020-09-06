import React from 'react';
import { Doughnut } from 'react-chartjs-2';

type PropsType = {
  title: string;
  data: number[];
}

const DonutChart = () => {

  const data = {
    labels: ['chart 1','chart 2'],
    datasets: [
      {
        labels: ['Feature', 'Work item', 'Bug'],
        backgroundColor: [
          'Orange',
          'Gray',
          'Crimson'
        ],
        hoverBackgroundColor: [
          'DarkOrange',
          'DimGray',
          'DarkRed'
        ],
        data: [10, 10, 10]
      },
      {
        labels: ['Open', 'Active', 'Completed', 'In-review', 'Closed', 'active', 'completed', 'closed', 'open', 'Active', 'In-review'],
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
        data: [2, 2, 2, 2, 2, 3, 4, 3, 5, 2, 3]
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
            text: 'TITLE HERE',
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