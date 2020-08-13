import React, { useState, useEffect } from 'react';
import { AxiosResponse } from 'axios';
import { userRequest } from '../../httpRequests'

const NewUser = () => {
  const [disableCreateButton, updateDisableCreateButton] = useState(true);
  const [userInfo, updateUserInfo] = useState(
    { firstName: '', lastName: '', email: '' }
  );

  useEffect(() => {
    // if there's input in project name, enable the Create project button
    userInfo.lastName.trim() && userInfo.email.trim() ?
      updateDisableCreateButton(false) : updateDisableCreateButton(true);
  }, [userInfo]);

  const submitButtonPressed = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(`submit button pressed..`)

    // need to make proper API call and what to show to user after creating the project.
    const data = userInfo;
    console.log(`sending`, data);
    userRequest.createNewUser(data)
      .then((response: AxiosResponse) => console.log(response))
      .catch(err => console.error(err));
  };

  const handleKeyEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = event.target.id;
    const input = event.target.value.trim();
    if (id === 'firstName') {
      updateUserInfo({
        ...userInfo, firstName: input
      })
    } else if (id === 'lastName') {
      updateUserInfo({
        ...userInfo, lastName: input
      })
    } else if (id === 'email') {
      updateUserInfo({
        ...userInfo, email: input
      })
    }
  };


  return (
    <div className="container">
      <form
        method="POST"
        onSubmit={submitButtonPressed} // this also works when user press enter key on keyboard
      >
        <div className="form-group">
          <label className="d-flex flex-row justify-content-between align-items-baseline">Last name <small>Required</small></label>
          <input type="text"
            className="form-control"
            id="lastName"
            onChange={event => {
              handleKeyEvent(event);
            }}
            placeholder="Last name" />
        </div>

        <div className="form-group">
          <label>First name</label>
          <input type="text"
            className="form-control"
            id="firstName"
            onChange={event => handleKeyEvent(event)}
            placeholder="First name" />
        </div>

        <div className="form-group">
          <label className="d-flex flex-row justify-content-between align-items-baseline">Email <small>Required</small></label>
          <input type="text"
            className="form-control"
            id="email"
            onChange={event => handleKeyEvent(event)}
            placeholder="user@example.com" />
        </div>

        <button type="submit" className="btn btn-success" disabled={disableCreateButton}>
          Add user
        </button>

      </form>
      <br />
      <button onClick={() => console.log(userInfo)}>Console.log input state</button>

      <br />
      <button onClick={() => {
        console.log('submit button clicked')
      }}>project by name</button>

    </div>

  )
};


export default NewUser;