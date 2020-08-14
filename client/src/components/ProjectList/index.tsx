import React from 'react';
import { Link } from 'react-router-dom';

type ListProps = {
  projects: project[]
}

interface project {
  _id: string;
  name: string;
  description: string;
  tags: string[];
}

const ProjectList = ({ projects }: ListProps) => {
  if (projects) {
    console.log(`Found ${projects.length} projects in database.`)
  } else {
    console.log(`Cannot find any project in database.`)
  }
  
  return (
    <div>
      {(projects) ?
        projects.map(project => {
          return (
            <div key={project.name}>
              <h4>{project.name}</h4>
              <p>{project.description}</p>
              <p>{project._id}</p>
              <Link to={`/project/${project._id}`}>{project._id}</Link>
            </div>
          )
        })
        : 'none'
      }
    </div>
  )
};

export default ProjectList