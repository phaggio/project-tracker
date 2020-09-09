import React from 'react';

type PropsType = {
  defaultStatus?: string;
  onChange: (str: string) => void;
}

const StatusSelection = (props: PropsType) => {

  return (
    <div>
      <select className="custom-select"
        defaultValue={props.defaultStatus ? props.defaultStatus : 'Open'}
        onChange={(event) => {
          props.onChange(event.target.selectedOptions[0].value)
        }}
      >
        <option value='Open'>Open</option>
        <option value='Active'>Active</option>
        <option value='Completed'>Completed</option>
        <option value='In-review'>In-review</option>
        <option value='Closed'>Closed</option>
      </select>
    </div>
  )
}

export default StatusSelection;