import React, { useState } from 'react';
import EditButton from '../EditButton';
import SaveButton from '../SaveButton';
import CancelButton from '../CancelButton';
import ConsoleLogButton from '../ConsoleLogButton';
import AssigneeSelectBox from '../AssigneeSelectBox';

type PropsType = {
  assigneeId: string | null;
  assignee: string;
  users: userObj[];
  saveButtonPressed: (part: string, payload: PayloadObj) => void;
}

type PayloadObj = {
  assigneeId: string | null;
  assignee: string;
}

type userObj = {
  type: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  _id: string;
}

const AssigneeDiv = (props: PropsType) => {
  const [editMode, updateEditMode] = useState(false);
  const [draft, updateDraft] = useState<PayloadObj>({
    assignee: props.assignee,
    assigneeId: props.assigneeId
  });
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

      {editMode ?
        <AssigneeSelectBox currentAssigneeId={props.assigneeId}
          currentAssignee={props.assignee}
          users={users}
          onChange={updateDraft} />
        :
        <div>
          <h5>{props.assignee}</h5>
        </div>
      }

      <hr className="mt-2" />

      <ConsoleLogButton state={draft} name="assignee draft" />
      <ConsoleLogButton state={users} name="users" />
    </div >
  )
}

export default AssigneeDiv