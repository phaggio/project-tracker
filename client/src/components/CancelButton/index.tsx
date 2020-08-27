import React from 'react';

type PropsType = {
  editState: boolean;
  toggleEditState: (boolean: boolean) => void;
}

const CancelButton = (props: PropsType) => {

  return (
    <button type="button"
      style={{ width: '30px' }}
      className="btn btn-outline-danger btn-sm py-0"
      onClick={() => {
        props.toggleEditState(!props.editState);
      }}>
      <i className="fas fa-times" />
    </button>
  )
}

export default CancelButton