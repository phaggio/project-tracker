import React from 'react';

type UserListProps = {
  dataArr: Item[];
  listName: string;
  defaultOption: string;
}

type Item = {
  fullName: string;
  _id: string;
}

const UserList = ({ dataArr, listName, defaultOption }: UserListProps) => {

  return (
    <div>
      <datalist id={listName}>
        {dataArr.length ? dataArr.map(data => {
          return (
            <option className="dropdown-item"
              key={data._id}
            >
              {`${data.fullName} (${data._id})`}
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

export default UserList