import React, { useState } from 'react';
import EditButton from '../EditButton';
import SaveButton from '../SaveButton';
import CancelButton from '../CancelButton';
import { capitalizeWord } from '../../util';

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

      <div className="d-flex justify-content-between align-items-baseline">
        <label className="font-weight-light">
          {`${capitalizeWord(props.type)} name`}
        </label>
        {editMode ?
          <div className="d-flex">
            <SaveButton id={"name"}
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
        <div>
          <input type="text"
            className="form-control"
            id="name"
            onChange={event => updateDraft(event.target.value)}
            placeholder={`${props.type} name`}
            defaultValue={props.name}
          />
        </div>
        :
        <div>
          <span className={`badge badge-${color} py-2 px-3 w-100`}>
            <h4 className="text-left text-wrap m-0">
              {props.name}
            </h4>
          </span>
        </div>
      }


    </div>
  )
}

export default NameBadge