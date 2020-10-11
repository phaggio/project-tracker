import React from 'react';
import { ProjectType } from '../../util/dataTypes';
import ProjectLink from '../ProjectLink';

type PropsType = {
  projects: ProjectType[];
  loading: boolean;
}

const ProjectList = ({ projects, loading }: PropsType) => {

  return (
    <div className="d-flex flex-column">
      {
        loading ?
          <small>loading...</small>
          :
          null
      }

      {
        projects.length > 0 && !loading ?
          projects.map(project => {
            return (
              <ProjectLink key={project._id} project={project} />
            )
          })
          :
          null
      }

      {
        projects.length === 0 && !loading ?
          <small>No project</small>
          :
          null
      }

    </div>
  )
};

export default ProjectList