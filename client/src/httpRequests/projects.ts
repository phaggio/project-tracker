import axios from 'axios';

const addNewProject = (data: object) => {
  return axios.post('/api/project/new', data)
};

const getAllProjects = () => {
  return axios.get('/api/project');
};

const getProjectById = (id: string) => {
  return axios.get(`/api/project/${id}`);
};

const updateProject = (id: string, data: object) => {
  return axios.put(`/api/project/${id}`, data)
}

export {
  getAllProjects,
  addNewProject,
  getProjectById,
  updateProject
}