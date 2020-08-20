import React, { useState, useEffect } from 'react';
import { AxiosResponse } from 'axios';
import { projectRequest } from '../../httpRequests';

const NewProject = () => {
  const [disableCreateButton, updateDisableCreateButton] = useState(true);
  const [projectInput, updateProjectInput] = useState(
    { name: '', description: '' }
  );
  const [tags, updateTags] = useState<string[]>([]);

  useEffect(() => {
    // if there's input in project name, enable the Create project button
    projectInput.name.trim() ?
      updateDisableCreateButton(false) : updateDisableCreateButton(true);
  }, [projectInput]);

  const submitButtonPressed = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(`submit button pressed..`)

    // need to make proper API call and what to show to user after creating the project.
    const data = projectInput;
    console.log(`sending`, data);
    projectRequest.addNewProject(data)
      .then((response: AxiosResponse) => console.log(response))
      .catch(err => console.error(err));
  };

  const handleKeyEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = event.target.id;
    const input = event.target.value.trim();
    console.log(id, input)
    if (id === 'name') {
      updateProjectInput({
        ...projectInput, name: input
      })
    } else if (id === 'description') {
      updateProjectInput({
        ...projectInput, description: input
      })
    } else if (id === 'tags') {
      parseTags(input);
    }
  }

  const parseTags = (str: string) => {
    let tagArr: string[] = []
    // check for empty/space str between commas
    str.split(',').map((item: string) => {
      if (item.trim().length > 0) tagArr.push(item.trim());
    });
    updateTags(tagArr)
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <form
            method="POST"
            onSubmit={submitButtonPressed} // this also works when user press enter key on keyboard
          >
            <div className="form-group">
              <label>Name</label>
              <input type="text"
                className="form-control"
                id="name"
                onChange={event => handleKeyEvent(event)}
                placeholder="Project name" />
            </div>

            <div className="form-group">
              <label className="mr-1">{`Tags: {`}</label>
              {
                tags ? tags.map(tag => { return (<span className="badge badge-info mr-1 my-1" key={tag}>{tag}</span>) }) : ``
              }
              <label>{`}`}</label>
              <input type="text"
                className="form-control"
                id="tags"
                onChange={event => {
                  handleKeyEvent(event)
                }}
                placeholder="Separate tags by comma"
              />
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
        </div>
      </div>



      {/* debug console.log */}
      <div className="">
        <small>debug console.log</small>
        <button className="btn btn-danger btn-sm m-1" onClick={() => console.log(projectInput)}>Console.log input state</button>
        <button className="btn btn-danger btn-sm m-1" onClick={() => {
          projectRequest.getProjectByName('Simple').then(res => console.log(res))
        }}>project by name</button>
        <button className="btn btn-danger btn-sm m-1" onClick={() => {
          console.log(tags)
        }}>console.log tags</button>
      </div>


    </div>
  )
};


export default NewProject;