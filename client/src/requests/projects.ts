import axios from 'axios';

const addNewProject = (data: object) => {
  return axios.post('/api/project', data)
}

export {
  addNewProject
}