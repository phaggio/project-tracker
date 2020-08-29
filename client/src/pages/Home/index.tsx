import React, { useState, useEffect } from 'react';
import { ProjectType } from '../../util/dataTypes';
import ProjectList from '../../components/ProjectList';
import { projectRequest, featureRequest, workItemRequest } from '../../httpRequests';
import ConsoleLogButton from '../../components/ConsoleLogButton';

const Home = () => {
  const [projects, updateProjects] = useState<ProjectType[]>([]);
  const [features, updateFeatures] = useState([]);
  const [workItems, updateWorkItems] = useState([]);

  // init Get calls to get all available project/feature/workitem data
  useEffect(() => {
    try {
      projectRequest.getAllProjects()
        .then(res => {
          updateProjects(res.data)
        })
      featureRequest.getAllFeatures()
        .then(res => {
          updateFeatures(res.data);
        })
      workItemRequest.getAllWorkItems()
        .then(res => {
          updateWorkItems(res.data);
        })
    } catch (err) {
      console.log(err)
    }
  }, [])

  return (
    <div className="container border border-primary rounded">

      <div className="row">

        <div className="col-12 col-md-4 border border-success rounded">
          <ProjectList projects={projects} />
        </div>

        <div className="col-12 col-md-8 border border-secondary rounded">
          <h4>Snapshot</h4>
          <div className="d-flex justify-content-between">
            <div className="d-flex flex-row align-items-baseline border border-primary rounded w-auto px-3 shadow">
              <div className="display-3 text-primary">{`${projects.length}`}</div>
              <small className="ml-2">Projects</small>
            </div>
            <div className="d-flex flex-row align-items-baseline border border-info rounded-lg w-auto px-3 shadow">
              <div className="display-3 text-warning">{`${features.length}`}</div>
              <small className="ml-2">Features</small>
            </div>
            <div className="d-flex flex-row align-items-baseline border border-secondary rounded w-auto px-3 shadow">
              <div className="display-3 text-secondary">{`${workItems.length}`}</div>
              <small className="ml-2">Work items</small>
            </div>
          </div>
        </div>

      </div>


      {/* debug buttons */}
      <div className="col-3">
        <ConsoleLogButton name="projects" state={projects} />
        <ConsoleLogButton name="features" state={features} />
        <ConsoleLogButton name="work items" state={workItems} />
      </div>

    </div>
  )
};

export default Home;