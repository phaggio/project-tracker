import axios from 'axios';

const addNewProject = (data: object) => {
  return axios.post('/api/project/new', data)
};

const getProjectByName = (projectName: string) => {
  console.log(projectName);
  const config = {
    params: { name: projectName }
  };
  return axios.get('/api/project', config);
};

export {
  addNewProject,
  getProjectByName
}