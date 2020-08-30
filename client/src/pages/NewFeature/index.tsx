import React, { useState, useEffect } from 'react';
import { ProjectType, ItemType, PathProps, ParentPayloadType, AssigneePayloadType } from '../../util/dataTypes'
import { AxiosResponse } from 'axios';
import { projectRequest, itemRequest, userRequest } from '../../httpRequests';
import ParentSelectBox from '../../components/ParentSelectBox';
import AssigneeSelectBox from '../../components/AssigneeSelectBox';
import ConsoleLogButton from '../../components/ConsoleLogButton';

const NewFeature = ({ match }: PathProps) => {
  console.log('Rendering NewFeature page...');

  const [disableCreateButton, updateDisableCreateButton] = useState(true);
  const [projects, updateProjects] = useState<ProjectType[] | undefined>(); // potential parents
  const [items, updateItems] = useState<ItemType[] | undefined>(); // potential parents
  const [users, updateUsers] = useState([]) // potential assignees
  const [parents, updateParents] = useState<(ProjectType | ItemType)[]>([]);

  const [draft, updateDraft] = useState({});

  const [tags] = useState([])

  // initial GET request to get list of projects for dropdown selection
  useEffect(() => {
    console.log('making initial GET api call...')
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
    // add parentId to draft if found in URL params and add item type
    updateDraft({ ...draft, parentId: match.params.parentId ? match.params.parentId : null, type: 'feature' })

  }, [])

  // update parents state once projects and items loaded
  useEffect(() => {
    if (projects && items) updateParents([...projects, ...items])
  }, [projects, items])


  const submitButtonPressed = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(draft)
    itemRequest
      .addNewWorkItem(draft)
      .then((response: AxiosResponse) => console.log(response))
      .catch(err => console.error(err))
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const id = event.target.id;
    const input = event.target.value.trim();
    switch (id) {
      case 'name':
        updateDraft({ ...draft, name: input });
        updateDisableCreateButton(input ? false : true);
        break;
      case 'description':
        updateDraft({ ...draft, description: input });
        break;
      default:
        break;
    }
  }

  const handleParentSelection = (payload: ParentPayloadType) => {
    console.log(payload);
    updateDraft({ ...draft, parentId: payload.parentId })
  };

  const handleAssigneeInput = (payload: AssigneePayloadType) => {
    console.log(payload)
    updateDraft({ ...draft, assigneeId: payload.assigneeId })
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
          onChange={event => handleInput(event)}
          placeholder="enter name ..." />
      </div>

      <div className="form-group">
        <label className="font-weight-light">Parent</label>
        <ParentSelectBox
          parentId={match.params.parentId ? match.params.parentId : null}
          parents={parents}
          onChange={handleParentSelection} />
      </div>

      <div className="form-group">
        <label className="font-weight-light">Description</label>
        <textarea
          id="description"
          className="form-control"
          style={{ height: 120 }}
          onChange={event => handleInput(event)}
          placeholder="enter description ..." />
      </div>

      <div>
        <label className="font-weight-light">Assign to:</label>
        <AssigneeSelectBox currentAssigneeId={null}
          currentAssignee="Unassigned" users={users} onChange={handleAssigneeInput} />
      </div>

      <div className="pt-2">
        <button type="submit"
          className="btn btn-success"
          disabled={disableCreateButton}
          onClick={(event) => submitButtonPressed(event)}
        >Add feature
        </button>
      </div>

      <div className="div">
        <ConsoleLogButton name="match params" state={match.params} />
        <ConsoleLogButton name="projects" state={projects} />
        <ConsoleLogButton name="items" state={items} />
        <ConsoleLogButton name="parents" state={parents} />
        <ConsoleLogButton name="users" state={users} />
        <ConsoleLogButton name="draft" state={draft} />
      </div>

    </div>
  )
};


export default NewFeature;