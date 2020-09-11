import React from 'react';

type PropsType = {
  itemName: string;
  actionName?: string;
  disabled: boolean;
  onClick?: (event: React.FormEvent) => void;
}

const AddNewButton = (props: PropsType) => {

  return (
    <button className="btn btn-success"
      type="submit"
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {`${props.actionName ? props.actionName : `Add`} ${props.itemName}`}
    </button>
  )
}

export default AddNewButton;