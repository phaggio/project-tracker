import React from 'react';
import { Link } from 'react-router-dom';

type PropsType = {
  to?: string;
  type?: string;
  count?: number;
}

const CountCard = (props: PropsType) => {

  const color = ((type) => {
    switch (type) {
      case 'project':
        return 'primary';
      case 'feature':
        return 'warning';
      case 'workItem':
        return 'secondary';
      case 'bug':
        return 'danger';
      default:
        return 'primary';
    }
  })(props.type)

  const name = ((type) => {
    switch (type) {
      case 'project':
        return 'Projects';
      case 'feature':
        return 'Features';
      case 'workItem':
        return 'Work items';
      case 'bug':
        return 'Bugs';
      default:
        return 'Items';
    }
  })(props.type)

  return (
    <Link className={`btn card text-white text-center bg-${color}`}
      to={props.to ? props.to : '/'}>
      <div className="card-body p-lg-2">
        <div className="display-4">{props.count ? props.count : 0}</div>
        <div className="card-text">{name}</div>
      </div>
    </Link>
  )
}

export default CountCard;