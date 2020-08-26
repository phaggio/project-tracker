import React, { useState, useEffect } from 'react';
import ConsoleLogButton from '../ConsoleLogButton';
import SearchSelectBox from '../SearchSelectBox';

type PropsType = {
  type: string;
  assignee: string;
  users: userObj[] | undefined;
  saveButtonPressed: (part: string, payload: string) => void;
}

type userObj = {
  type: string;
  firstName: string;
  lastName: string;
  fullName: string;
  _id: string;
}

const AssigneeDiv = (props: PropsType) => {
  const [editMode, updateEditMode] = useState(false);
  const [draft, updateDraft] = useState(props.assignee);
  const [users, updateUsers] = useState<userObj[] | undefined>();

  useEffect(() => {
    updateUsers(props.users)
  }, [])

  return (
    <div>
      <div className="d-flex justify-content-between align-items-baseline">
        <label className="font-weight-light">Assignee</label>
        {
          editMode ?
            <div className="d-flex">
              <button type="button"
                style={{ width: '30px' }}
                className="btn btn-outline-success btn-sm py-0"
                id="assignee"
                disabled={draft.trim().length === 0}
                onClick={() => {
                  // props.saveButtonPressed('assignee', draft);
                  updateEditMode(!editMode);
                }}>
                <i className="fas fa-check" datatype={props.type} />
              </button>
              <button type="button"
                style={{ width: '30px' }}
                className="btn btn-outline-danger btn-sm py-0"
                onClick={() => {
                  updateEditMode(!editMode);
                  console.log(users)
                }}>
                <i className="fas fa-times" />
              </button>
            </div>
            :
            // edit button on upper right hand corner
            <button className="btn btn-sm p-0"
              title="edit"
              onClick={() => {
                updateEditMode(!editMode);
              }}>
              <i className="far fa-edit" />
            </button>
        }
      </div>

      {editMode ?
        <SearchSelectBox users={users ? users : []} onChange={updateDraft} />
        :
        <div>

        </div>
      }

      <hr className="mt-3" />
      <button onClick={() => console.log(users)}>check users state in AssigneeDiv</button>
      <ConsoleLogButton state={draft} name="draft" />
    </div >
  )
}

export default AssigneeDiv