import React from 'react';
import { Link } from 'react-router-dom';

type ProjectLinkProps = {
  data: dataType
};

type dataType = {
  _id: string;
  name: string;
};

const ProjectLink = (props: ProjectLinkProps) => {
  return (
    <Link
      className="mb-1"
      to={`/project/${props.data._id}`}
    >
      {props.data.name}
    </Link>
  )
};

export default ProjectLink;