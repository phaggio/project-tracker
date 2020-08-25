import React, { useState } from 'react';

type PropsType = {
  type: string;
  name: string;
  saveButtonPressed: (part: string, payload: string) => void;
}

const NameBadge = (props: PropsType) => {
  const [editMode, updateEditMode] = useState<boolean>(false);
  const [draft, updateDraft] = useState<string>(props.name);
  const color = ((type: string) => {
    switch (type) {
      case 'project':
        return 'primary';
      case 'feature':
        return 'warning';
      case 'workItem':
        return 'light';
      default:
        return 'primary';
    }
  })(props.type)

  return (
    <div>
      {editMode ?
        <div className="input-group">
          <input type="text"
            className="form-control"
            id="name"
            onChange={event => {
              updateDraft(event.target.value);
            }}
            placeholder={`${props.type} name`}
            defaultValue={props.name}
          />

          <div className="input-group-append">
            {/* save button */}
            <button type="button"
              className="btn btn-outline-success btn-sm"
              id="name"
              disabled={draft.trim().length === 0}
              onClick={() => {
                props.saveButtonPressed('name', draft);
                updateEditMode(!editMode);
              }}
            >
              <i className="fas fa-check" datatype={props.type} />
            </button>

            {/* cancel button */}
            <button type="button"
              className="btn btn-outline-danger btn-sm"
              onClick={() => {
                updateEditMode(!editMode);
              }}
            >
              <i className="fas fa-times" />
            </button>
          </div>
        </div>
        :
        <div className="d-flex align-items-start">
          <span className={`badge badge-${color} d-flex justify-content-between align-items-start`}>
            <h4 className="py-1 px-2 m-0 text-left text-wrap">
              {props.name}
            </h4>
          </span>
          {/* edit button on upper right hand corner */}
          <button className="btn btn-sm p-0 d-flex align-items-start"
            title="edit"
            onClick={() => {
              updateEditMode(!editMode)
            }}>
            <i className="far fa-edit" />
          </button>
        </div>
      }
    </div>
  )
}

export default NameBadge