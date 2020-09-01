import React, { useState, useEffect } from 'react';
import { ProjectType, ItemType } from '../../util/dataTypes';
import ProjectList from '../../components/ProjectList';
import PieChart from '../../charts/PieChart';
import { projectRequest, itemRequest } from '../../httpRequests';
import ConsoleLogButton from '../../components/ConsoleLogButton';

const Home = () => {
  const [projects, updateProjects] = useState<ProjectType[]>([]);
  const [items, updateItems] = useState<ItemType[]>([]);

  // init Get calls to get all project and item data
  useEffect(() => {
    try {
      projectRequest
        .getAllProjects()
        .then(res => updateProjects(res.data))
      itemRequest.getAllWorkItems()
        .then(res => updateItems(res.data))
    } catch (err) {
      console.error(err)
    }
  }, [])

  return (
    <div className="container border border-primary rounded">

      <div className="row">

        <div className="col-12 col-md-3 lg-4 border border-success rounded">
          <ProjectList projects={projects} />
        </div>

        <div className="col-12 col-md-9 lg-8 border border-secondary rounded">
          <h4>Snapshot</h4>

          <div className="d-flex flex-wrap">
            <div className="d-flex flex-row align-items-baseline border border-primary rounded w-auto px-3 my-2 mr-2 shadow">
              <div className="display-3 text-primary">{`${projects.length}`}</div>
              <small className="ml-2">Projects</small>
            </div>

            <div className="d-flex flex-row align-items-baseline border border-info rounded-lg w-auto px-3 my-2 mr-2 shadow">
              <div className="display-3 text-warning">{items.filter(item => item.type === 'feature').length}</div>
              <small className="ml-2">Features</small>
            </div>

            <div className="d-flex flex-row align-items-baseline border border-secondary rounded w-auto px-3 my-2 mr-2 shadow">
              <div className="display-3 text-secondary">{items.filter(item => item.type === 'workItem').length}</div>
              <small className="ml-2">Work items</small>
            </div>

            <div className="d-flex flex-row align-items-baseline border border-secondary rounded w-auto px-3 my-2 mr-2 shadow">
              <div className="display-3 text-danger">{items.filter(item => item.type === 'bug').length}</div>
              <small className="ml-2">Bugs</small>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="d-flex">
                <div className="d-flex flex-column justify-content-center rounded-lg w-auto px-3 my-2 mr-2 shadow w-100">
                  <div className="display-3 text-warning">{items.filter(item => item.type === 'feature').length}</div>
                  <small className="ml-2">Features</small>
                </div>
                <PieChart dataArr={[
                  { name: 'Open', value: 70 },
                  { name: 'Active', value: 50 },
                  { name: 'Completed', value: 20 },
                  { name: 'In-review', value: 30 },
                ]} />
              </div>
            </div>
          </div>


          Add something else here later...

          <PieChart dataArr={[
            { name: 'Open', value: 70 },
            { name: 'Active', value: 50 },
            { name: 'Completed', value: 20 },
            { name: 'In-review', value: 30 },
          ]} />
        </div>

      </div>


      {/* debug buttons */}
      <div className="col-5">
        <ConsoleLogButton name="projects" state={projects} />
        <ConsoleLogButton name="work items" state={items} />
      </div>

    </div>
  )
};

export default Home;