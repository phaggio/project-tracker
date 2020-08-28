import React from 'react';
import { Link } from 'react-router-dom';

type PropsType = {
  itemData: DataObj;
}

type DataObj = {
  _id: string;
  status: string;
  name: string;
  description: string;
  type: string;
  parentId?: string;
  projectId?: string;
}

const ItemLink = ({ itemData }: PropsType) => {
  return (
    <Link className={`btn ${itemData.type === 'feature' ? 'btn-warning' : 'btn-light'} border border-dark w-100 text-left text-truncate`}
      title={itemData.name}
      to={`/${itemData.type}/${itemData._id}`}>
      {itemData.name}
    </Link>
  )
}

export default ItemLink;