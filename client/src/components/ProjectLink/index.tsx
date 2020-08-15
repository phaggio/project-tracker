import React from 'react';
import { Link } from 'react-router-dom';

interface ProjectLinkProps {
  data: dataType
};

interface dataType {
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