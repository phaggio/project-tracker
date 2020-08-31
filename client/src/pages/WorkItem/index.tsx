import React, { useState, useEffect } from 'react';
import { PathProps, ProjectType, ItemType } from '../../util/dataTypes'
import { projectRequest, itemRequest, userRequest } from '../../httpRequests';
import NameBadge from '../../components/NameBadgeDiv';
import TagsDiv from '../../components/TagsDiv';
import AssigneeDiv from '../../components/AssigneeDiv';
import ParentItemDiv from '../../components/ParentItemDiv';
import StatusDiv from '../../components/StatusDiv';
import DescriptionDiv from '../../components/DescriptionDiv';
import ConsoleLogButton from '../../components/ConsoleLogButton';

const WorkItem = ({ match }: PathProps) => {
  const [workItem, updateWorkItem] = useState<ItemType | undefined>();

  const [projects, updateProjects] = useState<ProjectType[] | undefined>(); // potential parents
  const [items, updateItems] = useState<ItemType[] | undefined>(); // potential parents
  const [users, updateUsers] = useState<[] | undefined>(undefined); // potential assignees

  const [update, toggleUpdate] = useState(false);

  // INIT GET api call to get all projects, items, and user data.
  useEffect(() => {
    if (match.params.id) {
      console.log('params.id exists, making GET API call to get current work item data...');
      itemRequest
        .getWorkItemById(match.params.id)
        .then(response => {
          // if response.data.name does not exist, incorrect _id in URL
          if (response.data.name) {
            console.log('work item found, now getting potential parent and assignee data ...');
            updateWorkItem(response.data);
            // only make features/projects api call when workItem exists
            projectRequest.getAllProjects().then(res => updateProjects(res.data));
            itemRequest.getAllWorkItems().then(res => updateItems(res.data));
            userRequest.getAllUsers().then(res => updateUsers(res.data));
          }
        })
        .catch(err => console.error(err));
    }
  }, []);

  useEffect(() => {
    if (workItem !== undefined && update === true) {
      console.log('updating data....')
      itemRequest
        .updateWorkItemById(workItem._id, workItem)
        .then(res => console.log(res.data))
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
        case 'assignee':
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
      {(workItem !== undefined && users !== undefined && projects !== undefined && items !== undefined) ?
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

      <div className="col-6">
        <ConsoleLogButton name="projects" state={projects} />
        <ConsoleLogButton name="items" state={items} />
        <ConsoleLogButton name="work item" state={workItem} />
        <ConsoleLogButton name="users" state={users} />
        <ConsoleLogButton name="param" state={match.params} />
      </div>


    </div>
  )
}

export default WorkItem