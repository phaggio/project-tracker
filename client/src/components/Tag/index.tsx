import React from 'react';

type TagProps = {
  name: string;
}

const Tag = (props: TagProps) => {
  return (
    <span className="badge badge-info mr-1 my-1">{props.name}</span>
  )
}

export default Tag