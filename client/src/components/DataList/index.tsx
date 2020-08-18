import React from 'react';

type DataListProps = {
  dataArr: Item[];
  listName: string;
  defaultOption: string;
}

type Item = {
  name: string;
  _id: string;
}

const DataList = ({ dataArr, listName, defaultOption }: DataListProps) => {
  return (
    <div>
      <datalist id={listName}>
        {dataArr.length ? dataArr.map(data => {
          return (
            <option className="dropdown-item"
              key={data._id}
              // value={data.name}
            >
              {`${data.name}/ ${data._id}`}
            </option>
          )
        })
          :
          <option className="dropdown-item"
            value={defaultOption}>
          </option>
        }
      </datalist>
    </div>
  )
}

export default DataList