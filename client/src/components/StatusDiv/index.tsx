import React, { useState } from 'react';
import EditButton from '../EditButton';
import SaveButton from '../SaveButton';
import CancelButton from '../CancelButton';
import { capitalizeWord } from '../../util';

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
            <CancelButton editState={editMode} toggleEditState={updateEditMode} />
          </div>
          :
          <EditButton editState={editMode} onClick={updateEditMode} />
        }
      </div>

      {editMode ?
        <div className="input-group">
          <select className="custom-select"
            defaultValue={props.status}
            onChange={(event) => {
              updateDraft(event.target.selectedOptions[0].value)
            }}
          >
            <option value='open'>Open</option>
            <option value='active'>Active</option>
            <option value='completed'>Completed</option>
            <option value='in-review'>In-review</option>
            <option value='closed'>Closed</option>
          </select>

          <div className="input-group-append">
            <button className="btn btn-light border border-dark"
              type="button"
              onClick={() => {
                props.saveButtonPressed('status', draft)
              }}
            >
              Save
              </button>
          </div>
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