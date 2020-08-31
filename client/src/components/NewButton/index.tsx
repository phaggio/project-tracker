import React from 'react';
import { Link } from 'react-router-dom';

type PropsType = {
  name: string;
  url: string;
  ariaLabel: string;
  small: boolean;
};

const NewButton = (props: PropsType) => {
  return (
    <Link
      className={`btn btn-success ${props.small ? `btn-sm` : ``}`}
      aria-label={props.ariaLabel}
      to={props.url}
    >
      {props.name}
    </Link>
  )
}

export default NewButton;