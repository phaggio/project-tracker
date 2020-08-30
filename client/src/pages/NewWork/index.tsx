import React, { useState, useEffect } from 'react';
import { AxiosResponse } from 'axios';
import { featureRequest, projectRequest, userRequest, itemRequest } from '../../httpRequests';
import FormGroupInput from '../../components/FormGroupInput';
import FormGroupTextArea from '../../components/FormGroupTextArea';
import ConsoleLogButton from '../../components/ConsoleLogButton';

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

type WorkItemType = {
  status: string;
  parentId: string | null;
  parentType: string | null;
  name: string;
  description: string;
  type: string;
  tags: string[];
  assigneeId: string | null
}

const NewWork = ({ match }: PathProps) => {
  const [projects, updateProjects] = useState([]);
  const [features, updateFeatures] = useState([]);
  const [users, updateUsers] = useState([]);

  const [workItem, updateWorkItem] = useState<WorkItemType>({
    status: 'open',
    parentId: match.params.id ? match.params.id : '',
    parentType: match.params.type ? match.params.type : '',
    name: '',
    description: '',
    type: 'workItem',
    tags: [],
    assigneeId: ''
  })

  const [tags, updateTags] = useState<string[]>([])

  const [disableAddButton, updateDisableAddButton] = useState(true);

  // initial GET for projects, features, users selection lists
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


  const parseParentType = (str: string) => {
    const inputArr = str.split('/');
    return inputArr[0] ? inputArr[0] : null;
  };

  const parseParentId = (str: string) => {
    const inputArr = str.split('/');
    return inputArr[2] ? inputArr[2] : null;
  }

  const parseAssigneeId = (str: string) => {
    const assigneeArr = str.split('/');
    return assigneeArr[2] ? assigneeArr[2] : null;
  }

  const updateFormInput = (id: string, str: string) => {
    switch (id) {
      case 'name':
        if (str.trim()) updateWorkItem({ ...workItem, name: str })
        str.trim() ? updateDisableAddButton(false) : updateDisableAddButton(true)
        break;
      case 'description':
        if (str.trim()) updateWorkItem({ ...workItem, description: str })
        break;
      case 'parent':
        updateWorkItem({ ...workItem, parentId: parseParentId(str), parentType: parseParentType(str) })
        break;
      case 'assignee':
        updateWorkItem({ ...workItem, assigneeId: parseAssigneeId(str) });
        break;
      default:
        break;
    }
  }

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
    const data = workItem;
    console.log(`sending`, data);
    itemRequest.addNewWorkItem(data)
      .then((response: AxiosResponse) => console.log(response))
      .catch(err => console.error(err));
  };


  return (
    <div className="container">
      <form
        onSubmit={event => submitButtonPressed(event)}
      >
        <FormGroupInput label="Parent item"
          spellCheck={false}
          optional={false}
          id="parent"
          listName="parents"
          listArr={[...features, ...projects]}
          placeholder="Parent item type/ parent item name/ parent item ID"
          defaultValue={match.params ? `${match.params.type}/${match.params.name}/${match.params.id}` : ''}
          defaultOption="No eligible parent item found"
          onChangeFunction={updateFormInput} />

        <FormGroupInput label="Work item name"
          spellCheck={false}
          optional={false}
          id="name"
          placeholder="work item name"
          onChangeFunction={updateFormInput} />

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

        <FormGroupTextArea label="Description"
          spellCheck={true}
          optional={true}
          id="description"
          placeholder="Work item description..."
          onChangeFunction={updateFormInput} />

        <FormGroupInput label="Assign to: "
          spellCheck={false}
          optional={true}
          id="assignee"
          placeholder="Type/ Assignee name/ ID"
          listName="assignees"
          listArr={users}
          defaultOption="No user found"
          onChangeFunction={updateFormInput} />

        <button type="submit"
          className="btn btn-success"
          disabled={disableAddButton}
        >Add work item
        </button>

      </form>



      <div className="d-flex flex-column col-4">
        <ConsoleLogButton name="work item" state={workItem} />
        <ConsoleLogButton name="projects" state={projects} />
        <ConsoleLogButton name="features" state={features} />
        <ConsoleLogButton name="users" state={users} />
      </div>



    </div>
  )
};


export default NewWork;