import React, { useState, useEffect } from 'react';
import { AxiosResponse } from 'axios';
import { featureRequest, userRequest } from '../../httpRequests';

const NewFeature = () => {
  const [disableCreateButton, updateDisableCreateButton] = useState(true);
  const [assignee, updateAssignee] = useState('');
  const [featureInput, updateFeatureInput] = useState(
    { name: '', description: '', assignee: '' }
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
    featureRequest.addNewFeature(data)
      .then((response: AxiosResponse) => console.log(response))
      .catch(err => console.error(err));
  };

  const retrieveUsers = () => {
    userRequest.getUsersByName(assignee)
      .then((response: AxiosResponse) => console.log(response.data));
  }

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
      case 'assignee':
        updateAssignee(input);
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
          <label>Assign to: </label>
          <input type="text"
            className="form-control"
            id="assignee"
            onChange={event => handleKeyEvent(event)}
            placeholder="Assignee" />
        </div>

        <div className="form-group">
          <label>Feature name</label>
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



      <button onClick={() => console.log(assignee)}>console.log assignee search input</button>
      <button onClick={() => retrieveUsers()}>retrive users</button>
    </div>

  )
};


export default NewFeature;