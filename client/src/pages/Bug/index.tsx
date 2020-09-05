import React, { useState, useEffect } from 'react';
import { PathProps, ItemType, ProjectType, UserType, ParentType } from '../../util/dataTypes';
import { findParentsByType } from '../../util/functions';
import { projectRequest, itemRequest, userRequest } from '../../httpRequests';
import { AxiosResponse } from 'axios';
import NameBadge from '../../components/NameBadgeDiv'
import TagsDiv from '../../components/TagsDiv';
import AssigneeDiv from '../../components/AssigneeDiv';
import ParentItemDiv from '../../components/ParentItemDiv';

import ConsoleLogButton from '../../components/ConsoleLogButton';



const Bug = ({ match }: PathProps) => {
  const [bug, updateBug] = useState<ItemType | undefined>();

  const [projects, updateProjects] = useState<ProjectType[]>([]);
  const [items, updateItems] = useState<ItemType[]>([]);
  const [users, updateUsers] = useState<UserType[]>([]);

  const [parents, updateParents] = useState<ParentType[]>([]);
  const [children, updateChildren] = useState<ItemType[]>([]);


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
          updateLoading(previous => { return !previous });
          updateBug(response.data);
        })
        .catch(err => console.error(err));
      itemRequest
        .getWorkItemsByParentId(match.params.id)
        .then((response: AxiosResponse) => updateChildren(response.data))
        .catch(err => console.error(err))
    }
  }, [match.params.id]);

  useEffect(() => {
    updateParents(findParentsByType(['project', 'feature', 'workItem'], [...projects, ...items]))
  }, [projects, items])


  const saveButtonPressed = () => {
    console.log('pressed');
    console.log(items.length);
    console.log(findParentsByType(['feature', 'workItem', 'project'], [...items, ...projects]).length)
  }

  return (
    <div className="container">

      {bug ?
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

          </div>




        </div>
        // end of main row

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