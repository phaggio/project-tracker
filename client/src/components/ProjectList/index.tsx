import React from 'react';
import { Link } from 'react-router-dom';
import NewButton from '../NewButton';

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
    console.log(`Found ${projects.length} projects in database.`)
  } else {
    console.log(`Cannot find any project in database.`)
  }

  return (
    <div className="d-flex flex-column">
      <div className="d-flex justify-content-between align-items-baseline">
        <h6>Projects</h6>
        <NewButton name="New project" url="/new/project" ariaLabel="add-new-project" small={true} />
      </div>

      {(projects) ?
        projects.map(project => {
          return (
            <div key={project.name}>
              <Link to={`/project/${project._id}`}>{project.name}</Link>
            </div>
          )
        })
        :
        <p>No project</p>
      }
    </div>
  )
};

export default ProjectList