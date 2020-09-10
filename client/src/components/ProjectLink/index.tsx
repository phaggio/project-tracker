import React from 'react';
import { ProjectType } from '../../util/dataTypes';
import { Link } from 'react-router-dom';

type PropsType = {
  project: ProjectType
};

const ProjectLink = ({ project }: PropsType) => {
  
  return (
    <Link
      className="btn btn-primary btn-sm mb-1 text-truncate"
      title={project.name}
      to={`/project/${project._id}`}
    >
      {project.name}
    </Link>
  )
};

export default ProjectLink;