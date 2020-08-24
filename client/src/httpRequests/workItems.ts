import axios from 'axios';

const addNewWorkItem = (data: object) => {
  return axios.post('/api/workitem/new', data);
};

const getAllWorkItems = () => {
  return axios.get('/api/workitem');
};

const getWorkItemsByParentId = (parentId: string) => {
  return axios.get(`/api/workitem/parentId/${parentId}`)
};



export {
  addNewWorkItem,
  getAllWorkItems,
  getWorkItemsByParentId
};