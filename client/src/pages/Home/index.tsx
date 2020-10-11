import React, { useState, useEffect } from 'react';
import { ProjectType, ItemType } from '../../util/dataTypes';
import { countItemsByType, countByStatus } from '../../util/functions'
import { projectRequest, itemRequest } from '../../httpRequests';
import { ProjectList, CountCard, ConsoleLogButton } from '../../components';
import { AxiosResponse } from 'axios';
import DonutChart from '../../charts/DonutChart';
import DebugModeContext from '../../util/DebugModeContext';

const Home = () => {
  const [projects, updateProjects] = useState<ProjectType[]>([]);
  const [items, updateItems] = useState<ItemType[]>([]);

  const [loadingProjects, updateLoadingProjects] = useState(true);
  const [loadingItems, updateLoadingItems] = useState(true);

  // init Get calls to get all project and item data
  useEffect(() => {
    try {
      projectRequest
        .getAllProjects()
        .then((response: AxiosResponse) => {
          updateProjects(Array.from(response.data));
          updateLoadingProjects(prev => { return !prev });
        })
      itemRequest
        .getAllItems()
        .then((response: AxiosResponse) => {
          updateItems(Array.from(response.data));
          updateLoadingItems(prev => { return !prev });
        })
    } catch (err) {
      console.error(err);
    }
  }, [])

  return (
    <div className="container">
      <div className="row">

        <div className="col-12 col-md-4 col-lg-3 col-xl-3">
          {/* project list div */}
          <div className="shadow rounded p-1 mt-2">
            <div className="d-flex justify-content-between align-items-baseline p-1">
              <label className="font-weight-light">Projects</label>
              {/* <NewButton
                name="New project"
                url="/new/project"
                ariaLabel="add-new-project"
                small={true} /> */}
            </div>
            <div className="col-12 p-1">
              <ProjectList loading={loadingProjects} projects={projects} />
            </div>
          </div>
        </div>

        <div className="col-12 col-md-8 col-lg-9 col-xl-9">

          {/* snapshot div */}
          <div className="shadow rounded p-1 mt-2">

            <div className="d-flex justify-content-between align-items-baseline p-1">
              <label className="font-weight-light">Snapshot</label>
              {/* <AddNewDropDownButton small={true} includeFeature={true} /> */}
            </div>

            <div className="row m-0">
              <div className="col-6 col-lg-3 p-1">
                <CountCard type="project"
                  loading={loadingProjects}
                  count={projects.length} />
              </div>
              <div className="col-6 col-lg-3 p-1">
                <CountCard type="feature"
                  loading={loadingItems}
                  to="/search/feature"
                  count={countItemsByType('feature', items)} />
              </div>
              <div className="col-6 col-lg-3 p-1">
                <CountCard type="work"
                  loading={loadingItems}
                  to="/search/work"
                  count={countItemsByType('work', items)} />
              </div>
              <div className="col-6 col-lg-3 p-1">
                <CountCard type="bug"
                  loading={loadingItems}
                  to="/search/bug"
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
                <DonutChart title="Projects"
                  loading={loadingProjects}
                  type="project" data={countByStatus('project', projects)} position="right" />
              </div>
              <div className="col-12 col-lg-6 p-1">
                <DonutChart title="Features"
                  loading={loadingItems}
                  data={countByStatus("feature", items)} position="right" />
              </div>
              <div className="col-12 col-lg-6 p-1">
                <DonutChart title="Work items"
                  loading={loadingItems}
                  data={countByStatus("work", items)} position="right" />
              </div>
              <div className="col-12 col-lg-6 p-1">
                <DonutChart title="Bugs"
                  loading={loadingItems}
                  data={countByStatus("bug", items)} position="right" />
              </div>
            </div>

          </div>


        </div>
        {/* end of right side */}
      </div>
      {/* end of main row */}


      <DebugModeContext.Consumer>
        {({ debugMode }) => {
          if (debugMode) {
            return (
              <div className="col-4">
                <ConsoleLogButton name="projects" state={projects} />
                <ConsoleLogButton name="items" state={items} />
                <ConsoleLogButton name="loading projects" state={loadingProjects} />
                <ConsoleLogButton name="loading items" state={loadingItems} />
              </div>
            )
          }
        }}
      </DebugModeContext.Consumer>

    </div >
  )
};

export default Home;