import React, { useState } from 'react';
import { PieChart, Pie, Sector } from 'recharts';

const data = [
  { name: 'Open', value: 70 },
  { name: 'Active', value: 50 },
  { name: 'Completed', value: 20 },
  { name: 'In-review', value: 30 },
];

type StatusPieChartProps = {
  dataArr: DataType[];
}

type DataType = {
  name: string;
  value: number;
}

const StatusPieChart = (
  { dataArr }: StatusPieChartProps
) => {

  const [activeIndex, updateActiveIndex] = useState(0);

  type PropsType = {
    cx: number; cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    startAngle: number;
    endAngle: number;
    fill: string;
    payload: PayloadType;
    percent: number;
    value: number
  }

  type PayloadType = {
    name: string;
  }

  const renderActiveShape = (props: PropsType) => {
    const RADIAN = Math.PI / 180;
    const {
      cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
      fill, payload, percent, value,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${value}`}</text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
          {`(${(percent * 100).toFixed(0)}%)`}
        </text>
      </g>
    );
  };

  return (
    <PieChart width={320} height={230}>
      <Pie
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        data={dataArr}
        cx={160}
        cy={100}
        innerRadius={40}
        outerRadius={60}
        fill="#8884d8"
        dataKey="value"
        onMouseEnter={(e) => {
          updateActiveIndex(dataArr.findIndex((obj: DataType) => obj.name === e.name))
        }}
      />
    </PieChart>
  );
}

export default StatusPieChart;

// export default class Example extends PureComponent {

//   state = {
//     activeIndex: 0,
//   };

//   onPieEnter = (data: DataType, index: number) => {
//     console.log(data.name)
//     this.setState({
//       activeIndex: index,
//     });
//   };

//   render() {
//     return (
//       <PieChart width={320} height={230}>
//         <Pie
//           activeIndex={this.state.activeIndex}
//           activeShape={renderActiveShape}
//           data={data}
//           cx={160}
//           cy={100}
//           innerRadius={40}
//           outerRadius={60}
//           fill="#8884d8"
//           dataKey="value"
//           onMouseEnter={(event) => {
//             console.log(event);
//             // this.onPieEnter;
//           }}
//         />
//       </PieChart>
//     );
//   }
// }
