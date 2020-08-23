import React, { useState, useEffect } from 'react';
import ProjectList from '../../components/ProjectList';
import { projectRequest, featureRequest, workItemRequest } from '../../httpRequests';

type projectType = {
  _id: string;
  name: string;
  description: string;
  tags: string[];
}

const Home = () => {
  const [projects, updateProjects] = useState<projectType[]>([]);
  const [features, updateFeatures] = useState([]);
  const [workItems, updateWorkItems] = useState([]);

  useEffect(() => {
    try {
      projectRequest.getAllProjects()
        .then(res => {
          console.log(res.data);
          updateProjects(res.data)
        })
      featureRequest.getAllFeatures()
        .then(res => {
          console.log(res.data);
          updateFeatures(res.data);
        })
      workItemRequest.getAllWorkItems()
        .then(res => {
          console.log(res.data);
          updateWorkItems(res.data);
        })
    } catch (err) {
      console.log(err)
    }
  }, [])

  return (
    <div className="container border border-primary rounded">

      <div className="row">

        <div className="col-12 col-md-4 border border-success rounded text-truncate">
          {/* <div className="d-flex flex-column border border-success rounded"> */}
          <ProjectList projects={projects} />
          {/* </div> */}
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


      <button className="btn btn-danger btn-sm my-1" type="button" onClick={() => {
        console.log(projects)
      }}>
        console.log projects state
      </button>
      <br />
      <button className="btn btn-danger btn-sm my-1" type="button" onClick={() => {
        console.log(features)
      }}>
        console.log features state
      </button>
      <br />
      <button className="btn btn-danger btn-sm my-1" type="button" onClick={() => {
        console.log(workItems)
      }}>
        console.log workItems state
      </button>
    </div>
  )
};

export default Home;