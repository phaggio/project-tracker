import React from 'react';

type PropsType = {
  onChange: (selectedOption: string) => void;
}

const FilterItemsDiv = (props: PropsType) => {

  return (
    <div>
      <label className="font-weight-light">Filter items by: </label>
      <select className="custom-select"
        defaultValue='all'
        onChange={(event) => {
          props.onChange(event.target.selectedOptions[0].value)
        }}
      >
        <option value='all'>All</option>
        <option value='feature'>Feature</option>
        <option value='work'>Work</option>
        <option value='bug'>Bug</option>
      </select>
    </div>
  )
}

export default FilterItemsDiv