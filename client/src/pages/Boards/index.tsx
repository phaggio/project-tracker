import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { itemRequest } from '../../httpRequests';
import { ItemType } from '../../util/dataTypes';
import { ConsoleLogButton } from '../../components';

const Boards = () => {

  const [items, updateItems] = useState<ItemType[]>([]);

  useEffect(() => {
    itemRequest
      .getAllWorkItems()
      .then(res => {
        updateItems(res.data)
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h4>Coming soon ... </h4>
        </div>
      </div>
      <div className="row">
        {items ? items.map(item => {
          return <Link className="btn btn-secondary btn-sm mr-2"
            key={item._id} to={`/${item.type}/${item._id}`}>{item.name}</Link>
        })
          :
          'no item'}
      </div>

      <ConsoleLogButton name="items" state={items} />
    </div>
  )
}

export default Boards;