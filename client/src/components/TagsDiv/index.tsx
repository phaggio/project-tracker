import React, { useState, useEffect } from 'react';
import EditButton from '../EditButton';
import Tag from '../Tag';
import { parseTags } from '../../util';

type PropsType = {
  type: string;
  tags: string[];
  saveButtonPressed: (part: string, payload: string[]) => void;
}

const TagsDiv = (props: PropsType) => {
  const [editMode, updateEditMode] = useState<boolean>(false);
  const [draft, updateDraft] = useState<string[]>(props.tags);

  return (
    <div>
      {editMode ?

        <div className="form-group">
          <label className="mr-1"> {`Tags: {`}</label>
          {
            draft.length > 0 ? draft.map(tag => {
              return (<span className="badge badge-info mr-1" key={tag}>{tag}</span>)
            }) : ``
          }
          <label> {`}`}</label>
          <div className="input-group">
            <input type="text"
              className="form-control text-wrap"
              id="tags"
              onChange={event => {
                updateDraft(parseTags(event.target.value))
              }}
              placeholder="Separate tags by comma"
              defaultValue={`${[...props.tags]}`}
            />

            <div className="input-group-append">
              {/* save button */}
              <button type="button"
                className="btn btn-outline-success btn-sm"
                onClick={() => {
                  props.saveButtonPressed('tags', draft);
                  updateEditMode(!editMode);
                }}
              >
                <i className="fas fa-check" />
              </button>

              {/* cancel button */}
              <button type="button"
                className="btn btn-outline-danger btn-sm"
                onClick={() => updateEditMode(!editMode)}
              >
                <i className="fas fa-times" />
              </button>
            </div>
          </div>
          <small>Separate tags by comma</small>
        </div >

        :

        // non-edit mode
        <div className="d-flex align-items-start justify-content-between">

          <div className="d-flex flex-wrap align-items-baseline">
            <label className="my-0 mr-1">{`Tags: {`}</label>
            {
              props.tags.map(tag => {
                return (<Tag key={tag} name={tag} />)
              })
            }
            <label className="my-0">{`}`}</label>
          </div>

          {/* upper right hand edit button */}
          <EditButton editState={editMode} onClick={updateEditMode} />
        </div>

      }
    </div>
  )
}

export default TagsDiv