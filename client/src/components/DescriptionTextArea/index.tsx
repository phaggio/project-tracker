import React, { useState, useEffect } from 'react';

type PropsType = {
  type: string;
  text: string;
  saveButtonPressed: (part: string, payload: string) => void;
}

const DescriptionTextArea = (props: PropsType) => {

  const [editMode, updateEditMode] = useState(false);
  const [draft, updateDraft] = useState(props.text);

  useEffect(() => {
    updateDraft(props.text)
  }, [props.text])

  return (
    <div>
      {editMode ?
        <div className="form-group">
          <div className="d-flex justify-content-between">
            <h5>Description <small>(Optional)</small></h5>
            <div className="d-flex align-items-start">
              {/* save button */}
              <button className="btn btn-outline-success btn-sm py-0"
                onClick={() => {
                  props.saveButtonPressed('description', draft);
                  updateEditMode(!editMode);
                }}>
                <i className="fas fa-check" />
              </button>

              {/* cancel button */}
              <button className="btn btn-outline-danger btn-sm py-0"
                onClick={() => {
                  updateEditMode(!editMode);
                }}>
                <i className="fas fa-times" />
              </button>
            </div>
          </div>

          <textarea
            className="form-control"
            id="description"
            style={{ whiteSpace: 'pre-wrap', height: '150px' }}
            defaultValue={props.text}
            // style={project.description.length > 60 ? { height: '140px' } : { height: '90px' }}
            onChange={(event) => {
              updateDraft(event.target.value)
            }}
            placeholder="Description"
          />

        </div>

        :

        <div>
          <div className="d-flex">
            <h5 className="mr-1">Description</h5>
            <button className="btn btn-sm p-0 d-flex align-items-start"
              title="edit"
              onClick={() => {
                updateEditMode(!editMode)
              }}>
              <i className="far fa-edit" />
            </button>
          </div>
          <p>{props.text}</p>
        </div>
      }
    </div>
  )
}

export default DescriptionTextArea