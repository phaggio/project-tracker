import React from 'react';

type TagProps = {
  name: string;
}

const Tag = (props: TagProps) => {
  return (
    <span className="badge badge-info d-flex align-items-center mr-1">
      {props.name}
    </span>
  )
}

export default Tag