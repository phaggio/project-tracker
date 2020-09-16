import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { projectRequest, itemRequest } from '../../httpRequests';
import { ItemType, ProjectType } from '../../util/dataTypes';
import { ConsoleLogButton } from '../../components';
import { AxiosResponse } from 'axios';

const Search = () => {
  const [projects, updateProjects] = useState<ProjectType[]>([]);
  const [items, updateItems] = useState<ItemType[]>([]);


  const [projectId, updateProjectId] = useState<string | null | undefined>();
  const [type, updateType] = useState<string | undefined>();
  const [status, updateStatus] = useState<string | undefined>();

  const [disableFindButton, updateDisableFindButton] = useState(false);

  useEffect(() => {
    projectRequest
      .getAllProjects()
      .then((response: AxiosResponse) => updateProjects(response.data))
      .catch(err => console.error(err))
    itemRequest
      .getAllItems()
      .then((response: AxiosResponse) => updateItems(response.data))
      .catch(err => console.error(err))
  }, [])

  const findButtonPressed = () => {
    console.log(`Find button pressed ...`)
    updateDisableFindButton(true);
    // let projectQuery;
    // if (projectId === '') {
    //   projectQuery = undefined
    // } else if (projectId === null) {
    //   projectQuery = { $type: 10 }
    // } else {
    //   projectQuery = projectId
    // }
    itemRequest
      .getItemsWithQuery({
        projectId: projectId,
        type: type,
        status: status
      })
      .then((response: AxiosResponse) => {
        updateItems(response.data);
        updateDisableFindButton(false);
      })
      .catch(err => console.error(err))
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-4">

          <div className="pb-3">
            <label className="font-weight-light">Item name</label>
            <div className="input-group">
              <input type="text" className="form-control" placeholder="search ..."
                aria-label="search item"
                aria-describedby="addon-wrapping" />
            </div>
          </div>

          <div className="pb-3">
            <label className="font-weight-light">Project</label>
            <select className="custom-select"
              // defaultValue={props.defaultStatus ? props.defaultStatus : 'Open'}
              onChange={(event) => {
                const selectedProjectId = event.target.selectedOptions[0].value;
                if (selectedProjectId === 'null') {
                  updateProjectId(null)
                } else if (selectedProjectId === 'all') {
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
            <select className="custom-select"
              onChange={(event) => { updateStatus(event.target.selectedOptions[0].value ? event.target.selectedOptions[0].value : undefined) }}>
              <option value=''>All</option>
              <option value='Open'>Open</option>
              <option value='Active'>Active</option>
              <option value='Completed'>Completed</option>
              <option value='In-review'>In-review</option>
              <option value='Closed'>Closed</option>
            </select>
          </div>

          <div>
            <button className="btn btn-dark"
              type="submit"
              onClick={findButtonPressed}
              disabled={disableFindButton}>Find</button>
          </div>

        </div>

        <div className="col-12 col-md-8">
          <h3>Item table goes here ...</h3>
          <div>
            {
              items ? items.map(item => {
                return <Link className="btn btn-secondary btn-sm mr-2"
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
          <ConsoleLogButton name="projectId" state={projectId} />
          <ConsoleLogButton name="type" state={type} />
          <ConsoleLogButton name="status" state={status} />
        </div>

      </div>
    </div>
  )
}

export default Search;