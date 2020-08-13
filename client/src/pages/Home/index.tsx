import React from 'react';
// import buttons from '../../content/buttons';
// import AddNewButton from '../../components/AddNewButton';
// import ProjectButton from '../../components/ProjectButton';
import { Link } from 'react-router-dom';

const Home = () => {
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
          </div>
        </div>



        <div className="col-12 col-md-8 border border-secondary rounded">
          THIS IS main Home page content
        </div>
				
      </div>
    </div>
  )
};

export default Home;