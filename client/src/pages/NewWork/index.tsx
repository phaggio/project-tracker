import React, { useState, useEffect } from 'react';
import { PathProps, NewItemType } from '../../util/dataTypes';
import { AxiosResponse } from 'axios';
import { projectRequest, userRequest, itemRequest } from '../../httpRequests';
import ParentSelectBox from '../../components/ParentSelectBox';
import TagsInput from '../../components/TagsInput';
import DescriptionTextarea from '../../components/DescriptionTextarea';
import AssigneeSelectBox from '../../components/AssigneeSelectBox';
import StatusSelection from '../../components/StatusSelection';
import ConsoleLogButton from '../../components/ConsoleLogButton';

const NewWork = ({ match }: PathProps) => {
  const [projects, updateProjects] = useState([]); // potential parents
  const [items, updateItems] = useState([]); // potential parents
  const [users, updateUsers] = useState([]); // potential assignee

  const [draft, updateDraft] = useState<NewItemType>({
    status: 'Open',
    parentId: match.params.parentId ? match.params.parentId : null,
    name: '',
    description: '',
    type: 'workItem',
    tags: [],
    assigneeId: null
  });

  const [tags, updateTags] = useState<string[]>([])
  const [disableAddButton, updateDisableAddButton] = useState(true);

  // INIT GET for projects, items, users data for selection
  useEffect(() => {
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
      .catch(err => console.error(err))
  }, []);

  useEffect(() => {
    updateDraft(previous => { return { ...previous, tags: tags } })
  }, [tags]);

  const updateName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value.trim();
    updateDraft({ ...draft, name: input });
    updateDisableAddButton(input ? false : true);
  }

  const updateParent = (parent: string | null) => updateDraft({ ...draft, parentId: parent });

  const updateDesc = (text: string) => updateDraft({ ...draft, description: text });

  const updateAssignee = (payload: string | null) => updateDraft({ ...draft, assigneeId: payload });

  const updateStatus = (status: string) => updateDraft({ ...draft, status: status });

  const submitButtonPressed = (event: React.FormEvent) => {
    event.preventDefault(); //default action is clear the form
    itemRequest
      .addNewWorkItem(draft)
      .then((response: AxiosResponse) => console.log(response))
      .catch(err => console.error(err));
  };

  return (
    <div className="container">
      <div className="col-12">

        <div className="form-group pt-2">
          <div className="d-flex justify-content-between align-items-baseline">
            <label className="font-weight-light">Work item name</label>
            <small>Required</small>
          </div>
          <input type="text"
            id="name"
            className="form-control"
            spellCheck={false}
            onChange={event => updateName(event)}
            placeholder="enter name ..." />
        </div>

        <div className="form-group pt-2">
          <div className="d-flex justify-content-between align-items-baseline">
            <label className="font-weight-light">Parent</label>
            <small>Optional</small>
          </div>
          <ParentSelectBox parentId={match.params.parentId ? match.params.parentId : null}
            parents={[...projects, ...items]} // pass projects and items to parent select box
            onChange={updateParent} />
        </div>

        <div className="pt-2">
          <div className="d-flex justify-content-between align-items-baseline">
            <label className="font-weight-light">Tags</label>
            <small>Optional</small>
          </div>
          <TagsInput tags={tags} onChange={updateTags} />
        </div>

        <div className="pt-2">
          <div className="d-flex justify-content-between align-items-baseline">
            <label className="font-weight-light">Assignee</label>
          </div>
          <AssigneeSelectBox currentAssigneeId={null} users={users} onChange={updateAssignee} />
        </div>

        <div className="pt-2">
          <div className="d-flex justify-content-between align-items-baseline">
            <label className="font-weight-light">Description</label>
            <small>Optional</small>
          </div>
          <DescriptionTextarea text={draft.description} onChange={updateDesc} />
        </div>

        <div className="pt-2">
          <div className="d-flex justify-content-between align-items-baseline">
            <label className="font-weight-light">Status</label>
          </div>
          <StatusSelection defaultStatus="open" onChange={updateStatus} />
        </div>

        <div className="pt-2">
          <button type="submit"
            className="btn btn-success"
            disabled={disableAddButton}
            onClick={(event) => submitButtonPressed(event)}
          >Add work item
        </button>
        </div>

      </div>


      <div className="col-5">
        <ConsoleLogButton name="match params" state={match.params} />
        <ConsoleLogButton name="draft" state={draft} />
      </div>


    </div>
  )
};

export default NewWork;