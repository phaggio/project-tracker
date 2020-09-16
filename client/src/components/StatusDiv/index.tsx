import React, { useState } from 'react';
import { EditButton, SaveButton, CancelButton, StatusSelection } from '..'
import { capitalizeWord } from '../../util/functions';

type PropsType = {
  type: string;
  status: string;
  saveButtonPressed: (part: string, payload: string) => void;
}

const StatusDiv = (props: PropsType) => {
  const [editMode, updateEditMode] = useState(false)
  const [draft, updateDraft] = useState<string>(props.status)

  return (
    <div>
      {/* label and edit button */}
      <div className="d-flex justify-content-between align-items-baseline">
        <label className="font-weight-light">Status: </label>
        {editMode ?
          <div className="d-flex">
            <SaveButton id="status"
              editState={editMode}
              toggleEditState={updateEditMode}
              payload={draft}
              pressed={props.saveButtonPressed} />
            <CancelButton editState={editMode} toggleEditState={updateEditMode} />
          </div>
          :
          <EditButton editState={editMode} onClick={updateEditMode} />
        }
      </div>

      {editMode ?
        <div className="input-group">
          <StatusSelection type={props.type} defaultStatus={props.status} onChange={updateDraft} />
        </div>
        :
        <div>
          <h5>{`${capitalizeWord(props.status)}`}</h5>
        </div>
      }

    </div>
  )
}

export default StatusDiv