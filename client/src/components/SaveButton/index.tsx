import React from 'react';

type PropsType = {
  id: string;
  editState: boolean;
  disabled?: boolean;
  payload: string | string[] | object | null;
  toggleEditState: (boolean: boolean) => void;
  pressed: (id: string, payload: any) => void;
}

const SaveButton = (props: PropsType) => {

  return (
    <button type="button"
      style={{ width: '30px' }}
      className="btn btn-outline-success btn-sm py-0"
      id={props.id}
      disabled={props.disabled}
      onClick={() => {
        props.pressed(props.id, props.payload);
        props.toggleEditState(!props.editState);
        // console.log(props.id, props.payload)
      }}>
      <i className="fas fa-check" />
    </button>
  )
}

export default SaveButton