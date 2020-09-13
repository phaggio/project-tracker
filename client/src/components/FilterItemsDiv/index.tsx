import React from 'react';

type PropsType = {
  includeFeature?: boolean;
  onChange: (selectedOption: string) => void;
}

const FilterItemsDiv = (props: PropsType) => {

  return (
    <div>
      <small className="font-weight-light">Filter items by: </small>
      <select className="custom-select"
        defaultValue='all'
        onChange={(event) => {
          props.onChange(event.target.selectedOptions[0].value)
        }}
      >
        <option value='all'>All</option>
        {props.includeFeature === true || props.includeFeature === undefined ?
          <option value='feature'>Feature</option>
          :
          ''
        }
        <option value='work'>Work</option>
        <option value='bug'>Bug</option>
      </select>

    </div>
  )
}

export default FilterItemsDiv