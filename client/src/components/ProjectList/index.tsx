import React from 'react';
import { ProjectType } from '../../util/dataTypes';
import NewButton from '../NewButton';
import ProjectLink from '../ProjectLink';

type PropsType = {
  projects: ProjectType[];
}

const ProjectList = ({ projects }: PropsType) => {

  return (
    <div className="div">

      <div className="d-flex flex-row justify-content-between align-items-baseline">
        <label className="font-weight-light">Projects</label>
        <NewButton
          name="New project"
          url="/new/project"
          ariaLabel="add-new-project"
          small={true} />
      </div>

      <div className="d-flex flex-column">
        {Array.from(projects).length > 0 ?
          Array.from(projects).map(one => {
            return (
              <ProjectLink key={one._id} project={one} />
            )
          })
          :
          <small>No project</small>
        }
      </div>

    </div>
  )
};

export default ProjectList