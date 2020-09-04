import React, { useState, useEffect } from 'react';
import { UserType } from '../../util/dataTypes';
import EditButton from '../EditButton';
import SaveButton from '../SaveButton';
import CancelButton from '../CancelButton';
import ConsoleLogButton from '../ConsoleLogButton';
import AssigneeSelectBox from '../AssigneeSelectBox';

type PropsType = {
  assigneeId: string | null;
  users: UserType[];
  saveButtonPressed: (part: string, payload: string) => void;
}

const AssigneeDiv = (props: PropsType) => {
  const [editMode, updateEditMode] = useState(false);
  const [draft, updateDraft] = useState<string | null>(props.assigneeId);

  const [assigneeName, updateAssigneeName] = useState<string>('Unassigned'); //default parent name 

  // display current parent name if found
  useEffect(() => {
    if (props.assigneeId !== null) {
      props.users.forEach(user => {
        if (user._id === props.assigneeId) updateAssigneeName(user.fullName)
      })
    } else {
      updateAssigneeName('Unassigned');
    }
  }, [props.assigneeId, props.users])

  return (
    <div>
      <div className="d-flex justify-content-between align-items-baseline">
        <label className="font-weight-light">Assignee</label>
        {
          editMode ?
            <div className="d-flex">
              <SaveButton id="assigneeId"
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
          users={props.users}
          onChange={updateDraft} />
        :
        <div>
          <h5>{assigneeName}</h5>
        </div>
      }

      <hr className="mt-2" />

      <ConsoleLogButton state={draft} name="assignee draft" />
      <ConsoleLogButton state={props.users} name="props.users" />
    </div >
  )
}

export default AssigneeDiv