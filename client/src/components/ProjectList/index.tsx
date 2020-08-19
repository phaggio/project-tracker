import React from 'react';
import NewButton from '../NewButton';
import ProjectLink from '../ProjectLink';

interface projectListProps {
  projects: project[];
}

interface project {
  _id: string;
  name: string;
  description: string;
  tags: string[];
}

const ProjectList = ({ projects }: projectListProps) => {

  if (projects) {
    console.log(`From ProjectList component, found ${projects.length} projects in database.`)
  } else {
    console.log(`From ProjectList component, cannot find any project in database.`)
  }

  return (
    <div className="d-flex flex-column">

      <div className="d-flex flex-row justify-content-between align-items-baseline">
        <h6 className="">Projects</h6>
        <NewButton
          name="New project"
          url="/new/project"
          ariaLabel="add-new-project"
          small={true} />
      </div>

      <div className="d-flex flex-column">
        {(projects) ?
          projects.map(project => {
            return (
              <ProjectLink key={project._id} data={project} />
            )
          })
          :
          <p>No project</p>
        }
      </div>

    </div>
  )
};

export default ProjectList