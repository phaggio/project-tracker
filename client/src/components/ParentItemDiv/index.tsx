import React, { useState } from 'react';
import EditButton from '../EditButton';
import SaveButton from '../SaveButton';
import CancelButton from '../CancelButton';
import ConsoleLogButton from '../ConsoleLogButton';

type PropsType = {
  type: string;
  parentType: string | null;
  parentName: string;
  parentId: string | null;
  saveButtonPressed: (part: string, payload: PayloadType) => void;
}

type PayloadType = {
  parentType: string | null;
  parentName: string;
  parentId: string | null;
}

const ParentItemDiv = (props: PropsType) => {
  const [editMode, updateEditMode] = useState<boolean>(false);
  const [draft, updateDraft] = useState<PayloadType>({
    parentType: props.parentType,
    parentName: props.parentName,
    parentId: props.parentId
  })


  return (
    <div>
      <div className="d-flex justify-content-between align-items-baseline">
        <label className="font-weight-light">Parent</label>

        {editMode ?
          <div>
            <SaveButton id="parent"
              editState={editMode}
              toggleEditState={updateEditMode}
              payload={draft}
              pressed={props.saveButtonPressed} />
            <CancelButton editState={editMode}
              toggleEditState={updateEditMode} />
          </div>
          :
          <EditButton editState={editMode} onClick={updateEditMode} />
        }
      </div>

      {editMode ?
        <div>
          Need drop down list here
        </div>
        :
        <div>
          <h5>{props.parentName}</h5>
        </div>
      }

      <ConsoleLogButton name="draft" state={draft} />

    </div>
  )
}

export default ParentItemDiv