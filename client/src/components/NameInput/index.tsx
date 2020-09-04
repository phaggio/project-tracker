import React from 'react';

type PropsType = {
  id?: string;
  spellCheck?: boolean;
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const NameInput = (props: PropsType) => {

  return (
    <input type="text"
      id={props.id ? props.id : 'name'}
      className="form-control"
      spellCheck={props.spellCheck ? props.spellCheck : false}
      onChange={event => props.onChange(event)}
      placeholder={props.placeholder ? props.placeholder : 'enter name ...'} />
  )
}

export default NameInput;