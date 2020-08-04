import React, { useState, useEffect } from 'react';
import API from '../../requests/projects';

const NewProject = () => {
  const [disableCreateButton, updateDisableCreateButton] = useState(true);
  const [projectInput, updateProjectInput] = useState({ title: '', description: '' });

  useEffect(() => {
    projectInput.title ? updateDisableCreateButton(false) : updateDisableCreateButton(true);
  }, [projectInput]);

  const submitButtonPressed = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(`submit button pressed..`)

    // need to make proper API call
    const data: object = {
      name: 'testing',
      description: 'some description'
    }
    API.addNewProject(data).then(res => console.log(res));
  };

  const handleKeyEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = event.target.id;
    console.log(event.target.id);
    if (id === 'title') {
      const input = event.target.value.trim();
      updateProjectInput({
        ...projectInput, title: event.target.value
      })
    } else if (id === 'description') {
      updateProjectInput({
        ...projectInput, description: event.target.value
      })
    }
  }

  return (
    <div className="container">
      <form
        method="POST"
        onSubmit={submitButtonPressed}
      >
        <div className="form-group">
          <label>Name <span style={{color: 'red'}}>*</span></label>
          <input type="text" className="form-control" id="title"
            onChange={event => {
              handleKeyEvent(event);
            }}
            placeholder="Project name" />
        </div>

        <div className="form-group">
          <label>Description <small>(Optional)</small></label>
          <input type="text" className="form-control" id="description"
            onChange={event => handleKeyEvent(event)}
            placeholder="Description" />
        </div>

        <button type="submit" className="btn btn-success" disabled={disableCreateButton}>
          Create project
        </button>

      </form>

      <button onClick={() => console.log(projectInput)}>Console.log input state</button>
    </div>

  )
};


export default NewProject;