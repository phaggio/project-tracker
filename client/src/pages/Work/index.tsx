import React, { useState, useEffect } from 'react';
import { PathPropsType, ItemType, UserType, ParentType, ProjectType } from '../../util/dataTypes';
import { isItemType } from '../../util/typecheck';
import { findParentByParentId } from '../../util/functions';
import { projectRequest, itemRequest, userRequest } from '../../httpRequests';
import {
  NameBadgeDiv, TagsDiv, AssigneeDiv, ParentItemDiv, StatusDiv, RelationshipDiagram, DescriptionDiv, ConsoleLogButton
} from '../../components';
import { AxiosResponse } from 'axios';

const Work = ({ match }: PathPropsType) => {
  const [projects, updateProjects] = useState<ProjectType[]>([]);
  const [features, updateFeatures] = useState<ParentType[]>([]);
  const [parents, updateParents] = useState<ParentType[]>([]);
  const [users, updateUsers] = useState<UserType[]>([]);

  const [siblings, updateSiblings] = useState<ItemType[]>([]);
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
        .then((response: AxiosResponse) => { if (isItemType(response.data)) updateWork(response.data) })
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
    if (work.projectId) {
      projectRequest
        .getProjectById(work.projectId)
        .then((response: AxiosResponse) => updateProjects([response.data]))
        .catch(err => console.error(err))
      itemRequest
        .getItemsWithProjectIdByQuery({ projectId: work.projectId, type: 'feature' })
        .then((response: AxiosResponse) => updateFeatures(response.data))
        .catch(err => console.error(err))
    } else if (work.projectId === null) {
      projectRequest
        .getAllProjects()
        .then((response: AxiosResponse) => updateProjects(response.data))
        .catch(err => console.error(err))
      itemRequest
        .getItemsWithProjectIdByQuery({ type: 'feature' })
        .then((response: AxiosResponse) => updateFeatures(response.data))
        .catch(err => console.error(err))
    }
    // find siblings
    if (work.parentId) {
      itemRequest
        .getItemsByParentId(work.parentId)
        .then((response: AxiosResponse) => { updateSiblings(response.data) })
        .catch(err => console.error(err))
    }
  }, [work.projectId, work.parentId])

  useEffect(() => {
    updateParents([...projects, ...features])
  }, [projects, features])

  useEffect(() => {
    if (work._id && update) {
      itemRequest
        .updateItemById(work._id, work)
        .then((response: AxiosResponse) => console.log(response.data))
        .catch(err => console.error(err))
    }
    toggleUpdate(false);
  }, [update, work]);

  const saveButtonPressed = (part: string, payload: string | string[] | null) => {
    if (work._id) {
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
            const parent = findParentByParentId(payload, parents)
            if (parent === null) {
              updateWork(prev => { return { ...prev, parentId: null, parentType: null } })
            } else {
              updateWork(prev => { return { ...prev, parentId: parent._id, parentType: parent.type, projectId: parent.projectId } })
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
      {work._id ?
        <div>
          {/* first row */}
          <div className="row">

            <div className="col-12">
              <div className="shadow rounded p-2 mt-2">
                <div >
                  <NameBadgeDiv type="work"
                    name={work.name}
                    saveButtonPressed={saveButtonPressed} />
                  <hr className="mt-2" />
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-lg-7">

              <div className="shadow rounded p-2 mt-2">
                <div className="">
                  <TagsDiv type="work"
                    tags={work.tags}
                    saveButtonPressed={saveButtonPressed} />
                  <hr className="mt-2" />
                </div>

                <div className="">
                  <AssigneeDiv assigneeId={work.assigneeId}
                    users={users}
                    saveButtonPressed={saveButtonPressed} />
                  <hr className="mt-2" />
                </div>

                <div className="">
                  <ParentItemDiv type="work"
                    currentParentId={work.parentId}
                    parents={parents}
                    saveButtonPressed={saveButtonPressed} />
                  <hr className="mt-2" />
                </div>

                <div className="">
                  <StatusDiv type="work"
                    status={work.status}
                    saveButtonPressed={saveButtonPressed} />
                  <hr className="mt-2" />
                </div>
              </div>

            </div>

            <div className="col-12 col-sm-6 col-lg-5">
              <div className="shadow rounded p-2 mt-2">
                <div className="">
                  <RelationshipDiagram type="work"
                    name={work.name}
                    parentType={work.parentType}
                    projectId={work.projectId}
                    projects={projects}
                    parentId={work.parentId}
                    parents={parents}
                    siblings={siblings} />
                  <hr className="mt-2" />
                </div>
              </div>
            </div>
          </div>

          {/* second row */}
          <div className="row">
            <div className="col-12">
              <div className="shadow rounded p-2 mt-2">
                <div className="">
                  <DescriptionDiv text={work.description}
                    saveButtonPressed={saveButtonPressed} />
                  <hr className="mt-2" />
                </div>
              </div>
            </div>
          </div>

        </div>
        :
        <div>
          <p>not found ... </p>
        </div>

      }

      <div className="col-4">
        <ConsoleLogButton name="match.params" state={match.params} />
        <ConsoleLogButton name="work" state={work} />
        <ConsoleLogButton name="parents" state={parents} />
        <ConsoleLogButton name="siblings" state={siblings} />
      </div>

    </div>
  )
}

export default Work;