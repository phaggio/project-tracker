import React from 'react';

type PropsType = {
  editState: boolean;
  onClick: (bool: boolean) => void;
}

const EditButton = (props: PropsType) => {

  return (
    <button className="btn btn-sm p-0 ml-1"
      title="edit"
      onClick={() => props.onClick(!props.editState)}>
      <i className="far fa-edit" />
    </button>
  )
}

export default EditButton