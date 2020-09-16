import React, { useState, useEffect } from 'react';
import { PathPropsType, UserType, NewItemType, ParentType } from '../../util/dataTypes';
import { findProjectIdFromParentsByParentId } from '../../util/functions';
import { AxiosResponse } from 'axios';
import { projectRequest, userRequest, itemRequest } from '../../httpRequests';
import {
  NameInput, ParentSelectBox, TagsInput, AssigneeSelectBox, DescriptionTextarea, StatusSelection, AddNewButton, ConsoleLogButton
} from '../../components';
import DebugModeContext from '../../util/DebugModeContext';

const NewWork = ({ match }: PathPropsType) => {
  const [projects, updateProjects] = useState<ParentType[]>([]); // potential parents
  const [items, updateItems] = useState<ParentType[]>([]); // potential parents
  const [users, updateUsers] = useState<UserType[]>([]); // potential assignees

  const [draft, updateDraft] = useState<NewItemType>({
    status: 'Open',
    projectId: match.params.projectId ? match.params.projectId : null,
    parentId: match.params.parentId ? match.params.parentId : null,
    parentType: match.params.parentType ? match.params.parentType : null,
    name: '',
    description: '',
    type: 'work',
    tags: [],
    assigneeId: null
  });

  const [tags, updateTags] = useState<string[]>([])
  const [disableAddButton, updateDisableAddButton] = useState<boolean>(true);

  // INIT GET for projects, items, users data for selection
  useEffect(() => {
    projectRequest
      .getAllProjects()
      .then((response: AxiosResponse) => updateProjects(response.data))
      .catch(err => console.error(err))
    itemRequest
      .getItemsByType('feature')
      .then((response: AxiosResponse) => updateItems(response.data))
      .catch(err => console.error(err))
    userRequest
      .getAllUsers()
      .then((response: AxiosResponse) => updateUsers(response.data))
      .catch(err => console.error(err))
  }, []);

  useEffect(() => {
    updateDraft(previous => { return { ...previous, tags: tags } })
  }, [tags]);

  const updateName = (input: string) => {
    updateDraft(prev => { return { ...prev, name: input } });
    updateDisableAddButton(input ? false : true);
  };

  const updateParentAndProject = (parentId: string | null, parentType: string | null) => {
    updateDraft(prev => { return { ...prev, parentId: parentId, parentType: parentType } })
    if (parentId === null) {
      updateDraft(prev => { return { ...prev, projectId: null } })
    } else if (parentType === 'project') {
      updateDraft(prev => { return { ...prev, projectId: parentId } })
    } else {
      updateDraft(prev => { return { ...prev, projectId: findProjectIdFromParentsByParentId(parentId, items) } })
    }
  };

  const updateDescription = (text: string) => updateDraft(prev => { return { ...prev, description: text } });

  const updateAssigneeId = (payload: string | null) => updateDraft(prev => { return { ...prev, assigneeId: payload } });

  const updateStatus = (status: string) => updateDraft(prev => { return { ...prev, status: status } });

  const submitButtonPressed = (event: React.FormEvent) => {
    event.preventDefault(); //default action is clear the form
    itemRequest
      .addNewItem(draft)
      .then((response: AxiosResponse) => {
        if (response.status === 200 && response.data._id !== undefined) {
          window.location.replace(`#/work/${response.data._id}`)
        }
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">

          <div className="shadow rounded p-2 mt-2">
            <div className="form-group">
              <div className="d-flex justify-content-between align-items-baseline">
                <label className="font-weight-light">Work item name</label>
                <small>Required</small>
              </div>
              <NameInput onChange={updateName} />
            </div>

            <div className="form-group">
              <div className="d-flex justify-content-between align-items-baseline">
                <label className="font-weight-light">Parent</label>
                <small>Optional</small>
              </div>
              <ParentSelectBox parentId={match.params.parentId ? match.params.parentId : null}
                parents={[...projects, ...items]} // pass projects and items to parent select box
                onChange={updateParentAndProject} />
            </div>

            <div className="form-group">
              <div className="d-flex justify-content-between align-items-baseline">
                <label className="font-weight-light">Tags</label>
                <small>Optional</small>
              </div>
              <TagsInput tags={tags} onChange={updateTags} />
            </div>

            <div className="form-group">
              <div className="d-flex justify-content-between align-items-baseline">
                <label className="font-weight-light">Assignee</label>
              </div>
              <AssigneeSelectBox currentAssigneeId={null} users={users} onChange={updateAssigneeId} />
            </div>

            <div className="form-group">
              <div className="d-flex justify-content-between align-items-baseline">
                <label className="font-weight-light">Description</label>
                <small>Optional</small>
              </div>
              <DescriptionTextarea text={draft.description} onChange={updateDescription} />
            </div>

            <div className="form-group">
              <div className="d-flex justify-content-between align-items-baseline">
                <label className="font-weight-light">Status</label>
              </div>
              <StatusSelection defaultStatus="open" onChange={updateStatus} />
            </div>

            <div className="">
              <AddNewButton itemName="work item" disabled={disableAddButton} onClick={submitButtonPressed} />
            </div>

          </div>

        </div>
        

        <DebugModeContext.Consumer>
          {({ debugMode }) => {
            if (debugMode) return (
              <div className="col-4">
                <ConsoleLogButton name="items" state={items} />
                <ConsoleLogButton name="draft" state={draft} />
                <ConsoleLogButton name="match.params" state={match.params} />
              </div>
            )
          }}
        </DebugModeContext.Consumer>
      </div>
    </div>
  )
};

export default NewWork;