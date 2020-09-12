import React, { useState, useEffect } from 'react';
import { PathPropsType, ProjectType, ItemType, UserType, ParentType } from '../../util/dataTypes';
import { isItemType } from '../../util/typecheck';
import { projectRequest, itemRequest, userRequest } from '../../httpRequests';
import { AssigneeDiv, DescriptionDiv, NameBadgeDiv, ParentItemDiv, StatusDiv, TagsDiv, ConsoleLogButton } from '../../components';
import { AxiosResponse } from 'axios';

const Work = ({ match }: PathPropsType) => {
  // NEED TO figure out project type and project type when receive project array
  const [projects, updateProjects] = useState<ProjectType[]>([]);
  const [features, updateFeatures] = useState<ItemType[]>([]);
  const [parents, updateParents] = useState<ParentType[]>([]);
  const [users, updateUsers] = useState<UserType[]>([]); // potential assignees
  const [work, updateWork] = useState<ItemType>({
    _id: '',
    parentId: null,
    parentType: null,
    projectId: null,
    status: '(open)',
    name: '',
    description: '',
    type: 'work',
    tags: [],
    assigneeId: null
  });
  const [update, toggleUpdate] = useState(false);

  // INIT GET api call to get item data using match.params.id.
  useEffect(() => {
    if (match.params.id !== undefined) {
      itemRequest
        .getItemById(match.params.id)
        .then((response: AxiosResponse) => {
          // if response.data is an Item type
          if (isItemType(response.data)) updateWork(response.data)
        })
        .catch(err => console.error(err));
    }
  }, [match.params.id]);

  // if work is found, get all users to allow user edit assignee
  useEffect(() => {
    if (work._id) {
      userRequest
        .getAllUsers()
        .then((response: AxiosResponse) => updateUsers(response.data))
        .catch(err => console.error(err))
    }
  }, [work._id])

  // if worwk is found, get the right eligible parents for existing work item
  useEffect(() => {
    // if project Id exists, means work is currently assigned to a parent.
    if (work.projectId) {
      console.log('have project ID getting parents...');
      projectRequest
        .getProjectById(work.projectId)
        .then((response: AxiosResponse) => updateProjects([response.data]))
        .catch(err => console.error(err))
      itemRequest
        .getItemsByQuery({ projectId: work.projectId, type: 'feature' })
        .then((response: AxiosResponse) => updateFeatures(response.data))
        .catch(err => console.error(err))
    } else if (work.projectId === null) {
      // if no projectId, means it was never assigned to any parent
      console.log('do not have project ID getting parents...');
      projectRequest
        .getAllProjects()
        .then((response: AxiosResponse) => updateProjects(response.data))
        .catch(err => console.error(err))
      itemRequest
        .getItemsByQuery({ type: 'feature' })
        .then((response: AxiosResponse) => updateFeatures(response.data))
        .catch(err => console.error(err))
    }
  }, [work.projectId])

  useEffect(() => {
    updateParents([...projects, ...features])
  }, [projects, features])

  useEffect(() => {
    if (work && update) {
      itemRequest
        .updateItemById(work._id, work)
        .then(res => console.log(res))
        .catch(err => console.error(err))
    }
    toggleUpdate(false);
  }, [update, work]);

  const saveButtonPressed = (part: string, payload: string | string[] | null) => {
    if (work) {
      switch (part) {
        case ('name'):
          if (typeof payload === 'string') updateWork(prev => { return { ...prev, name: payload } })
          break;
        case 'tags':
          if (payload instanceof Array) updateWork(prev => { return { ...prev, tags: payload } });
          break;
        case 'assigneeId':
          if ((typeof payload === 'string' || payload === null)) updateWork(prev => { return { ...prev, assigneeId: payload } });
          break;
        case 'parentId':
          if ((typeof payload === 'string' || payload === null)) {
            if (payload === null) {
              updateWork(prev => { return { ...prev, parentId: null, parentType: null } })
            } else {
              const selectedParent = parents.find(parent => parent._id === payload)
              updateWork(prev => {
                return {
                  ...prev,
                  parentId: selectedParent?._id ? selectedParent._id : null,
                  parentType: selectedParent?.type ? selectedParent.type : null,
                  projectId: selectedParent?.projectId ? selectedParent.projectId : null
                }
              })
            }
          }
          break;
        case 'status':
          if (typeof payload === 'string') updateWork(prev => { return { ...prev, status: payload } });
          break;
        case 'description':
          if (typeof payload === 'string') updateWork(prev => { return { ...prev, description: payload } });
          break;
        default:
          break;
      }
      toggleUpdate(!update)
    }
  }

  return (
    <div className="container">
      {(work._id !== '') ?
        <div>
          {/* first row */}
          <div className="row">

            <div className="col-12 border border-info rounded">
              <div className="pt-1">
                <NameBadgeDiv type="work"
                  name={work.name}
                  saveButtonPressed={saveButtonPressed} />
                <hr className="mt-2" />
              </div>
            </div>

            <div className="col-12 col-sm-6 col-md-8 col-lg-9 border border-dark rounded">

              <div className="pt-1">
                <TagsDiv type="work"
                  tags={work.tags}
                  saveButtonPressed={saveButtonPressed} />
                <hr className="mt-2" />
              </div>

              <div className="pt-1">
                <AssigneeDiv assigneeId={work.assigneeId}
                  users={users}
                  saveButtonPressed={saveButtonPressed} />
                <hr className="mt-2" />
              </div>

              <div className="pt-1">
                <ParentItemDiv type="work"
                  currentParentId={work.parentId}
                  parents={parents}
                  saveButtonPressed={saveButtonPressed} />
                <hr className="mt-2" />
              </div>

              <div className="pt-1">
                <StatusDiv type="work"
                  status={work.status}
                  saveButtonPressed={saveButtonPressed} />
                <hr className="mt-2" />
              </div>

            </div>
          </div>

          {/* second row */}
          <div className="row">
            <div className="col-12 border border-dark rounded">

              <div className="pt-1">
                <DescriptionDiv text={work.description}
                  saveButtonPressed={saveButtonPressed} />
                <hr className="mt-2" />
              </div>

            </div>
          </div>

        </div>
        :
        <div>
          <p>not found ... </p>
        </div>

      }

      <div>
        <ConsoleLogButton name="match.params" state={match.params} />
        <ConsoleLogButton name="work" state={work} />
        <ConsoleLogButton name="parents" state={parents} />
      </div>

    </div>
  )
}

export default Work;