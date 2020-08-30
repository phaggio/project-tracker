import React, { useState, useEffect } from 'react';
import { ProjectType } from '../../util/dataTypes';
import ProjectList from '../../components/ProjectList';
import { projectRequest, itemRequest } from '../../httpRequests';
import ConsoleLogButton from '../../components/ConsoleLogButton';

type ItemType = {
  parentId: string | null;
  status: string;
  name: string;
  description: string;
  type: string;
  tags: string[];
  assigneeId: string | null;
}

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
              <div className="display-3 text-warning">Need feature count</div>
              <small className="ml-2">Features</small>
            </div>

            <div className="d-flex flex-row align-items-baseline border border-secondary rounded w-auto px-3 shadow">
              <div className="display-3 text-secondary">{`${items.length}`}</div>
              <small className="ml-2">Work items</small>
            </div>
          </div>
        </div>

      </div>


      {/* debug buttons */}
      <div className="col-3">
        <ConsoleLogButton name="projects" state={projects} />
        <ConsoleLogButton name="work items" state={items} />
      </div>

    </div>
  )
};

export default Home;