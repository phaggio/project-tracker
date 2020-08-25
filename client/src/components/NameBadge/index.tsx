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
        <div>
          <div className="d-flex justify-content-between">
            <label className="m-0">{`${props.type.charAt(0).toUpperCase()}${props.type.slice(1)} name`}</label>
            <div className="d-flex">
              <button type="button"
                style={{ width: '30px' }}
                className="btn btn-outline-success btn-sm py-0"
                id="name"
                disabled={draft.trim().length === 0}
                onClick={() => {
                  props.saveButtonPressed('name', draft);
                  updateEditMode(!editMode);
                }}>
                <i className="fas fa-check" datatype={props.type} />
              </button>
              <button type="button"
                style={{ width: '30px' }}
                className="btn btn-outline-danger btn-sm py-0"
                onClick={() => {
                  updateEditMode(!editMode);
                }}>
                <i className="fas fa-times" />
              </button>
            </div>
          </div>

          <input type="text"
            className="form-control"
            id="name"
            onChange={event => {
              updateDraft(event.target.value);
            }}
            placeholder={`${props.type} name`}
            defaultValue={props.name}
          />

        </div>
        :
        <div>
          <div className="d-flex justify-content-between">
            <label className="m-0">{`${props.type.charAt(0).toUpperCase()}${props.type.slice(1)} name`}</label>
            {/* edit button on upper right hand corner */}
            <button className="btn btn-sm p-0 ml-1"
              title="edit"
              onClick={() => {
                updateEditMode(!editMode)
              }}>
              <i className="far fa-edit" />
            </button>
          </div>

          <div className="">
            <span className={`badge badge-${color} p-2 w-100`}>
              <h4 className="text-left text-wrap m-0">
                {props.name}
              </h4>
            </span>
          </div>
        </div>
      }
    </div>
  )
}

export default NameBadge