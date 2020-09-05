import React, { useState } from 'react';
import EditButton from '../EditButton';
import SaveButton from '../SaveButton';
import CancelButton from '../CancelButton';
import TagsInput from '../../components/TagsInput';
import Tag from '../Tag';
import { parseTags } from '../../util/functions';

type PropsType = {
  type: string;
  tags: string[];
  saveButtonPressed: (part: string, payload: string | string[]) => void;
}

const TagsDiv = (props: PropsType) => {
  const [editMode, updateEditMode] = useState<boolean>(false);
  const [draft, updateDraft] = useState<string[]>(props.tags);

  return (
    <div>
      {/* label and buttons */}
      <div className="d-flex justify-content-between align-items-baseline">
        <label className="font-weight-light">Tags</label>
        {/* switch between edit button and save/cancel buttons */}
        {editMode ?
          <div className="d-flex">
            <SaveButton id="tags"
              editState={editMode}
              toggleEditState={updateEditMode}
              payload={draft}
              pressed={props.saveButtonPressed} />
            <CancelButton editState={editMode} toggleEditState={updateEditMode} />
          </div>
          :
          // upper right hand edit button
          <EditButton editState={editMode} onClick={updateEditMode} />
        }
      </div>

      {/* tags */}
      {editMode ?
        <div className="form-group">
          <small>(Optional)</small>

          <TagsInput tags={draft} onChange={updateDraft}/>

          {/* <div className="d-flex flex-wrap align-items-baseline">
            {
              draft.length > 0 ? draft.map(tag => {
                return (<Tag key={tag} name={tag} />)
              })
                :
                ``
            }
          </div>
          <div className="input-group">
            <input type="text"
              className="form-control text-wrap"
              id="tags"
              onChange={event => updateDraft(parseTags(event.target.value))}
              placeholder="Separate tags by comma"
              defaultValue={`${[...props.tags]}`}
            />
          </div>
          <small>Separate tags by comma</small> */}

        </div >
        :

        // non-edit mode
        <div className="d-flex flex-wrap align-items-baseline">
          {
            props.tags.map(tag => {
              return (<Tag key={tag} name={tag} />)
            })
          }
        </div>
      }

    </div>
  )
}

export default TagsDiv