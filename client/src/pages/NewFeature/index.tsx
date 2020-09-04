import React, { useState, useEffect } from 'react';
import { ProjectType, ItemType, PathProps, NewItemType } from '../../util/dataTypes';
import { AxiosResponse } from 'axios';
import { projectRequest, itemRequest, userRequest } from '../../httpRequests';
import ParentSelectBox from '../../components/ParentSelectBox';
import TagsInput from '../../components/TagsInput';
import DescriptionTextarea from '../../components/DescriptionTextarea';
import AssigneeSelectBox from '../../components/AssigneeSelectBox';
import ConsoleLogButton from '../../components/ConsoleLogButton';

const NewFeature = ({ match }: PathProps) => {
  console.log('Rendering New Feature page...');

  const [projects, updateProjects] = useState<ProjectType[]>([]); // potential parents
  const [items, updateItems] = useState<ItemType[]>([]); // potential parents
  const [users, updateUsers] = useState([]) // potential assignees
  const [parents, updateParents] = useState<(ProjectType | ItemType)[]>([]);

  const [draft, updateDraft] = useState<NewItemType>({
    status: 'Open',
    parentId: match.params.parentId ? match.params.parentId : null,
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
    itemRequest
      .getAllWorkItems()
      .then((response: AxiosResponse) => updateItems(response.data))
      .catch(err => console.error(err))
    userRequest
      .getAllUsers()
      .then((response: AxiosResponse) => updateUsers(response.data))
      .catch(err => console.error(err))
  }, [])

  // update parents state once projects and items loaded
  useEffect(() => {
    if (projects && items) updateParents([...projects, ...items])
  }, [projects, items]);

  // update draft when tags input updates
  useEffect(() => {
    updateDraft(previous => { return { ...previous, tags: tags } })
  }, [tags]);

  const updateName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value.trim();
    updateDraft({ ...draft, name: input });
    updateDisableAddButton(input ? false : true);
  };

  const updateDesc = (text: string) => updateDraft({ ...draft, description: text });

  const updateParent = (parent: string | null) => updateDraft({ ...draft, parentId: parent });

  const updateAssignee = (payload: string | null) => updateDraft({ ...draft, assigneeId: payload });

  const submitButtonPressed = (event: React.FormEvent) => {
    event.preventDefault();
    itemRequest
      .addNewWorkItem(draft)
      .then((response: AxiosResponse) => console.log(response))
      .catch(err => console.error(err))
  };
  return (
    <div className="container">

      <div className="form-group">
        <div className="d-flex justify-content-between align-items-baseline">
          <label className="font-weight-light">Feature name</label>
          <small>Required</small>
        </div>
        <input type="text"
          id="name"
          className="form-control"
          onChange={event => updateName(event)}
          placeholder="enter name ..." />
      </div>

      <div className="form-group pt-2">
        <div className="d-flex justify-content-between align-items-baseline">
          <label className="font-weight-light">Parent</label>
          <small>Optional</small>
        </div>
        <ParentSelectBox parentId={match.params.parentId !== undefined ? match.params.parentId : null} // pass default parentId if available
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
          <label className="font-weight-light">Description</label>
          <small>Optional</small>
        </div>
        <DescriptionTextarea text={draft.description} onChange={updateDesc} />
      </div>

      <div>
        <label className="font-weight-light">Assign to:</label>
        <AssigneeSelectBox currentAssigneeId={null}
          users={users} onChange={updateAssignee} />
      </div>

      <div className="pt-2">
        <button type="submit"
          className="btn btn-success"
          disabled={disableAddButton}
          onClick={(event) => submitButtonPressed(event)}
        >Add feature
        </button>
      </div>

      <div className="div">
        <ConsoleLogButton name="params" state={match.params} />
        <ConsoleLogButton name="parents" state={parents} />
        <ConsoleLogButton name="draft" state={draft} />
      </div>

    </div>
  )
};


export default NewFeature;