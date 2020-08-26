import React, { useState, useEffect } from 'react';

type PropsType = {
  type: string;
  status: string;
  saveButtonPressed: (part: string, payload: string) => void;
}

const StatusDropDown = (props: PropsType) => {
  const [draft, updateDraft] = useState<string>(props.status)

  useEffect(() => {
    updateDraft(props.status)
  }, [props.status])

  return (
    <div>
      <label className="m-0 font-weight-light">Status: </label>
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
    </div>
  )
}

export default StatusDropDown