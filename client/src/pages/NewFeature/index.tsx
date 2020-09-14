import React, { useState, useEffect } from 'react';
import { PathPropsType, ProjectType, NewItemType } from '../../util/dataTypes';
import { AxiosResponse } from 'axios';
import { projectRequest, itemRequest, userRequest } from '../../httpRequests';
import {
  NameInput, ParentSelectBox, TagsInput, DescriptionTextarea, AssigneeSelectBox, StatusSelection, AddNewButton, ConsoleLogButton
} from '../../components';

const NewFeature = ({ match }: PathPropsType) => {
  const [projects, updateProjects] = useState<ProjectType[]>([]); // potential parents
  const [users, updateUsers] = useState([]) // potential assignees
  const [draft, updateDraft] = useState<NewItemType>({
    status: 'Open',
    projectId: match.params.parentId ? match.params.parentId : null, // for feature, parent is always a project
    parentId: match.params.parentId ? match.params.parentId : null,
    parentType: match.params.parentType ? match.params.parentType : null,
    name: '',
    description: '',
    type: 'feature',
    tags: [],
    assigneeId: null
  });

  const [tags, updateTags] = useState<string[]>([]);
  const [disableAddButton, updateDisableAddButton] = useState(true);

  // initial GET request to get list of projects for dropdown selection
  useEffect(() => {
    projectRequest
      .getAllProjects()
      .then((response: AxiosResponse) => updateProjects(response.data))
      .catch(err => console.error(err))
    userRequest
      .getAllUsers()
      .then((response: AxiosResponse) => updateUsers(response.data))
      .catch(err => console.error(err))
  }, []);

  useEffect(() => {
    updateDraft(previous => { return { ...previous, tags: tags } })
  }, [tags]);

  const updateName = (str: string) => {
    updateDraft(prev => { return { ...prev, name: str } });
    updateDisableAddButton(str ? false : true);
  };

  const updateDescription = (text: string) => updateDraft(prev => { return { ...prev, description: text } });

  const updateParentAndProjectId = (id: string | null, type: string | null) => {
    updateDraft(prev => { return { ...prev, parentId: id, parentType: type, projectId: id } });
  }

  const updateAssigneeId = (id: string | null) => updateDraft(prev => { return { ...prev, assigneeId: id } });

  const updateStatus = (option: string) => updateDraft(prev => { return { ...prev, status: option } });

  const submitButtonPressed = (event: React.FormEvent) => {
    event.preventDefault();
    itemRequest
      .addNewItem(draft)
      .then((response: AxiosResponse) => {
        if (response.status === 200 && response.data._id !== undefined) {
          window.location.replace(`/feature/${response.data._id}`)
        }
      })
      .catch(err => console.error(err))
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">

          <div className="shadow rounded p-2 mt-2">

            <div className="form-group">
              <div className="d-flex justify-content-between align-items-baseline">
                <label className="font-weight-light">Feature name</label>
                <small>Required</small>
              </div>
              <NameInput onChange={updateName} placeholder="enter feature name ..." />
            </div>

            <div className="form-group">
              <div className="d-flex justify-content-between align-items-baseline">
                <label className="font-weight-light">Parent</label>
                <small>Optional</small>
              </div>
              <ParentSelectBox parents={projects}
                parentId={match.params.parentId !== undefined ? match.params.parentId : null}
                parentType={match.params.parentType !== undefined ? match.params.parentType : null}
                onChange={updateParentAndProjectId} />
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
                <label className="font-weight-light">Description</label>
                <small>Optional</small>
              </div>
              <DescriptionTextarea text={draft.description} onChange={updateDescription}
                placeholder="enter feature description ..." />
            </div>

            <div className="form-group">
              <label className="font-weight-light">Assign to:</label>
              <AssigneeSelectBox currentAssigneeId={null}
                users={users} onChange={updateAssigneeId} />
            </div>

            <div className="form-group">
              <label className="font-weight-light">Status</label>
              <StatusSelection onChange={updateStatus} />
            </div>

            <div className="">
              <AddNewButton itemName="feature" disabled={disableAddButton} onClick={submitButtonPressed} />
            </div>

          </div>


          <ConsoleLogButton name="draft" state={draft} />
        </div>
      </div>
    </div>
  )
};

export default NewFeature;