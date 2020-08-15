import React, { useState, useEffect } from 'react';
import ProjectList from '../../components/ProjectList';
import { projectRequest } from '../../httpRequests';

const Home = () => {
  const [projects, updateProjects] = useState([]);

  useEffect(() => {
    projectRequest.getAllProjects()
      .then(res => {
        console.log(res.data);
        updateProjects(res.data)
      })
  }, [])

  return (
    <div className="container border border-primary rounded">

      <div className="row">

        <div className="col-12 col-md-4 border border-success rounded">
          <div className="d-flex flex-column border border-success rounded">
            <ProjectList projects={projects} />
          </div>
        </div>

        <div className="col-12 col-md-8 border border-secondary rounded">
          <p>
            THIS IS main Home page content.
            It should should total number of projects, number of features, work items, and bugs outstanding.
          </p>
        </div>

      </div>

      <button className="btn btn-danger btn-sm" type="button" onClick={() => {
        console.log(projects)
      }}>
        console.log projects state
      </button>
    </div>
  )
};

export default Home;