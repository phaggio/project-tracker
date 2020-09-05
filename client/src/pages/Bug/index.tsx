import React, { useState, useEffect } from 'react';
import { PathProps, ItemType, ProjectType, UserType, ParentType } from '../../util/dataTypes';
import { findParentsByType } from '../../util/functions';
import { projectRequest, itemRequest, userRequest } from '../../httpRequests';
import { AxiosResponse } from 'axios';
import NameBadge from '../../components/NameBadgeDiv'
import TagsDiv from '../../components/TagsDiv';
import AssigneeDiv from '../../components/AssigneeDiv';
import ParentItemDiv from '../../components/ParentItemDiv';
import StatusDiv from '../../components/StatusDiv';
import DescriptionDiv from '../../components/DescriptionDiv';

import ConsoleLogButton from '../../components/ConsoleLogButton';



const Bug = ({ match }: PathProps) => {
  const [bug, updateBug] = useState<ItemType | undefined>();

  const [projects, updateProjects] = useState<ProjectType[]>([]);
  const [items, updateItems] = useState<ItemType[]>([]);
  const [users, updateUsers] = useState<UserType[]>([]);

  const [parents, updateParents] = useState<ParentType[]>([]);
  // const [children, updateChildren] = useState<ItemType[]>([]);


  const [loading, updateLoading] = useState<boolean>(true);
  const [update, toggleUpdate] = useState<boolean>(false);


  // INIT GET to get all projects, users data for selection and current feature data and its children items
  useEffect(() => {
    if (match.params.id !== undefined) {
      projectRequest
        .getAllProjects()
        .then((response: AxiosResponse) => updateProjects(response.data))
        .catch(err => console.error(err))
      itemRequest
        .getAllWorkItems()
        .then((response: AxiosResponse) => updateItems(response.data))
        .catch(err => console.error(err))
      userRequest
        .getAllUsers()
        .then((response: AxiosResponse) => updateUsers(response.data))
        .catch(err => console.error(err));
      itemRequest
        .getWorkItemById(match.params.id)
        .then((response: AxiosResponse) => {
          updateBug(response.data);
          updateLoading(previous => { return !previous });
        })
        .catch(err => console.error(err));
      // should bugs have children?
      // itemRequest
      //   .getWorkItemsByParentId(match.params.id)
      //   .then((response: AxiosResponse) => updateChildren(response.data))
      //   .catch(err => console.error(err))
    }
  }, [match.params.id]);

  useEffect(() => {
    updateParents(findParentsByType(['project', 'feature', 'workItem'], [...projects, ...items]))
  }, [projects, items]);

  useEffect(() => {
    if (bug && update === true) {
      itemRequest
        .updateWorkItemById(bug._id, bug)
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

      {bug ?
        <div>
          <div className="row">
            <div className="col-12 col-sm-6 col-md-7 col-lg-8 border border-primary rounded d-flex flex-column">

              <div className="pt-1">
                <NameBadge type='bug'
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
        ''
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