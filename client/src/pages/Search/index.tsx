import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { projectRequest, itemRequest } from '../../httpRequests';
import { ItemType, ProjectType } from '../../util/dataTypes';
import { findProjectByProjectId } from '../../util/functions';
import { SearchInput, StatusSelection, ConsoleLogButton } from '../../components';
import { AxiosResponse } from 'axios';

const Search = () => {
  const [projects, updateProjects] = useState<ProjectType[]>([]);
  const [items, updateItems] = useState<ItemType[]>([]);

  const [input, updateInput] = useState<string>('');
  const [filteredItems, updateFilteredItems] = useState<ItemType[]>([]);

  const [projectId, updateProjectId] = useState<string | undefined>();
  const [type, updateType] = useState<string | undefined>();
  const [status, updateStatus] = useState<string>('');

  const [disableFindButton, updateDisableFindButton] = useState(false);

  // INIT call
  useEffect(() => {
    projectRequest
      .getAllProjects()
      .then((response: AxiosResponse) => updateProjects(response.data))
      .catch(err => console.error(err))
    itemRequest
      .getAllItems()
      .then((response: AxiosResponse) => updateItems(response.data))
      .catch(err => console.error(err))
  }, []);

  // load filteredItems array
  useEffect(() => {
    updateFilteredItems(items)
  }, [items]);

  // update filterItems and display it
  useEffect(() => {
    updateFilteredItems(
      items.filter(item => {
        const words = item.name.split(' ');
        let isMatch = false;
        words.forEach(word => {
          if (word.toLowerCase().startsWith(input.trim().toLowerCase())) {
            isMatch = word.toLowerCase().startsWith(input.trim().toLowerCase());
          }
        });
        return isMatch;
      })
    );
  }, [input, items])

  const findButtonPressed = () => {
    console.log(`Find button pressed ...`);
    updateDisableFindButton(true);
    updateInput('');
    itemRequest
      .getItemsBySearchFilter({
        projectId: projectId,
        type: type,
        status: status ? status : undefined
      })
      .then((response: AxiosResponse) => {
        updateItems(response.data);
        updateDisableFindButton(false);
      })
      .catch(err => console.error(err))
  };

  const headerNames = ['Project', 'Type', 'Name', 'Status', 'Assignee']

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-4">

          <div className="shadow rounded p-2 mt-2">
            <div className="pb-3">
              <SearchInput label="Item name" input={input} onChange={updateInput} />
            </div>

            <div className="pb-3">
              <label className="font-weight-light">Project</label>
              <select className="custom-select"
                onChange={(event) => {
                  const selectedProjectId = event.target.selectedOptions[0].value;
                  if (selectedProjectId === 'all') {
                    updateProjectId(undefined)
                  } else {
                    updateProjectId(selectedProjectId)
                  }
                }}>
                <option value="all">All</option>
                <option value='null'>(open)</option>
                {projects ?
                  projects.map(project => {
                    return (<option key={project._id} value={project._id}>{project.name}</option>)
                  })
                  :
                  ``
                }
              </select>
            </div>

            <div className="pb-3">
              <label className="font-weight-light">Type</label>
              <select className="custom-select"
                onChange={(event) => { updateType(event.target.selectedOptions[0].value ? event.target.selectedOptions[0].value : undefined) }}>
                <option value=''>All</option>
                <option value='feature'>Feature</option>
                <option value='work'>Work</option>
                <option value='bug'>Bug</option>
              </select>
            </div>

            <div className="pb-3">
              <label className="font-weight-light">Status</label>
              <StatusSelection all={true} onChange={updateStatus} />
            </div>

            <div>
              <button className="btn btn-primary"
                type="submit"
                onClick={findButtonPressed}
                disabled={disableFindButton}>Find</button>
            </div>

          </div>
        </div>

        <div className="col-12 col-md-8">

          <h3>Item table goes here ...</h3>

          <div>


            {
              filteredItems ? filteredItems.map(item => {
                return <Link className="btn btn-primary btn-sm mr-2"
                  key={item._id} to={`/${item.type}/${item._id}`}>{item.name}</Link>
              })
                :
                'no item'
            }
          </div>
        </div>



        <div className="col-3">
          <ConsoleLogButton name="projects" state={projects} />
          <ConsoleLogButton name="items" state={items} />
          <ConsoleLogButton name="input" state={input} />
          <ConsoleLogButton name="projectId" state={projectId} />
          <ConsoleLogButton name="type" state={type} />
          <ConsoleLogButton name="status" state={status} />
        </div>

      </div>
    </div>
  )
}

export default Search;