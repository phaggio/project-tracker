import React, { useState, useEffect } from 'react';
import { PathProps } from '../../util/dataTypes'
import { AxiosResponse } from 'axios';
import { featureRequest, projectRequest, itemRequest } from '../../httpRequests';
import ParentList from '../../components/ParentList';
import ConsoleLogButton from '../../components/ConsoleLogButton';

const NewFeature = ({ match }: PathProps) => {
  console.log('Rendering NewFeature page...');

  const [disableCreateButton, updateDisableCreateButton] = useState(true);
  const [projects, updateProjects] = useState([]);

  const [parentName, updateParentName] = useState(match.params.name ? match.params.name : '');
  const [parentType, updateParentType] = useState(match.params.type ? match.params.type : '');
  const [parentId, updateParentId] = useState(match.params.id ? match.params.id : '')
  const [name, updateName] = useState('');
  const [assignee, updateAssignee] = useState('');
  const [description, updateDescription] = useState('');
  const [tags] = useState([])

  // initial GET request to get list of projects for dropdown selection
  useEffect(() => {
    console.log('making initial GET api call...')
    projectRequest
      .getAllProjects()
      .then((response: AxiosResponse) => updateProjects(response.data))
      .catch(err => console.error(err))

  }, [])

  const parseParentInfo = (str: string) => {
    const infoArr = str.split('/');
    updateParentType(infoArr[0] ? infoArr[0].trim() : '');
    updateParentName(infoArr[1] ? infoArr[1].trim() : '');
    updateParentId(infoArr[2] ? infoArr[2].trim() : '');
  }


  const submitButtonPressed = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(`submit button pressed..`)

    // need to make proper API call and what to show to user after creating the feature.
    const data = {
      projectId: parentId,
      type: 'feature',
      name: name,
      description: description,
      assignee: assignee,
      tags: tags
    };
    console.log(`sending`, data);
    featureRequest.addNewFeature(data)
      .then((response: AxiosResponse) => console.log(response))
      .catch(err => console.error(err));
  };

  const handleParentInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value.trim();
    if (input) parseParentInfo(input);
  };

  const handleNameInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value.trim();
    input ? updateDisableCreateButton(false) : updateDisableCreateButton(true);
    updateName(input);
  };

  const handleDescriptionInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = event.target.value.trim();
    updateDescription(input);
  };

  const handleAssigneeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value.trim();
    updateAssignee(input);
  };


  return (
    <div className="container">
      <form
        method="POST"
        onSubmit={submitButtonPressed}
      >

        <div className="form-group">
          <label>Parent item:</label>
          <input type="text"
            className="form-control"
            list="projects"
            onChange={event => handleParentInput(event)}
            placeholder="Select parent item"
            defaultValue={match.params.id ? `${parentType}/${parentName}/${parentId}` : ''}
            spellCheck={false}
          />
          <ParentList dataArr={projects}
            listName="projects"
            defaultOption="No project found" />
        </div>

        <div className="form-group">
          <div className="d-flex justify-content-between align-items-baseline">
            <h5>Feature name</h5>
            <small>Required</small>
          </div>
          <input type="text"
            className="form-control"
            onChange={event => handleNameInput(event)}
            placeholder="Feature name" />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            className="form-control"
            onChange={event => handleDescriptionInput(event)}
            placeholder="Description" />
        </div>

        <div className="form-group">
          <label>Assign to: </label>
          <input type="text"
            className="form-control"
            onChange={event => handleAssigneeInput(event)}
            placeholder="Assignee" />
        </div>

        <button type="submit"
          className="btn btn-success"
          disabled={disableCreateButton}
        >Add feature
        </button>

      </form>

      <div className="col-3">
        <ConsoleLogButton name="match" state={match} />
      </div>

      <button className="btn btn-danger btn-sm m-1"
        onClick={() => console.log(
          `parent item: ${parentName}
          name: ${name} 
          description ${description} 
          assignee ${assignee}`)}>
        console.log input states
      </button>
      <br />
      <button className="btn btn-danger btn-sm m-1"
        onClick={() => console.log(projects)}>
        console.log projects states
      </button>

      <br />
      <button className="btn btn-danger btn-sm m-1"
        onClick={() => console.log(parentId, parentName, parentType)}>
        console.log parent states
      </button>

      <br />
      <button className="btn btn-danger btn-sm m-1"
        onClick={() => console.log(parentType)}>
        console.log parent type
      </button>

    </div>
  )
};


export default NewFeature;