import React from 'react';
import { Doughnut } from 'react-chartjs-2';

type PropsType = {
  title: string;
  position?: "right" | "left" | "top" | "bottom" | "chartArea" | undefined;
  type?: string;
  data: number[];
}

const DonutChart = (props: PropsType) => {
  const projectLabels = ['Open', 'Archived'];
  const itemLabels = ['Open', 'Active', 'Completed', 'In-review', 'Closed'];

  const projectColorMap = {
    backgroundColor: ['Orange', 'Grey'],
    hoverBackgroundColor: ['DarkOrange', 'DimGrey']
  }

  const itemsColorMap = {
    backgroundColor: ['BlanchedAlmond', 'Orange', 'ForestGreen', 'DarkOrchid', 'Gray'],
    hoverBackgroundColor: ['Bisque', 'DarkOrange', 'DarkGreen', 'DarkMagenta', 'DimGray']
  }

  const data = {
    labels: props.type === 'project' ? projectLabels : itemLabels,
    datasets: [
      {
        backgroundColor: props.type === 'project' ? projectColorMap.backgroundColor : itemsColorMap.backgroundColor,
        hoverBackgroundColor: props.type === 'project' ? projectColorMap.hoverBackgroundColor : itemsColorMap.hoverBackgroundColor,
        data: props.data
      }
    ]
  }

  return (
    <div>
      <Doughnut data={data}

        options={{
          title: {
            display: true,
            text: props.title,
            fontSize: 12,
            position: 'top'
          },
          legend: {
            display: true,
            position: props.position ? props.position : "right"
          },
          responsive: true
        }}
      />

    </div>
  )
}

export default DonutChart