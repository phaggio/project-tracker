import axios from 'axios';

const addNewProject = (data: object) => {
  return axios.post('/api/project/new', data)
};

const getAllProjects = () => {
  return axios.get('/api/project');
}

const getProjectByName = (projectName: string) => {
  console.log(projectName);
  const config = {
    params: { name: projectName }
  };
  return axios.get('/api/project/name', config);
};

const getProjectById = (projectId: string) => {
  console.log(`projectID: ${projectId}`);
  const config = {
    params: { _id: projectId }
  };
  return axios.get('/api/project/id', config);
}

export {
  getAllProjects,
  addNewProject,
  getProjectByName,
  getProjectById
}