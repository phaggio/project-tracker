import React from 'react';

type PropsType = {
  name: string;
}

const Tag = (props: PropsType) => {
  return (
    <span className="badge badge-info d-flex align-items-center mr-1 mb-1">
      {props.name}
    </span>
  )
}

export default Tag;