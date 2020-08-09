import React, { useState, useEffect } from 'react';
import { AxiosResponse } from 'axios';


const NewFeature = () => {
  const [disableCreateButton, updateDisableCreateButton] = useState(true);
  const [featureInput, updateFeatureInput] = useState(
    { name: '', description: '', owner: '' }
  );

  useEffect(() => {
    // if there's input in project name, enable the Create project button
    featureInput.name.trim() ?
      updateDisableCreateButton(false) : updateDisableCreateButton(true);
  }, [featureInput]);

  const submitButtonPressed = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(`submit button pressed..`)

    // need to make proper API call and what to show to user after creating the project.
    const data = featureInput;
    console.log(`sending`, data);
    // API.addNewProject(data)
    //   .then((response: AxiosResponse) => console.log(response))
    //   .catch(err => console.error(err));
  };

  const handleKeyEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = event.target.id;
    const input = event.target.value.trim();
    console.log(id, input)
    if (id === 'name') {
      updateFeatureInput({
        ...featureInput, name: input
      })
    } else if (id === 'description') {
      updateFeatureInput({
        ...featureInput, description: input
      })
    }
  };



  return (
    <div className="container">
      <form
        method="POST"
        onSubmit={submitButtonPressed}
      >
        <div className="form-group">
          <label>Name</label>
          <input type="text"
            className="form-control"
            onChange={event => handleKeyEvent(event)}
            placeholder="Feature name" />
        </div>

        <div className="form-group">
          <label>Description <small>(Optional)</small></label>
          <input type="text"
            className="form-control"
            placeholder="Description" />
        </div>

        <button type="submit"
          className="btn btn-success"
          disabled={disableCreateButton}
        >Add feature
        </button>

      </form>
    </div>

  )
};


export default NewFeature;