import React, { useState, useEffect } from 'react';
// import buttons from '../../content/buttons';
// import AddNewButton from '../../components/AddNewButton';
// import ProjectButton from '../../components/ProjectButton';
import ProjectList from '../../components/ProjectList';
import {projectRequest} from '../../httpRequests'
import { Link } from 'react-router-dom';

// const projectsInDB = projectRequest.getProjectByName(``);



const Home = () => {
  const [projects, updateProjects] = useState([]);

  useEffect(() => {
    projectRequest.getProjectByName(``)
      .then(res => {
        console.log(res.data);
        updateProjects(res.data)
      })
  }, [])

  return (
    <div className="container border border-primary rounded">
      this is Home page it is one big container
      
      <div className="row">

        <div className="col-12 col-md-4 border border-success rounded">
          <div className="row d-flex justify-content-end m-auto">
            <Link className="btn btn-success btn-sm" 
              to="/new/project" 
              aria-label="new-project"
            >
              New project
            </Link>
          </div>
          
          <div className="d-flex flex-column border border-success rounded">
						Here's a list of projects available
						<a href="/">project 1 name and stuff</a>
						<a href="/">project 2 name and stuff</a>
						<a href="/">project 3 name and stuff</a>
						<a href="/">project 4 name and stuff</a>
						<a href="/">project 5 name and stuff</a>
            <ProjectList projects={projects} />
          </div>
        </div>



        <div className="col-12 col-md-8 border border-secondary rounded">
          THIS IS main Home page content
        </div>
				
      </div>

      <button type="button" onClick={() => console.log(projects)}>console log projects in DB</button>
    </div>
  )
};

export default Home;