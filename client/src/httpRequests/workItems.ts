import axios from 'axios';

const addNewWorkItem = (data: object) => {
  return axios.post('/api/workitem/new', data);
};

const getAllWorkItems = () => {
  return axios.get('/api/workitem');
};

const getWorkItemById = (id: string) => {
  return axios.get(`/api/workitem/${id}`);
}

const getWorkItemsByParentId = (parentId: string) => {
  return axios.get(`/api/workitem/parentId/${parentId}`)
};

const updateWorkItemById = (workItemId: string, data: object) => {
  return axios.put(`/api/workitem/${workItemId}`, data)
};


export {
  addNewWorkItem,
  getAllWorkItems,
  getWorkItemById,
  getWorkItemsByParentId,
  updateWorkItemById
};