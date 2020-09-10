import React from 'react';
import { ProjectType } from '../../util/dataTypes';
import ProjectLink from '../ProjectLink';

type PropsType = {
  projects: ProjectType[];
}

const ProjectList = ({ projects }: PropsType) => {

  return (
    <div className="d-flex flex-column">
      {projects.length > 0 ?
        projects.map(project => {
          return (
            <ProjectLink key={project._id} project={project} />
          )
        })
        :
        <small>No project</small>
      }
    </div>
  )
};

export default ProjectList