import React from 'react';

type PropsType = {
  spellCheck: boolean;
  id: string;
  label: string;
  optional: boolean;
  placeholder: string;
  defaultValue?: string;
  onChangeFunction: (id: string, str: string) => void;
}

const FormGroupTextArea = (props: PropsType) => {

  return (
    <div className="form-group">
      <label className="d-flex justify-content-between align-items-baseline">{props.label} {props.optional ? <small>(Optional)</small> : ''}</label>
      <textarea
        spellCheck={props.spellCheck}
        id={props.id}
        className="form-control"
        onChange={event => {
          props.onChangeFunction(props.id, event.target.value)
        }}
        placeholder={props.placeholder}
        defaultValue={props.defaultValue} />
    </div>
  )
}

export default FormGroupTextArea