import React, { useState } from 'react';
import EditButton from '../EditButton';
import SaveButton from '../SaveButton';
import CancelButton from '../CancelButton';
import ConsoleLogButton from '../ConsoleLogButton';
import SearchSelectBox from '../SearchSelectBox';


type PropsType = {
  assignee: string;
  users: userObj[];
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
  const [users] = useState<userObj[]>(props.users);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-baseline">
        <label className="font-weight-light">Assignee</label>
        {
          editMode ?
            <div className="d-flex">
              <SaveButton id="assignee"
                editState={editMode}
                toggleEditState={updateEditMode}
                pressed={props.saveButtonPressed}
                payload={draft} />
              <CancelButton editState={editMode} toggleEditState={updateEditMode} />
            </div>
            :
            // edit button on upper right hand corner
            <EditButton editState={editMode} onClick={updateEditMode} />
        }
      </div>

      {editMode && users.length > 0 ?
        <SearchSelectBox defaultValue={props.assignee}
          users={users} onChange={updateDraft} />
        :
        <div>
          <h5>{props.assignee}</h5>
        </div>
      }

      <hr className="mt-3" />
      <button onClick={() => console.log(users)}>check users state in AssigneeDiv</button>
      <ConsoleLogButton state={draft} name="draft" />
    </div >
  )
}

export default AssigneeDiv