import React, { useState, useEffect } from 'react';
import { ProjectType, ItemType } from '../../util/dataTypes';
import { projectRequest, itemRequest } from '../../httpRequests';
import ProjectList from '../../components/ProjectList';
import PieChart from '../../charts/StatusPieChart';

import ConsoleLogButton from '../../components/ConsoleLogButton';

const Home = () => {
  const [projects, updateProjects] = useState<ProjectType[]>([]);
  const [items, updateItems] = useState<ItemType[]>([]);

  // init Get calls to get all project and item data
  useEffect(() => {
    try {
      projectRequest
        .getAllProjects()
        .then(res => updateProjects(res.data))
      itemRequest.getAllWorkItems()
        .then(res => updateItems(res.data))
    } catch (err) {
      console.error(err)
    }
  }, [])

  const fakeData = [
    { name: 'Open', value: 70 },
    { name: 'Active', value: 50 },
    { name: 'Completed', value: 20 },
    { name: 'In-review', value: 30 }
  ]

  const getStatusByType = (itemType: string, data: (ItemType | ProjectType)[]) => {
    const result = data.forEach(item => {
      if (item.type === itemType) console.log(item)
    })
  }

  return (
    <div className="container border border-primary rounded">
      <div className="row">

        <div className="col-12 col-md-4 col-lg-3 col-xl-3 border border-success rounded">
          <ProjectList projects={projects} />
        </div>

        <div className="col-12 col-md-8 col-lg-9 col-xl-9 border border-secondary rounded">
          <h4>Snapshot</h4>

          {/* first row */}
          <div className="row">
            <div className="d-flex flex-wrap">
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
            <div className="col-12 col-xl-6 px-xl-1">
              <div className="d-flex justify-content-center rounded-lg shadow">
                <div className="d-flex flex-column justify-content-center align-items-center px-3">
                  <div className="display-3 text-warning">{items.filter(item => item.type === 'feature').length}</div>
                  <small className="">Features</small>
                </div>
                <PieChart dataArr={fakeData} color='#FFC107' />
              </div>
            </div>
            <div className="col-12 col-xl-6 px-xl-1">
              <div className="d-flex justify-content-center rounded-lg shadow">
                <div className="d-flex flex-column justify-content-center align-items-center px-3">
                  <div className="display-3 text-secondary">{items.filter(item => item.type === 'workItem').length}</div>
                  <small className="">Work</small>
                </div>
                <PieChart dataArr={fakeData} color='#6C757D' />
              </div>
            </div>
          </div>


          {/* third row */}
          <div className="row">
            <div className="col-12 col-md-12 col-lg-6">
              <div className="d-flex flex-column align-items-center shadow rounded-lg p-2">
                <div>
                  <label className="h3 text-warning mr-1">
                    {items.filter(item => item.type === 'feature').length}
                  </label>
                  <label className="font-weight-light">Features</label>
                  <hr className="m-0" />
                </div>
                <PieChart dataArr={fakeData} color='#FFC107' />
              </div>
            </div>

            <div className="col-12 col-md-12 col-lg-6">
              <div className="d-flex flex-column align-items-center shadow rounded-lg p-2">
                <div>
                  <label className="h3 text-secondary mr-1">
                    {items.filter(item => item.type === 'workItem').length}
                  </label>
                  <label className="font-weight-light">Work items</label>
                  <hr className="m-0" />
                </div>
                <PieChart dataArr={fakeData} color='#6C757D' />
              </div>
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
      </div>

    </div >
  )
};

export default Home;