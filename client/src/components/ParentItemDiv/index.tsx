import React, { useState, useEffect } from 'react';
import ParentSelectBox from '../ParentSelectBox';
import EditButton from '../EditButton';
import SaveButton from '../SaveButton';
import CancelButton from '../CancelButton';
import ConsoleLogButton from '../ConsoleLogButton';

type PropsType = {
  type: string;
  currentParentId: string | null;
  parents: ParentType[];
  saveButtonPressed: (part: string, payload: string) => void;
}

type ParentType = {
  type: string;
  name: string;
  _id: string;
}

const ParentItemDiv = (props: PropsType) => {
  const [editMode, updateEditMode] = useState<boolean>(false);
  const [draft, updateDraft] = useState<string | null>(props.currentParentId); //stores selected parentId, which is passed to SaveButton
  const [parentName, updateParentName] = useState<string>('(open)'); //default parent name 

  // display current parent name if found
  useEffect(() => {
    if (props.currentParentId !== null) {
      props.parents.forEach(parent => {
        if (parent._id === props.currentParentId) {
          updateParentName(parent.name);
        }
      })
    } else {
      updateParentName('(open)')
    }
  }, [props.currentParentId])

  return (
    <div>
      {/* label and edit button */}
      <div className="d-flex justify-content-between align-items-baseline">
        <label className="font-weight-light">Parent</label>

        {editMode ?
          <div>
            <SaveButton id="parentId"
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
      {/* end of label and edit button */}

      {editMode ?
        <div>
          <ParentSelectBox
            parentId={props.currentParentId}
            parents={props.parents}
            onChange={updateDraft}
          />
        </div>
        :
        <div>
          <h5 className="mb-0">{parentName}</h5>
          <small className="">{`Parent ID: (${props.currentParentId ? props.currentParentId : 'n/a'})`}</small>
        </div>
      }

      <div className="col-8">
        <ConsoleLogButton name="draft" state={draft} />
        <ConsoleLogButton name="props.currentParentId" state={props.currentParentId} />
        <ConsoleLogButton name="parents" state={props.parents} />
      </div>
    </div>
  )
}

export default ParentItemDiv