import React from 'react';
import { SmallNameBadge, SmallCountCard } from '..'
import { findProjectByProjectId, findParentByParentId, countItemsByType } from '../../util/functions';
import { ProjectType, ParentType, ItemType } from '../../util/dataTypes';

type PropsType = {
  type: string;
  name: string;
  parentType: string | null;
  projectId: string | null;
  projects: ProjectType[];
  parentId: string | null;
  parents: ParentType[];
  siblings: ItemType[];
}

const RelationshipDiagram = (props: PropsType) => {

  const workCount = ((siblings) => {
    if (props.parentId === null) return 0;
    return props.type === 'work' ? countItemsByType('work', siblings) - 1 : countItemsByType('work', siblings)
  })(props.siblings)

  const bugCount = ((siblings) => {
    if (props.parentId === null) return 0;
    return props.type === 'bug' ? countItemsByType('bug', siblings) - 1 : countItemsByType('bug', siblings)
  })(props.siblings)

  return (
    <div>
      <label className="font-weight-light">Relationship</label>

      <div className="d-flex flex-column align-items-center">
        <SmallNameBadge name={findProjectByProjectId(props.projectId, props.projects)?.name} type="project" />
        <i className={`fas fa-long-arrow-alt-down fa-3x text-primary my-2`}></i>
        {props.parentType === 'project' ?
          ``
          :
          <div className="d-flex flex-column align-items-center">
            <SmallNameBadge name={findParentByParentId(props.parentId, props.parents)?.name} type="feature" />
            <i className={`fas fa-long-arrow-alt-down fa-3x text-warning my-2`}></i>
          </div>
        }

      </div>
      <div className="d-flex justify-content-center align-items-center">
        <SmallCountCard type="work"
          count={workCount} />
        <i className="fas fa-long-arrow-alt-left fa-2x text-secondary mx-0 mx-lg-2"></i>

        <SmallNameBadge name={props.name} type={props.type} />

        <i className="fas fa-long-arrow-alt-right fa-2x text-danger mx-0 mx-lg-2"></i>
        <SmallCountCard type="bug"
          count={bugCount} />

      </div>
    </div>
  )
}

export default RelationshipDiagram;