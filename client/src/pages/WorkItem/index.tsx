import React, { useState, useEffect } from 'react';
import { PathPropsType, ProjectType, ItemType, UserType } from '../../util/dataTypes'
import { projectRequest, itemRequest, userRequest } from '../../httpRequests';
import { AssigneeDiv, ConsoleLogButton, DescriptionDiv, NameBadgeDiv, ParentItemDiv, StatusDiv, TagsDiv } from '../../components';
import { AxiosResponse } from 'axios';

const WorkItem = ({ match }: PathPropsType) => {
  const [workItem, updateWorkItem] = useState<ItemType | undefined>();

  const [projects, updateProjects] = useState<ProjectType[]>([]); // potential parents
  const [items, updateItems] = useState<ItemType[]>([]); // potential parents
  const [users, updateUsers] = useState<UserType[]>([]); // potential assignees

  const [update, toggleUpdate] = useState(false);

  // INIT GET api call to get all projects, items, and user data.
  useEffect(() => {
    if (match.params.id !== undefined) {
      itemRequest
        .getWorkItemById(match.params.id)
        .then((response: AxiosResponse) => {
          // if response.data.name does not exist, incorrect _id in URL
          if (response.data.name) {
            console.log('work item found, now getting potential parent and assignee data ...');
            updateWorkItem(response.data);
            // only make features/projects api call when workItem exists
            projectRequest.getAllProjects().then((response: AxiosResponse) => { if (Array.isArray(response.data)) updateProjects(response.data) });
            itemRequest.getAllWorkItems().then((response: AxiosResponse) => { if (Array.isArray(response.data)) updateItems(response.data) });
            userRequest.getAllUsers().then((response: AxiosResponse) => { if (Array.isArray(response.data)) updateUsers(response.data) });
          }
        })
        .catch(err => console.error(err));
    }
  }, [match.params.id]);

  useEffect(() => {
    if (workItem !== undefined && update === true) {
      itemRequest
        .updateWorkItemById(workItem._id, workItem)
        .then((response: AxiosResponse) => console.log(response.data))
        .catch(err => console.error(err))
    }
    toggleUpdate(false);
  }, [update, workItem]);

  const saveButtonPressed = (part: string, payload: string | string[] | null) => {
    if (workItem) {
      switch (part) {
        case ('name'):
          if (typeof payload === 'string') updateWorkItem({ ...workItem, name: payload });
          break;
        case 'tags':
          if (payload instanceof Array) updateWorkItem({ ...workItem, tags: payload });
          break;
        case 'assigneeId':
          if ((typeof payload === 'string' || payload === null)) updateWorkItem({ ...workItem, assigneeId: payload });
          break;
        case 'parentId':
          if ((typeof payload === 'string' || payload === null)) updateWorkItem({ ...workItem, parentId: payload });
          break;
        case 'status':
          if (typeof payload === 'string') updateWorkItem({ ...workItem, status: payload });
          break;
        case 'description':
          if (typeof payload === 'string') updateWorkItem({ ...workItem, description: payload });
          break;
        default:
          break;
      }
      toggleUpdate(!update)
    }
  }


  return (
    <div className="container">
      {(workItem !== undefined) ?
        <div>
          {/* first row */}
          <div className="row">

            <div className="col-12 border border-info rounded">
              <div className="pt-1">
                <NameBadgeDiv type="workItem"
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
                  users={users}
                  saveButtonPressed={saveButtonPressed} />
                <hr className="mt-2" />
              </div>

              <div className="pt-1">
                <ParentItemDiv type="workItem"
                  currentParentId={workItem.parentId}
                  parents={[...projects, ...items]}
                  saveButtonPressed={saveButtonPressed} />
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

    </div>
  )
}

export default WorkItem