import React from 'react';
import AddNewButton from '../../components/AddNewButton';

const buttons = [
  { name: 'Project', url: '/new/project' },
  { name: 'Feature', url: 'new/feature' },
  { name: 'Work Item', url: 'new/item' },
  { name: 'Bug', url: 'new/bug' }
]

const Overview = () => {

  return (
    <div className="container border border-primary rounded">
      this is overview page
      <div className="row">

        <div>
          Total number of projects
      </div>
        <div>
          Total number of features
      </div>

        <div>
          Total number of work-items
      </div>

        <div>
          Total number of bugs
      </div>


      </div>

      <AddNewButton buttons={buttons} />


    </div>
  )
}

export default Overview;