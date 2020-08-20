import React, { useState } from 'react';

type PathProps = {
  history: boolean;
  location: string;
  match: MatchObj;
};

type MatchObj = {
  isExact: boolean;
  params: MatchParams;
  path: string;
  url: string;
};

type MatchParams = {
  type: string;
  name: string;
  id: string;
};

const NewWorkItem = ({ match }: PathProps) => {
  const [parentType, updateParentType] = useState(match.params.type ? match.params.type : '');
  const [parentName, updateParentName] = useState(match.params.name ? match.params.name : '');
  const [parentId, updateParentId] = useState(match.params.id ? match.params.id : '')
  const [name, updateName] = useState('');
  const [assignee, updateAssignee] = useState('');
  const [description, updateDescription] = useState('');
  const [tags, updateTags] = useState<string[]>([])

  const [disableAddButton, updateDisableAddButton] = useState(true);

  // const updateNewWorkItemNameInput = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const input = event.target.value;
  //   input.trim() ? updateDisableAddButton(false) : updateDisableAddButton(true);
  // };


  const handleParentInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  };

  const updateInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = event.target.id;
    const input = event.target.value.trim();
    switch (id) {
      case 'name':
        input ? updateDisableAddButton(false) : updateDisableAddButton(true);
        updateName(input);
        break;
      case 'description':
        updateDescription(input);
        break;
      default:
        break;
    }
  };

  const updateTagsInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const str = event.target.value;
    console.log(str);
    let tagArr: string[] = []
    // check for empty/space str between commas
    str.split(',').forEach((item: string) => {
      if (item.trim().length > 0) {
        tagArr.push(item.trim());
      }
    });
    updateTags(tagArr);
  };


  return (
    <div className="container">
      <form
        onSubmit={() => console.log('submitting...')}
      >

        <div className="form-group">
          <label>Parent item:</label>
          <input type="text"
            className="form-control"
            list="projects"
            onChange={event => handleParentInput(event)}
            placeholder="Select parent item"
            defaultValue={match.params.id ? `${parentType}/${parentName}/${parentId}` : ''}
            spellCheck={false}
          />
          {/* <DataList dataArr={projects}
            listName="projects"
            defaultOption="No project found" /> */}
        </div>

        <div className="form-group">
          <label>Work item name</label>
          <input type="text"
            id="name"
            className="form-control"
            onChange={event => updateInput(event)}
            placeholder="Work item name" />
        </div>

        <div className="form-group">
          <label className="mr-1">{`Tags: {`}</label>
          {
            tags ? tags.map(tag => { return (<span className="badge badge-info mr-1 my-1" key={tag}>{tag}</span>) }) : ``
          }
          <label>{`}`}</label>
          <input type="text"
            className="form-control"
            id="tags"
            onChange={event => updateTagsInput(event)}
            placeholder="Separate tags by comma"
          />
        </div>

        <div className="form-group">
          <label>Description <small>(Optional)</small></label>
          <input type="text"
            id="description"
            className="form-control"
            onChange={event => updateInput(event)}
            placeholder="Description" />
        </div>

        <button type="submit"
          className="btn btn-success"
          disabled={disableAddButton}
        >Add work item
        </button>

      </form>




      <div>
        <button className="btn btn-danger btn-sm mt-2"
          onClick={() => console.log(parentType, parentName, parentId)}
        >
          console.log parent state
        </button>
        <button className="btn btn-danger btn-sm mt-2"
          onClick={() => console.log(name, description, assignee)}
        >
          console.log work item state
        </button>
      </div>
    </div>

  )
};


export default NewWorkItem;