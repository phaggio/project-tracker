import axios from 'axios';

const getAllWorkItems = () => {
  return axios.get('/api/workitem');
};

const addNewWorkItem = (data: object) => {
  return axios.post('/api/workitem/new', data);
};

export {
  getAllWorkItems,
  addNewWorkItem
};