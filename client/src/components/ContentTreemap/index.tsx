import React, { PureComponent } from 'react';
import { ResponsiveContainer, Treemap } from 'recharts';

const data = [
  {
    name: 'axis',
    children: [
      { name: 'Axes', size: 1302 },
      { name: 'Axis', size: 24593 },
      { name: 'AxisGridLine', size: 652 },
      { name: 'AxisLabel', size: 636 }
    ],
  },
  {
    name: 'controls',
    children: [
      { name: 'AnchorControl', size: 2138 },
      { name: 'ClickControl', size: 3824 },
      { name: 'Control', size: 1353 },
      { name: 'ControlList', size: 4665 },
      { name: 'DragControl', size: 2649 },
      { name: 'ExpandControl', size: 2832 },
      { name: 'HoverControl', size: 4896 },
      { name: 'IControl', size: 763 }
    ],
  },
  {
    name: 'data',
    children: [
      { name: 'Data', size: 20544 },
      { name: 'DataList', size: 19788 },
      { name: 'DataSprite', size: 10349 },
      { name: 'EdgeSprite', size: 3301 },
      { name: 'NodeSprite', size: 19382 },
      {
        name: 'render',
        children: [
          { name: 'ArrowType', size: 698 },
          { name: 'EdgeRenderer', size: 5569 },
          { name: 'IRenderer', size: 353 },
          { name: 'ShapeRenderer', size: 2247 },
        ],
      }
    ]
  }
];


// type PropsType = {
//   root: any;
//   depth: number;
//   x: number;
//   y: number;
//   width: number;
//   height: number;
//   index: number;
//   payload: any;
//   colors: [];
//   rank: any;
//   name: string;
// }

const COLORS = ['#8889DD', '#9597E4', '#8DC77B', '#A5D297', '#E2CF45', '#F8C12D'];

// export default class ContentTreemap extends PureComponent {
//   render() {
//     return (
//       // <ResponsiveContainer>
//         <Treemap
//           width={700}
//           height={250}
//           data={data}
//           dataKey="size"
//           aspectRatio={16 / 9}
//           stroke="#fff"
//           fill="#8884d8"
//         />
//       // </ResponsiveContainer>
//     )
//   }
// }

type PropsType = {
  maxChartWidth: number;
}

const ContentTreemap = () => {
    return (
      <ResponsiveContainer maxHeight="300px">
        <Treemap
          width={500}
          height={250}
          data={data}
          dataKey="size"
          aspectRatio={16 / 9}
          stroke="#fff"
          fill="#8884d8"
        />
      </ResponsiveContainer>
    )
}

export default ContentTreemap


// const ContentTreemap = (props: PropsType) => {
//   const CustomizedContent = () => {
//     return (
//       <g>
//       <rect
//         x={props.x}
//         y={props.y}
//         width={props.width}
//         height={props.height}
//         style={{
//           fill: props.depth < 2 ? props.colors[Math.floor(props.index / props.root.children.length * 6)] : 'none',
//           stroke: '#fff',
//           strokeWidth: 2 / (props.depth + 1e-10),
//           strokeOpacity: 1 / (props.depth + 1e-10),
//         }}
//       />
//       {
//         props.depth === 1 ? (
//           <text
//             x={props.x + props.width / 2}
//             y={props.y + props.height / 2 + 7}
//             textAnchor="middle"
//             fill="#fff"
//             fontSize={14}
//           >
//             {name}
//           </text>
//         ) : null
//       }
//       {
//         props.depth === 1 ? (
//           <text
//             x={props.x + 4}
//             y={props.y + 18}
//             fill="#fff"
//             fontSize={16}
//             fillOpacity={0.9}
//           >
//             {props.index + 1}
//           </text>
//         ) : null
//       }
//     </g>
//     )
//   }
// }



