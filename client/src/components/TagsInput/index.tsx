import React from 'react';
import Tag from '../Tag';
import { parseTags } from '../../util/functions';

type PropsType = {
  id?: string;
  placeholder?: string;
  tags: string[];
  onChange: (tags: string[]) => void;
};

const TagsInput = (props: PropsType) => {

  return (
    <div className="form-group">
      <div className="d-flex flex-wrap align-items-baseline">
        {props.tags.length > 0 ? props.tags.map(tag => {
          return (<Tag key={tag} name={tag} />)
        })
          :
          ''
        }
      </div>

      <div className="input-group">
        <input type="text"
          className="form-control text-wrap"
          id={props.id ? props.id : 'tags'}
          onChange={event => {
            props.onChange(parseTags(event.target.value));
          }}
          placeholder={props.placeholder ? props.placeholder : "enter tags ..."}
          defaultValue={`${[...props.tags]}`}
        />
      </div>
      <small>Separate tags by comma</small>
    </div >
  )
}

export default TagsInput;