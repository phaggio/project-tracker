import React from 'react';

type PropsType = {
  itemName: string;
  actionName?: string;
  disabled: boolean;
  onSubmit?: () => void;
}

const AddNewButton = (props: PropsType) => {

  return (
    <button className="btn btn-success"
      type="submit"
      disabled={props.disabled}
    >
      {`${props.actionName ? props.actionName : `Add`} ${props.itemName}`}
    </button>
  )
}

export default AddNewButton;