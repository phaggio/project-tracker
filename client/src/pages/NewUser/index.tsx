import React, { useState, useEffect } from 'react';
import { AxiosResponse } from 'axios';
import { userRequest } from '../../httpRequests';
import { ConsoleLogButton } from '../../components';

type NewUserType = {
  firstName: string;
  lastName: string;
  email: string;
}

const NewUser = () => {
  const [disableCreateButton, updateDisableCreateButton] = useState<boolean>(true);
  const [userInfo, updateUserInfo] = useState<NewUserType>(
    {
      firstName: '',
      lastName: '',
      email: ''
    }
  );

  useEffect(() => {
    userInfo.lastName.trim() && userInfo.email.trim() ?
      updateDisableCreateButton(false) : updateDisableCreateButton(true);
  }, [userInfo]);

  const submitButtonPressed = (event: React.FormEvent) => {
    event.preventDefault();

    console.log(`sending from client:`, userInfo);
    userRequest
      .createNewUser(userInfo)
      .then((response: AxiosResponse) => {
        if (response.status === 200) window.alert(`User added.`)
      })
      .catch(err => {
        console.error(err);
        window.alert(`Cannot add user with provided info. ${err}`);
      });
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


      <ConsoleLogButton name="userInfo state" state={userInfo} />
    </div>
  )
};


export default NewUser;