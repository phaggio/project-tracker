import React, { useState, useEffect } from 'react';
import { AxiosResponse } from 'axios';
import * as API from '../../requests/features';



const NewFeature = () => {
  const [disableCreateButton, updateDisableCreateButton] = useState(true);
  const [featureInput, updateFeatureInput] = useState(
    { name: '', description: '', owner: '' }
  );

  useEffect(() => {
    // if there's input in project name, enable the Create feature button
    featureInput.name.trim() ?
      updateDisableCreateButton(false) : updateDisableCreateButton(true);
  }, [featureInput]);

  const submitButtonPressed = (
    event: React.FormEvent
  ) => {
    event.preventDefault();
    console.log(`submit button pressed..`)

    // need to make proper API call and what to show to user after creating the feature.
    const data = featureInput;
    console.log(`sending`, data);
    API.addNewFeature(data)
      .then((response: AxiosResponse) => console.log(response))
      .catch(err => console.error(err));
  };

  const handleKeyEvent = (
    event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const id = event.target.id;
    const input = event.target.value.trim();
    // console.log(input)
    switch (id) {
      case 'name':
        updateFeatureInput({ ...featureInput, name: input });
        break;
      case 'description':
        updateFeatureInput({ ...featureInput, description: input });
        break;
      default:
        break;
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
            id="name"
            onChange={event => handleKeyEvent(event)}
            placeholder="Feature name" />
        </div>

        <div className="form-group">
          <label>Description <small>(Optional)</small></label>
          <textarea
            className="form-control"
            id="description"
            placeholder="Description"
            onChange={event => handleKeyEvent(event)} />
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