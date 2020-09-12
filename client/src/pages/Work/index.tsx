import React, { useState, useEffect } from 'react';
import { PathPropsType, ProjectType, ItemType, UserType } from '../../util/dataTypes'
import { projectRequest, itemRequest, userRequest } from '../../httpRequests';
import { AssigneeDiv, DescriptionDiv, NameBadgeDiv, ParentItemDiv, StatusDiv, TagsDiv, ConsoleLogButton } from '../../components';
import { AxiosResponse } from 'axios';

const Work = ({ match }: PathPropsType) => {
  const [project, updateProject] = useState<ProjectType>();
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

  const [items, updateItems] = useState<ItemType[]>([]); // potential parents
  const [users, updateUsers] = useState<UserType[]>([]); // potential assignees

  const [update, toggleUpdate] = useState(false);

  // type guard
  const isProjectType = (target: any): target is ProjectType => {
    if ((target as ProjectType).type) return true;
    return false;
  }

  // INIT GET api call to get item data using match.params.id.
  useEffect(() => {
    if (match.params.id !== undefined) {
      itemRequest
        .getItemById(match.params.id)
        .then((response: AxiosResponse) => {
          // if response.data.name does not exist, incorrect _id in URL
          if (response.data.name) {
            updateWork(response.data);
            // only make features/projects api call when workItem exists
            if (response.data.projectId) {
              projectRequest
                .getProjectById(response.data.projectId)
                .then((response: AxiosResponse) => {
                  if (isProjectType(response.data)) updateProject(response.data)
                });
            }
            itemRequest.getItemsByType('feature')
              .then((response: AxiosResponse) => { if (Array.isArray(response.data)) updateItems(response.data) });
            userRequest.getAllUsers()
              .then((response: AxiosResponse) => { if (Array.isArray(response.data)) updateUsers(response.data) });
          }
        })
        .catch(err => console.error(err));
    }
  }, [match.params.id]);

  // if work._id is valid, find possible parents and users
  // NEED TO find the right eligible parents for existing work item
  useEffect(() => {
    if (work._id && work.projectId) {
      // console.log('have project ID getting parents...');
      projectRequest
        .getProjectById(work.projectId)
        .then((response: AxiosResponse) => updateProject(response.data))
        .catch(err => console.error(err))
      itemRequest
        .getItemsByQuery({ projectId: work.projectId, type: 'feature' })
        .then((response: AxiosResponse) => updateItems(response.data))
        .catch(err => console.error(err))
    } else if (work._id && work.projectId === null) {
      // console.log('do not have project ID getting parents...');
      projectRequest
        .getAllProjects()
        .then((response: AxiosResponse) => updateProject(response.data))
        .catch(err => console.error(err))
      itemRequest
        .getItemsByQuery({ type: 'feature' })
        .then((response: AxiosResponse) => updateItems(response.data))
        .catch(err => console.error(err))
    }
  }, [work._id, work.projectId])

  useEffect(() => {
    if (work && update) {
      itemRequest
        .updateItemById(work._id, work)
        .then((response: AxiosResponse) => console.log(response.data))
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
          if (payload instanceof Array) updateWork({ ...work, tags: payload });
          break;
        case 'assigneeId':
          if ((typeof payload === 'string' || payload === null)) updateWork({ ...work, assigneeId: payload });
          break;
        case 'parentId':
          if ((typeof payload === 'string' || payload === null)) updateWork({ ...work, parentId: payload });
          break;
        case 'status':
          if (typeof payload === 'string') updateWork({ ...work, status: payload });
          break;
        case 'description':
          if (typeof payload === 'string') updateWork({ ...work, description: payload });
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
                  parents={project ? [project, ...items] : [...items]}
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
      </div>

    </div>
  )
}

export default Work;