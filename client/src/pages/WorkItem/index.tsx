import React, { useState, useEffect } from 'react';
import { projectRequest, featureRequest, workItemRequest, userRequest } from '../../httpRequests';
import NameBadge from '../../components/NameBadgeDiv';
import TagsDiv from '../../components/TagsDiv';
import AssigneeDiv from '../../components/AssigneeDiv';
import ParentItemDiv from '../../components/ParentItemDiv';
import StatusDiv from '../../components/StatusDiv';
import DescriptionDiv from '../../components/DescriptionDiv';
import ConsoleLogButton from '../../components/ConsoleLogButton';

type PathProps = {
  history: boolean;
  location: string;
  match: MatchObj;
};

type MatchObj = {
  isExact: boolean;
  params: MatchParams;
  path: string;
  url: string;
};

type MatchParams = {
  id: string;
};

type WorkItemType = {
  _id: string;
  status: string;
  name: string;
  description: string;
  tags: string[];
  parentType: string;
  parentName: string;
  parentId: string;
  assigneeId: string | null;
  assignee: string;
}

type AssigneeType = {
  assignee: string;
  assigneeId: string | null;
}


const WorkItem = ({ match }: PathProps) => {
  console.log('Rendering WorkItem page...');
  console.log(match.params.id);

  const [workItem, updateWorkItem] = useState<WorkItemType | undefined>();
  const [features, updateFeatures] = useState();
  const [projects, updateProjects] = useState();
  const [users, updateUsers] = useState<[] | undefined>(undefined);


  // INIT GET api call to get all features, projects, users data.
  useEffect(() => {
    if (match.params.id) {
      console.log('param exists, need to make API call');
      workItemRequest
        .getWorkItemById(match.params.id)
        .then(res => {
          // if res.data.name does not exist, incorrect _id in URL
          if (res.data.name) {
            updateWorkItem(res.data);
            // only make features/projects api call when workItem exists
            projectRequest.getAllProjects().then(res => updateProjects(res.data));
            featureRequest.getAllFeatures().then(res => updateFeatures(res.data));
          }
        })
        .catch(err => console.error(err));
      userRequest
        .getAllUsers()
        .then(res => updateUsers(res.data))
        .catch(err => console.error(err))
    }
  }, []);

  useEffect(() => {
    if (workItem) {
      workItemRequest
        .updateWorkItemById(match.params.id, workItem)
        .then(res => console.log(res.data))
        .catch(err => console.error(err))
    }
  }, [workItem]);

  // a custom function that checks whether the object is AssigneeType obj
  const isAssigneeType = (arg: any): arg is AssigneeType => {
    return arg.assignee !== undefined;
  }


  const saveButtonPressed = (part: string, payload: string | string[] | AssigneeType) => {
    switch (part) {
      case ('name'):
        if (typeof payload === 'string' && workItem) updateWorkItem({ ...workItem, name: payload });
        break;
      case 'tags':
        if (payload instanceof Array && workItem) updateWorkItem({ ...workItem, tags: payload });
        break;
      case 'parent':
        console.log('need to update parentId');
        break;
      case 'status':
        if (typeof payload === 'string' && workItem) updateWorkItem({ ...workItem, status: payload });
        break;
      case 'description':
        if (typeof payload === 'string' && workItem) updateWorkItem({ ...workItem, description: payload });
        break;
      case 'assignee':
        if (isAssigneeType(payload) && workItem) {
          updateWorkItem({ ...workItem, assignee: payload.assignee, assigneeId: payload.assigneeId })
        }
        break;
      default:
        break;
    }
  }

  const updateParent = (part: string, payload: object) => {
    console.log(part, payload);
    console.log('need to update workItem when ready...')
  };

  return (
    <div className="container">
      {workItem !== undefined && users !== undefined ?
        <div>
          {/* first row */}
          <div className="row">

            <div className="col-12 border border-info rounded">
              <div className="pt-1">
                <NameBadge type="workItem"
                  name={workItem.name}
                  saveButtonPressed={saveButtonPressed} />
                <hr className="mt-2" />
              </div>
            </div>

            <div className="col-12 col-sm-6 col-md-8 col-lg-9 border border-dark rounded">
              <div className="pt-1">
                <TagsDiv type="workItem"
                  tags={workItem.tags}
                  saveButtonPressed={saveButtonPressed} />
                <hr className="mt-2" />
              </div>

              <div className="pt-1">
                <AssigneeDiv assigneeId={workItem.assigneeId}
                  assignee={workItem.assignee}
                  users={users}
                  saveButtonPressed={saveButtonPressed} />
                <hr className="mt-2" />
              </div>


              <div className="pt-1">
                <ParentItemDiv type="workItem"
                  parentType={workItem.parentType}
                  parentName={workItem.parentName}
                  parentId={workItem.parentId}
                  saveButtonPressed={updateParent} />
                <hr className="mt-2" />
              </div>

              <div className="pt-1">
                <StatusDiv type="workItem"
                  status={workItem.status}
                  saveButtonPressed={saveButtonPressed} />
                <hr className="mt-2" />
              </div>

            </div>
          </div>

          {/* second row */}
          <div className="row">
            <div className="col-12 border border-dark rounded">

              <div className="pt-1">
                <DescriptionDiv text={workItem.description}
                  saveButtonPressed={saveButtonPressed} />
                <hr className="mt-2" />
              </div>

            </div>
          </div>

        </div>
        :
        <div>
          No work item found
      </div>

      }



      <div className="col-3">
        <ConsoleLogButton name="projects" state={projects} />
        <ConsoleLogButton name="features" state={features} />
        <ConsoleLogButton name="work item" state={workItem} />
        <ConsoleLogButton name="users" state={users} />
      </div>


    </div>
  )
}

export default WorkItem