import React from 'react';

type PropsType = {
  id: string;
  label: string;
  placeholder: string;
  listName: string | undefined;
  listArr: ItemObj[] | undefined;
  onChangeFunction: (id: string, str: string) => void;
}

type ItemObj = {
  type: string;
  fullName: string;
  _id: string;
}

const FormGroup = (props: PropsType) => {

  return (
    <div className="form-group">
      <label>{props.label}</label>
      <input type="text"
        id={props.id}
        className="form-control"
        list={props.listName ? props.listName : undefined}
        onChange={event => {
          props.onChangeFunction(props.id, event.target.value)
        }}
        placeholder={props.placeholder} />
      {props.listName && props.listArr ?
        <datalist id={props.listName}>
          {
            props.listArr.map(item => {
              return (
                <option className="dropdown-item" key={item._id}>
                  {`${item.type}/${item.fullName}/${item._id}`}
                </option>
              )
            })
          }
        </datalist>
        :
        ''
      }
    </div>
  )
}

export default FormGroup