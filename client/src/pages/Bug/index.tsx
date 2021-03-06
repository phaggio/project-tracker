import React, { useState, useEffect } from 'react';
import { PathPropsType, ProjectType, ItemType, UserType, ParentType } from '../../util/dataTypes';
import { findParentByParentId } from '../../util/functions';
import { isItemType, isUserTypeArray } from '../../util/typecheck';
import { projectRequest, itemRequest, userRequest } from '../../httpRequests';
import { AxiosError, AxiosResponse } from 'axios';
import {
  NameBadgeDiv, TagsDiv, AssigneeDiv, ParentItemDiv, StatusDiv, RelationshipDiagram, DescriptionDiv, ConsoleLogButton
} from '../../components';
import DebugModeContext from '../../util/DebugModeContext';


const Bug = ({ match }: PathPropsType) => {
  const [projects, updateProjects] = useState<ProjectType[]>([]); // potential parents if bug has no parent
  const [items, updateItems] = useState<ParentType[]>([]); // potential parents
  const [parents, updateParents] = useState<ParentType[]>([]);
  const [users, updateUsers] = useState<UserType[]>([]); // potential assignees

  const [siblings, updateSiblings] = useState<ItemType[]>([])
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
          if (isItemType(response.data)) updateBug(response.data);
          updateLoading(false);
        })
        .catch((err: AxiosError) => {
          console.error(err);
          updateLoading(false);
        });
    }
  }, [match.params.id]);

  // INIT if bug item is found, get all users to allow user edit assignee
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

  // INIT check if projectId in bug item, find eligible parents
  useEffect(() => {
    if (bug.projectId) {
      projectRequest
        .getProjectById(bug.projectId)
        .then((response: AxiosResponse) => updateProjects([response.data]))
        .catch(err => console.error(err))
      itemRequest
        .getItemsWithProjectIdByQuery({ projectId: bug.projectId, type: ['feature'] })
        .then((response: AxiosResponse) => updateItems(response.data))
        .catch(err => console.error(err))
    } else if (bug.projectId === null) {
      projectRequest
        .getAllProjects()
        .then((response: AxiosResponse) => updateProjects(response.data))
        .catch(err => console.error(err))
      itemRequest
        .getItemsWithProjectIdByQuery({ type: ['feature'] })
        .then((response: AxiosResponse) => updateItems(response.data))
        .catch(err => console.error(err))
    }
    // find siblings
    if (bug.parentId) {
      itemRequest
        .getItemsByParentId(bug.parentId)
        .then((response: AxiosResponse) => { updateSiblings(response.data) })
        .catch(err => console.error(err))
    }
  }, [bug.projectId, bug.parentId]);

  // update eligible parents
  useEffect(() => {
    updateParents([...projects, ...items])
  }, [projects, items]);

  // update bug item
  useEffect(() => {
    if (bug._id && update === true) {
      itemRequest
        .updateItemById(bug._id, bug)
        .then(data => console.log(data))
        .catch(err => console.error(err))
      toggleUpdate(!update)
    }
  }, [bug, update]);

  const saveButtonPressed = (part: string, payload: null | string | string[]) => {
    if (bug._id) {
      switch (part) {
        case ('name'):
          if (typeof payload === 'string') updateBug(prev => { return { ...prev, name: payload } });
          break;
        case 'tags':
          if (payload instanceof Array) updateBug(prev => { return { ...prev, tags: payload } });
          break;
        case 'assigneeId':
          if (typeof payload === 'string' || payload === null) updateBug(prev => { return { ...prev, assigneeId: payload } });
          break;
        case 'parentId':
          if ((typeof payload === 'string' || payload === null)) {
            const parent = findParentByParentId(payload, parents);
            if (parent === null) {
              updateBug(prev => { return { ...prev, parentId: null, parentType: null } })
            } else {
              updateBug(prev => { return { ...prev, parentId: parent._id, parentType: parent.type, projectId: parent.projectId } })
            }
          }
          break;
        case 'status':
          if (typeof payload === 'string') updateBug(prev => { return { ...prev, status: payload } });
          break;
        case 'description':
          if (typeof payload === 'string') updateBug(prev => { return { ...prev, description: payload } });
          break;
        default:
          break;
      }
      toggleUpdate(!update)
    }
  }

  return (
    <div className="container">
      {
        loading ?
          <small>loading...</small>
          :
          null
      }

      {
        !bug._id && !loading ?
          <small>No bug found</small>
          :
          null
      }

      {
        bug._id && !loading ?
          // first row
          <div className="row">
            <div className="col-12">
              <div className="shadow rounded p-2 mt-2">

                <NameBadgeDiv type='bug'
                  name={bug.name}
                  saveButtonPressed={saveButtonPressed} />

              </div>
            </div>

            <div className="col-12 col-sm-6 col-lg-7">
              <div className="shadow rounded p-2 mt-2">

                <TagsDiv type="feature"
                  tags={bug.tags}
                  saveButtonPressed={saveButtonPressed} />
                <hr className="mt-2" />

                <AssigneeDiv assigneeId={bug.assigneeId}
                  saveButtonPressed={saveButtonPressed}
                  users={users} />
                <hr className="mt-2" />

                <ParentItemDiv type="bug"
                  currentParentId={bug.parentId}
                  parents={parents}
                  saveButtonPressed={saveButtonPressed} />
                <hr className="mt-2" />

                <StatusDiv type="bug"
                  status={bug.status}
                  saveButtonPressed={saveButtonPressed} />

              </div>
            </div>

            <div className="col-12 col-sm-6 col-lg-5">
              <div className="shadow rounded p-2 mt-2">

                <RelationshipDiagram type="bug"
                  name={bug.name}
                  parentType={bug.parentType}
                  projectId={bug.projectId}
                  projects={projects}
                  parentId={bug.parentId}
                  parents={parents}
                  siblings={siblings} />

              </div>
            </div>

          </div>
          :
          null
      }

      {
        bug._id && !loading ?
          <div className="row">
            <div className="col-12">
              <div className="shadow rounded p-2 mt-2">

                <DescriptionDiv text={bug.description}
                  saveButtonPressed={saveButtonPressed} />

              </div>
            </div>
          </div>
          :
          null
      }

      <DebugModeContext.Consumer>
        {({ debugMode }) => {
          if (debugMode) return (
            <div className="col-4">
              <ConsoleLogButton name="params" state={match.params} />
              <ConsoleLogButton name="bug" state={bug} />
              <ConsoleLogButton name="projects" state={projects} />
              <ConsoleLogButton name="items" state={items} />
              <ConsoleLogButton name="parents" state={parents} />
            </div>
          )
        }}
      </DebugModeContext.Consumer>
    </div>
  )
}

export default Bug;