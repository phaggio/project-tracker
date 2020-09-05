import React, { useState, useEffect } from 'react';
import { ProjectType, ItemType } from '../../util/dataTypes';
import { countByStatus } from '../../util/functions'
import { projectRequest, itemRequest } from '../../httpRequests';
import { AddNewDropDownButton, ConsoleLogButton, ProjectList } from '../../components';
import DonutChart from '../../charts/DonutChart';


const Home = () => {
  const [projects, updateProjects] = useState<ProjectType[]>([]);
  const [items, updateItems] = useState<ItemType[]>([]);

  // init Get calls to get all project and item data
  useEffect(() => {
    try {
      projectRequest
        .getAllProjects()
        .then(res => updateProjects(res.data))
      itemRequest
        .getAllWorkItems()
        .then(res => updateItems(res.data))
    } catch (err) {
      console.error(err)
    }
  }, [])

  return (
    <div className="container border border-primary rounded">
      <div className="row">

        <div className="col-12 col-md-4 col-lg-3 col-xl-3 border border-success rounded">
          <ProjectList projects={projects} />
        </div>

        <div className="col-12 col-md-8 col-lg-9 col-xl-9 border border-secondary rounded">
          <div className="d-flex justify-content-between align-items-baseline">
            <label className="font-weight-bold">Snapshot</label>
            <AddNewDropDownButton small={true} includeFeature={true} />
          </div>

          {/* first row */}
          <div className="row">
            <div className="col-12 d-flex flex-wrap">
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
          </div>
          {/* end of first row */}


          {/* second row */}
          <div className="row">
            <div className="col-12 col-lg-6">
              <DonutChart title="Features" data={countByStatus("feature", items)} />
            </div>
            <div className="col-12 col-lg-6">
              <DonutChart title="Work items" data={countByStatus("workItem", items)} />
            </div>
          </div>
          {/* end of second row */}

          {/* third row */}
          <div className="row">
            <div className="col-12 col-lg-6">
              <DonutChart title="Bugs" data={countByStatus("bug", items)} />
            </div>
          </div>
          {/* end of third row */}



        </div>
        {/* end of right side */}

      </div>
      {/* end of main row */}

      {/* debug buttons */}
      <div className="col-5">
        <ConsoleLogButton name="projects" state={projects} />
        <ConsoleLogButton name="work items" state={items} />
        <ConsoleLogButton name="feature count" state={countByStatus('feature', items)} />
        <ConsoleLogButton name="workItem count" state={countByStatus('workItem', items)} />

      </div>

    </div >
  )
};

export default Home;