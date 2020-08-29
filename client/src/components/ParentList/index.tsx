import React from 'react';

type PropsType = {
  dataArr: Item[];
  listName: string;
  defaultOption: string;
}

type Item = {
  type: string;
  name: string;
  _id: string;
}

const ParentList = ({ dataArr, listName, defaultOption }: PropsType) => {
  return (

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

  )
}

export default ParentList