import React from 'react';
import { Link } from 'react-router-dom';

type PropsType = {
  to?: string;
  type?: string;
  count?: number;
  loading?: boolean;
}

const CountCard = (props: PropsType) => {

  const color = ((type) => {
    switch (type) {
      case 'project':
        return 'primary';
      case 'feature':
        return 'warning';
      case 'work':
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
      case 'work':
        return 'Work items';
      case 'bug':
        return 'Bugs';
      default:
        return 'Items';
    }
  })(props.type)

  return (
    <Link className={`btn card text-white text-center bg-${color} h-100`}
      style={{ minHeight: "121px" }}
      to={props.to ? props.to : '/'}>
      <div className="card-body p-lg-2">
        {
          props.loading ?
            <div className="card-text">loading...</div>
            :
            <div>
              <div className="display-4">{props.count}</div>
              <div className="card-text">{name}</div>
            </div>
        }
      </div>
    </Link>
  )
}

export default CountCard;