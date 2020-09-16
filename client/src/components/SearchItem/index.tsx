import React from 'react';
import { Link } from 'react-router-dom';

type PropsType = {
  type: string;
  name: string;
  status: string;
  assignee: string;
  to: string;
}

const SearchItem = (props: PropsType) => {

  const color = ((type: string) => {
    switch (type) {
      case 'feature':
        return 'warning';
      case 'work':
        return 'dark';
      case 'bug':
        return 'danger';
      default:
        return 'dark';
    }
  })(props.type);

  const titleName = ((type: string) => {
    switch (type) {
      case 'feature':
        return 'Feature: ';
      case 'work':
        return 'Work: ';
      case 'bug':
        return 'Bug: ';
      default:
        return 'Item: ';
    }
  })(props.type);

  return (

    <div className="card rounded mb-2">

      <div className="p-1">
        <div className="d-flex align-items-baseline mb-1">
          <label className={`text-${color} font-weight-light m-0 mr-2`}>{`${titleName}`}</label>
          <small className="font-weight-bold">{props.name}</small>
        </div>

        <div className="d-flex justify-content-between align-items-end">
          <div className="d-flex flex-column">
            <div className="d-flex align-items-baseline">
              <label className="font-weight-light m-0 mr-1">Status: </label>
              <small className="font-weight-bold">{props.status}</small>
            </div>
            <div className="d-flex align-items-baseline">
              <label className="font-weight-light m-0 mr-1">Assignee: </label>
              <small className="font-weight-bold">{props.assignee}</small>
            </div>

          </div>
          <Link className={`btn btn-${color} btn-sm`} to={props.to}>View</Link>
        </div>

      </div>
    </div>

  )
}


export default SearchItem;