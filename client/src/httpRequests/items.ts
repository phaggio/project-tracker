import axios from 'axios';

const addNewWorkItem = (data: object) => {
  return axios.post('/api/item/new', data);
};

const getAllWorkItems = () => {
  return axios.get('/api/item');
};

const getWorkItemById = (itemId: string) => {
  return axios.get(`/api/item/${itemId}`);
};

const getWorkItemsByParentId = (parentId: string) => {
  return axios.get(`/api/item/parentId/${parentId}`);
};

const getItemsByType = (type: string) => {
  return axios.get(`/api/item/type/${type}`);
}

const updateWorkItemById = (itemId: string, data: object) => {
  return axios.put(`/api/item/${itemId}`, data);
};



export {
  addNewWorkItem,
  getAllWorkItems,
  getWorkItemById,
  getWorkItemsByParentId,
  getItemsByType,
  updateWorkItemById
};