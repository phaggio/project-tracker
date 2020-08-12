import React from 'react';
import buttons from '../../content/buttons';
import AddNewButton from '../../components/AddNewButton';
import ProjectButton from '../../components/ProjectButton';
import { Link } from 'react-router-dom';

const Overview = () => {

  return (
    <div className="container border border-primary rounded">
      this is overview page
      
      <div className="row">
        <div className="col-12 col-md-4 border border-success">
        <AddNewButton buttons={buttons} />
          THIS IS A LIST OF PROJECTS
          <br />
          <br />
          <br />
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deserunt iusto saepe ea incidunt aliquam optio odit, modi ratione voluptatum repellendus non consequatur labore repudiandae esse eaque perferendis corporis facilis nemo?
          <ProjectButton name={'test'} subtitle={'test sub'} />


          <Link to="/boards">boards</Link>
        </div>
        <div className="col-12 col-md-8 border border-secondary">
          THIS IS OVERVIEW OF PROJECT STATUS
          <br />
          <br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Et totam a laudantium numquam voluptates. Vel odio facere cupiditate sapiente maxime asperiores velit aliquid exercitationem ea dolorum at, possimus culpa odit.
        </div>
      </div>


    </div>
  )
}

export default Overview;