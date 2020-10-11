import React from 'react';

type PropsType = {
  defaultType: string | undefined;
  onChange: (selectedOptions: string | undefined) => void;
}


const TypeFilter = (props: PropsType) => {

  return (
    <div>
      <label className="font-weight-light">Type</label>
      <select className="custom-select"
        value={props.defaultType ? props.defaultType : ''}
        onChange={(event) => {
          props.onChange(event.target.selectedOptions[0].value ? event.target.selectedOptions[0].value : undefined)
        }}>
        <option value=''>All</option>
        <option value='feature'>Feature</option>
        <option value='work'>Work</option>
        <option value='bug'>Bug</option>
      </select>
    </div>
  )
}

export default TypeFilter