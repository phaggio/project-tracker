import React from 'react';

type ParentListProps = {
  dataArr: Item[];
  listName: string;
  defaultOption: string;
}

type Item = {
  name: string;
  _id: string;
  type: string;
}

const ParentList = ({ dataArr, listName, defaultOption }: ParentListProps) => {
  return (
    <div>
      <datalist id={listName}>
        {dataArr.length ? dataArr.map(data => {
          return (
            <option className="dropdown-item"
              key={data._id}
              // value={data.name}
            >
              {`${data.type}/${data.name}/${data._id}`}
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

export default ParentList