import React, { useState, useEffect } from 'react';
import { PathPropsType, ItemType, ProjectType, UserType, ParentType } from '../../util/dataTypes';
import { isItemType, isUserTypeArray } from '../../util/typecheck';
import { findParentsByType } from '../../util/functions';
import { projectRequest, itemRequest, userRequest } from '../../httpRequests';
import { AxiosResponse } from 'axios';
import { AssigneeDiv, ConsoleLogButton, DescriptionDiv, NameBadgeDiv, ParentItemDiv, StatusDiv, TagsDiv } from '../../components';


const Bug = ({ match }: PathPropsType) => {
  const [projects, updateProjects] = useState<ProjectType[]>([]); // potential parents if bug has no parent
  const [items, updateItems] = useState<ItemType[]>([]); // potential parents
  const [parents, updateParents] = useState<ParentType[]>([]);
  const [users, updateUsers] = useState<UserType[]>([]); // potential assignees

  const [bug, updateBug] = useState<ItemType>({
    _id: '',
    parentId: null,
    parentType: null,
    projectId: null,
    status: '(open)',
    name: '',
    description: '',
    type: 'bug',
    tags: [],
    assigneeId: null
  });

  const [loading, updateLoading] = useState<boolean>(true);
  const [update, toggleUpdate] = useState<boolean>(false);

  // INIT GET api call to get item data using match.params.id.
  useEffect(() => {
    if (match.params.id !== undefined) {
      itemRequest
        .getItemById(match.params.id)
        .then((response: AxiosResponse) => {
          if (isItemType(response.data)) updateBug(response.data)
        })
        .catch(err => console.error(err));
    }
  }, [match.params.id]);

  // if bug is found, get all users to allow user edit assignee
  useEffect(() => {
    if (bug._id) {
      userRequest
        .getAllUsers()
        .then((response: AxiosResponse) => {
          if (isUserTypeArray(response.data)) updateUsers(response.data);
        })
        .catch(err => console.error(err))
    }
  }, [bug._id])

  // INIT GET to current bug data
  useEffect(() => {
    if (match.params.id !== undefined) {
      projectRequest
        .getAllProjects()
        .then((response: AxiosResponse) => updateProjects(response.data))
        .catch(err => console.error(err))
      itemRequest
        .getAllItems()
        .then((response: AxiosResponse) => updateItems(response.data))
        .catch(err => console.error(err))
      userRequest
        .getAllUsers()
        .then((response: AxiosResponse) => updateUsers(response.data))
        .catch(err => console.error(err));
      itemRequest
        .getItemById(match.params.id)
        .then((response: AxiosResponse) => {
          updateBug(response.data);
          updateLoading(previous => { return !previous });
        })
        .catch(err => console.error(err));
    }
  }, [match.params.id]);

  useEffect(() => {

  }, [bug._id, bug.projectId])

  useEffect(() => {
    updateParents(findParentsByType(['project', 'feature', 'work'], [...projects, ...items]))
  }, [projects, items]);

  useEffect(() => {
    if (bug && update === true) {
      itemRequest
        .updateItemById(bug._id, bug)
        .then(data => console.log(data))
        .catch(err => console.error(err))
      toggleUpdate(!update)
    }
  }, [bug, update]);

  const saveButtonPressed = (part: string, payload: string | string[]) => {
    if (bug) {
      switch (part) {
        case ('name'):
          if (typeof payload === 'string') updateBug({ ...bug, name: payload });
          break;
        case 'tags':
          if (payload instanceof Array) updateBug({ ...bug, tags: payload });
          break;
        case 'assigneeId':
          if (typeof payload === 'string' || payload === null) updateBug({ ...bug, assigneeId: payload });
          break;
        case 'parentId':
          if (typeof payload === 'string' || payload === null) updateBug({ ...bug, parentId: payload });
          break;
        case 'status':
          if (typeof payload === 'string') updateBug({ ...bug, status: payload });
          break;
        case 'description':
          if (typeof payload === 'string') updateBug({ ...bug, description: payload });
          break;
        default:
          break;
      }
      toggleUpdate(!update)
    }
  }
  return (
    <div className="container">

      {bug && !loading ?
        <div>
          <div className="row">
            <div className="col-12 col-sm-6 col-md-7 col-lg-8 border border-primary rounded d-flex flex-column">

              <div className="pt-1">
                <NameBadgeDiv type='bug'
                  name={bug.name}
                  saveButtonPressed={saveButtonPressed} />
                <hr className="mt-2" />
              </div>

              <div className="pt-1">
                <TagsDiv type="feature"
                  tags={bug.tags}
                  saveButtonPressed={saveButtonPressed} />
                <hr className="mt-2" />
              </div>

              <div className="pt-1">
                <AssigneeDiv assigneeId={bug.assigneeId}
                  saveButtonPressed={saveButtonPressed}
                  users={users} />
                <hr className="mt-2" />
              </div>

              <div>
                <ParentItemDiv type="bug"
                  currentParentId={bug.parentId}
                  parents={parents}
                  saveButtonPressed={saveButtonPressed} />
              </div>

              <div className="pt-1">
                <StatusDiv type="bug"
                  status={bug.status}
                  saveButtonPressed={saveButtonPressed} />
                <hr className="mt-2" />
              </div>
            </div>
          </div>
          {/* end of first row */}

          <div className="row">
            <div className="col-12 d-flex flex-column border border-warning rounded">
              <div className="pt-1">
                <DescriptionDiv text={bug.description}
                  saveButtonPressed={saveButtonPressed} />
                <hr className="mt-2" />
              </div>
            </div>
          </div>

        </div>
        :
        <p>not found ...</p>
      }


      <div className="col-6">
        <ConsoleLogButton name="params" state={match.params} />
        <ConsoleLogButton name="bug" state={bug} />
        <ConsoleLogButton name="parents" state={parents} />
      </div>

    </div>
  )
}

export default Bug;