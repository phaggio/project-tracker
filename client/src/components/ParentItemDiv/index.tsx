import React, { useState } from 'react';
import ParentSelectBox from '../ParentSelectBox';
import EditButton from '../EditButton';
import SaveButton from '../SaveButton';
import CancelButton from '../CancelButton';
import ConsoleLogButton from '../ConsoleLogButton';

type PropsType = {
  type: string;
  currentParent: ParentPayloadType;
  parents: ParentType[];
  saveButtonPressed: (part: string, payload: ParentPayloadType) => void;
}

type ParentType = {
  type: string;
  name: string;
  _id: string;
}

type ParentPayloadType = {
  parentType: string | null;
  parentName: string;
  parentId: string | null;
}

const ParentItemDiv = (props: PropsType) => {

  const [editMode, updateEditMode] = useState<boolean>(false);
  const [draft, updateDraft] = useState<ParentPayloadType>(props.currentParent);


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
          <ParentSelectBox currentParent={props.currentParent}
            parents={props.parents}
            onChange={updateDraft}
          />
        </div>
        :
        <div>
          <h5>{props.currentParent.parentName}</h5>
        </div>
      }

      <div className="col-3">
        <ConsoleLogButton name="draft" state={draft} />
        <ConsoleLogButton name="parents" state={props.currentParent} />
        <ConsoleLogButton name="parents" state={props.parents} />
      </div>
    </div>
  )
}

export default ParentItemDiv