import React from 'react';
import { Link } from 'react-router-dom';
import { ItemType } from '../../util/dataTypes';

type PropsType = {
  item: ItemType;
};

const ItemLink = ({ item }: PropsType) => {
  let color: string = '';
  switch (item.type) {
    case 'feature':
      color = 'btn-warning';
      break;
    case 'workItem':
      color = 'btn-light';
      break;
    case 'bug':
      color = 'btn-danger';
      break;
    default:
      break;
  };

  return (
    <Link className={`btn ${color} w-100 text-left text-truncate shadow`}
      title={item.name}
      to={`/${item.type}/${item._id}`}>
      {item.name}
    </Link>
  )
}

export default ItemLink;