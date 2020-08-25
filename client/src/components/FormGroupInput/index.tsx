import React from 'react';

type PropsType = {
  spellCheck: boolean;
  id: string;
  label: string;
  optional: boolean;
  placeholder: string;
  defaultValue?: string;
  listName?: string;
  listArr?: ItemObj[];
  defaultOption?: string;
  onChangeFunction: (id: string, str: string) => void;
}

type ItemObj = {
  type: string;
  name?: string;
  fullName?: string;
  _id: string;
}

const FormGroupInput = (props: PropsType) => {

  return (
    <div className="form-group">
      <label className="d-flex justify-content-between align-items-baseline">{props.label} {props.optional ? <small>(Optional)</small> : ''}</label>
      <input type="text"
        spellCheck={props.spellCheck}
        id={props.id}
        className="form-control"
        list={props.listName ? props.listName : undefined}
        onChange={event => {
          props.onChangeFunction(props.id, event.target.value)
        }}
        placeholder={props.placeholder}
        defaultValue={props.defaultValue} />
      <datalist id={props.listName}>
        {
          props.listArr ?
            props.listArr.map(item => {
              return (
                <option className="dropdown-item" key={item._id}>
                  {`${item.type}/${item.name ? item.name : item.fullName}/${item._id}`}
                </option>
              )
            })
            :
            <option className="dropdown-item"
              value={props.defaultOption}>
            </option>
        }
      </datalist>
    </div>
  )
}

export default FormGroupInput