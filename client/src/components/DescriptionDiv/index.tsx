import React, { useState, useEffect } from 'react';
import EditButton from '../EditButton';
import SaveButton from '../SaveButton';
import CancelButton from '../CancelButton';

type PropsType = {
  text: string;
  saveButtonPressed: (part: string, payload: string) => void;
}

const DescriptionDiv = (props: PropsType) => {

  const [editMode, updateEditMode] = useState(false);
  const [draft, updateDraft] = useState(props.text);

  useEffect(() => {
    updateDraft(props.text)
  }, [props.text])

  return (
    <div>
      {/* label and toggle */}
      <div className="d-flex justify-content-between align-items-baseline">
        <label className="font-weight-light">Description</label>
        {editMode ?
          <div className="d-flex">
            <SaveButton id={"description"}
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

      {/* text area */}
      {editMode ?
        <div className="form-group">
          <small>(Optional)</small>
          <textarea
            className="form-control"
            id="description"
            defaultValue={props.text}
            style={props.text.length > 150 ? { height: '140px', whiteSpace: 'pre-wrap' } : { height: '80px', whiteSpace: 'pre-wrap' }}
            onChange={(event) => {
              updateDraft(event.target.value)
            }}
            placeholder="Description"
          />
        </div>

        :

        <div>
          <p>{props.text}</p>
        </div>
      }


    </div>
  )
}

export default DescriptionDiv