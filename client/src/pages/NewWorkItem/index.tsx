import React, { useState, useEffect } from 'react';
import { AxiosResponse } from 'axios';
import { featureRequest, projectRequest, userRequest, workItemRequest } from '../../httpRequests';
import ParentList from '../../components/ParentList';
import UserList from '../../components/UserList';

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
  const [projects, updateProjects] = useState([]);
  const [features, updateFeatures] = useState([]);
  const [users, updateUsers] = useState([]);

  const [parentType, updateParentType] = useState(match.params.type ? match.params.type : '');
  const [parentName, updateParentName] = useState(match.params.name ? match.params.name : '');
  const [parentId, updateParentId] = useState(match.params.id ? match.params.id : '');
  const [name, updateName] = useState('');
  const [assigneeId, updateAssigneeId] = useState('');
  const [description, updateDescription] = useState('');
  const [tags, updateTags] = useState<string[]>([])

  const [disableAddButton, updateDisableAddButton] = useState(true);

  useEffect(() => {
    projectRequest.getAllProjects()
      .then((response: AxiosResponse) => {
        console.log('adding projects to projects...');
        updateProjects(response.data);
      })
    featureRequest.getAllFeatures()
      .then((response: AxiosResponse) => {
        console.log('adding features to features...');
        updateFeatures(response.data);
      });
    userRequest.getUser()
      .then((response: AxiosResponse) => {
        console.log('adding users to users...');
        updateUsers(response.data);
      })
  }, [])

  const parseParentInfo = (str: string) => {
    const infoArr = str.split('/');
    updateParentType(infoArr[0] ? infoArr[0].trim() : '');
    updateParentName(infoArr[1] ? infoArr[1].trim() : '');
    updateParentId(infoArr[2] ? infoArr[2].trim() : '');
  };

  const parseAssignee = (str: string) => {
    const start = str.indexOf('(');
    const end = str.indexOf(')');
    return str.slice(start + 1, end);
  }

  const updateInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = event.target.id;
    const input = event.target.value.trim();
    switch (id) {
      case 'parent':
        parseParentInfo(input);
        break;
      case 'name':
        input ? updateDisableAddButton(false) : updateDisableAddButton(true);
        updateName(input);
        break;
      case 'description':
        updateDescription(input);
        break;
      case 'assignee':
        updateAssigneeId(parseAssignee(input));
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

  const submitButtonPressed = (event: React.FormEvent) => {
    event.preventDefault(); //default action is clear the form
    console.log(`submit button pressed..`)
    const data = {
      parentId: parentId,
      parentType: parentType,
      name: name,
      tags: tags,
      description: description,
      assigneeId: assigneeId
    };
    console.log(`sending`, data);
    workItemRequest.addNewWorkItem(data)
      .then((response: AxiosResponse) => console.log(response))
      .catch(err => console.error(err));
  };


  return (
    <div className="container">
      <form
        onSubmit={event => submitButtonPressed(event)}
      >

        <div className="form-group">
          <label>Parent item:</label>
          <input type="text"
            className="form-control"
            id="parent"
            list="projects"
            onChange={event => updateInput(event)}
            placeholder="Select parent item"
            defaultValue={match.params.id ? `${parentType}/${parentName}/${parentId}` : ''}
            spellCheck={false}
          />
          <ParentList dataArr={[...projects, ...features]}
            listName="projects"
            defaultOption="No project found" />
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

        <div className="form-group">
          <label>Assign to: </label>
          <input type="text"
            className="form-control"
            id="assignee"
            list="assignees"
            onChange={event => updateInput(event)}
            placeholder="Assignee" />
          <UserList dataArr={users}
            listName="assignees"
            defaultOption="No user found" />
        </div>

        <button type="submit"
          className="btn btn-success"
          disabled={disableAddButton}
        >Add work item
        </button>

      </form>




      <div className="d-flex flex-column">
        <button className="btn btn-danger btn-sm mt-2"
          onClick={() => console.log(parentType, parentName, parentId)}
        >
          console.log parent state
        </button>
        <button className="btn btn-danger btn-sm mt-2"
          onClick={() => console.log(name, description, assigneeId)}
        >
          console.log work item state
        </button>
        <button className="btn btn-danger btn-sm mt-2"
          onClick={() => {
            console.log(projects);
            console.log(features);
          }}
        >
          console.log projects features state
        </button>

        <button className="btn btn-danger btn-sm mt-2"
          onClick={() => {
            console.log(users);
          }}
        >
          console.log users state
        </button>
      </div>
    </div>

  )
};


export default NewWorkItem;