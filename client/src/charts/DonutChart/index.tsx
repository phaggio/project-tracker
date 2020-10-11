import React from 'react';
import { Doughnut } from 'react-chartjs-2';

type PropsType = {
  title: string;
  position?: "right" | "left" | "top" | "bottom" | "chartArea" | undefined;
  type?: string;
  loading?: boolean;
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
    <div className="d-flex justify-content-center">
      {props.loading ?
        <div className="d-flex justify-content-center">
          <div className="font-weight-lighter">loading ...</div>
        </div>
        :
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
      }
    </div>
  )
}

export default DonutChart