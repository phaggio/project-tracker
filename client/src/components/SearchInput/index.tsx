import React from 'react';

type PropsType = {
  label: string;
  input?: string;
  onChange: (value: string) => void;
}

const SearchInput = (props: PropsType) => {

  return (
    <div>
      <label className="font-weight-light">{props.label}</label>
      <div className="input-group">
        <input className="form-control"
          type="text"
          placeholder="search ..."
          value={props.input}
          onChange={(event) => props.onChange(event.target.value)}
          aria-label="search input"
          aria-describedby="addon-wrapping" />
      </div>
    </div>
  )
}

export default SearchInput;