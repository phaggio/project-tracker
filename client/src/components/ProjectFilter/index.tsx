import React from 'react';
import { ProjectType } from '../../util/dataTypes';

type PropsType = {
  projects: ProjectType[];
  onChange: (selectedProjectId: undefined | string) => void;
  defaultValue?: string;
}

const ProjectFilter = (props: PropsType) => {

  return (
    <div>
      <label className="font-weight-light">Project</label>
      <select className="custom-select"
        value={props.defaultValue ? props.defaultValue : 'all'}
        onChange={(event) => {

          const selectedProjectId = event.target.selectedOptions[0].value;
          if (selectedProjectId === 'all') {
            props.onChange(undefined)
          } else {
            props.onChange(selectedProjectId)
          }
        }}>
        <option value="all">All</option>
        <option value='null'>(open)</option>
        {props.projects.length > 0 ?
          props.projects.map(project => {
            return (
              <option key={project._id}
                value={project._id}>
                {project.name}
              </option>
            )
          })
          :
          ``
        }
      </select>
    </div>
  )
}

export default ProjectFilter