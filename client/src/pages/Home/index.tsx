import React, { useState, useEffect } from 'react';
import { ProjectType, ItemType } from '../../util/dataTypes';
import { countItemsByType, countByStatus } from '../../util/functions'
import { projectRequest, itemRequest } from '../../httpRequests';
import { ProjectList, AddNewDropDownButton, CountCard } from '../../components';
import DonutChart from '../../charts/DonutChart';

const Home = () => {
  const [projects, updateProjects] = useState<ProjectType[]>([]);
  const [items, updateItems] = useState<ItemType[]>([]);

  // init Get calls to get all project and item data
  useEffect(() => {
    try {
      projectRequest
        .getAllProjects()
        .then(res => {
          updateProjects(Array.from(res.data))
        })
      itemRequest
        .getAllWorkItems()
        .then(res => updateItems(Array.from(res.data)))
    } catch (err) {
      console.error(err);
    }
  }, [])

  return (
    <div className="container">
      <div className="row">

        <div className="col-12 col-md-4 col-lg-3 col-xl-3">
          {/* project list div */}
          <div className="shadow rounded p-2 mt-2">
            <ProjectList projects={projects} />
          </div>
        </div>

        <div className="col-12 col-md-8 col-lg-9 col-xl-9">

          {/* snapshot div */}
          <div className="shadow rounded p-1 mt-2">

            <div className="d-flex justify-content-between align-items-baseline p-1">
              <label className="font-weight-light">Snapshot</label>
              <AddNewDropDownButton small={true} includeFeature={true} />
            </div>

            <div className="row m-0">
              <div className="col-6 col-lg-3 p-1">
                <CountCard type="project"
                  count={projects.length} />
              </div>
              <div className="col-6 col-lg-3 p-1">
                <CountCard type="feature"
                  count={countItemsByType('feature', items)} />
              </div>
              <div className="col-6 col-lg-3 p-1">
                <CountCard type="workItem"
                  count={countItemsByType('workItem', items)} />
              </div>
              <div className="col-6 col-lg-3 p-1">
                <CountCard type="bug"
                  count={countItemsByType('bug', items)} />
              </div>
            </div>

          </div>


          {/* progress div */}
          <div className="shadow rounded p-1 mt-2">
            <div className="d-flex justify-content-between align-items-baseline p-1">
              <label className="font-weight-light">Progress</label>

            </div>

            <div className="row">
              <div className="col-12 col-lg-6 p-1">
                <DonutChart title="Projects" type="project" data={countByStatus('project', projects)} />
              </div>
              <div className="col-12 col-lg-6 p-1">
                <DonutChart title="Features" data={countByStatus("feature", items)} />
              </div>
              <div className="col-12 col-lg-6 p-1">
                <DonutChart title="Work items" data={countByStatus("workItem", items)} />
              </div>
              <div className="col-12 col-lg-6 p-1">
                <DonutChart title="Bugs" data={countByStatus("bug", items)} />
              </div>
            </div>

          </div>


        </div>
        {/* end of right side */}
      </div>
      {/* end of main row */}
    </div >
  )
};

export default Home;