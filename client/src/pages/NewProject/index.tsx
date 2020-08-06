import React, { useState, useEffect } from 'react';
import { AxiosResponse } from 'axios';
import * as API from '../../requests/projects';

const NewProject = () => {
  const [disableCreateButton, updateDisableCreateButton] = useState(true);
  const [projectInput, updateProjectInput] = useState({ title: '', description: '' });

  useEffect(() => {
    projectInput.title ?
      updateDisableCreateButton(false) : updateDisableCreateButton(true);
  }, [projectInput]);

  const submitButtonPressed = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(`submit button pressed..`)

    // need to make proper API call
    const data = projectInput;
    console.log(`sending`, data);
    API.addNewProject(data)
      .then((response: AxiosResponse) => console.log(response))
      .catch(err => console.error(err));
  };

  const handleKeyEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = event.target.id;
    const input = event.target.value.trim();
    if (id === 'title') {
      updateProjectInput({
        ...projectInput, title: input
      })
    } else if (id === 'description') {
      updateProjectInput({
        ...projectInput, description: input
      })
    }
  }


  return (
    <div className="container">
      <form
        method="POST"
        onSubmit={submitButtonPressed} // this also works when user press enter key on keyboard
      >
        <div className="form-group">
          <label>Name</label>
          <input type="text"
            className="form-control"
            id="title"
            onChange={event => {
              handleKeyEvent(event);
            }}
            placeholder="Project name" />
        </div>

        <div className="form-group">
          <label>Description <small>(Optional)</small></label>
          <input type="text"
            className="form-control"
            id="description"
            onChange={event => handleKeyEvent(event)}
            placeholder="Description" />
        </div>

        <button type="submit" className="btn btn-success" disabled={disableCreateButton}>
          Create project
        </button>

      </form>
      <br />
      <button onClick={() => console.log(projectInput)}>Console.log input state</button>
    </div>

  )
};


export default NewProject;