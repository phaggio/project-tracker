import React from 'react';
import { Link } from 'react-router-dom';

type PropsType = {
  type: string;
  count: number;
  to?: string;
}

// not being used
const SmallCountCard = (props: PropsType) => {
  const color = ((type) => {
    switch (type) {
      case 'feature':
        return 'warning';
      case 'work':
        return 'secondary';
      case 'bug':
        return 'danger';
      default:
        return 'secondary';
    }
  })(props.type)

  const name = ((type) => {
    switch (type) {
      case 'feature':
        return 'Features';
      case 'work':
        return 'Work items';
      case 'bug':
        return 'Bugs';
      default:
        return 'Items';
    }
  })(props.type)


  return (
    <Link className={`badge border badge-${color}`} style={{ minWidth: '80px' }} to={props.to ? props.to : '/'}>
      <h4 className="font-weight-bold">{props.count ? props.count : 0} </h4>
      <small className="text-center">{name}</small>
    </Link>
  )
}

export default SmallCountCard