import axios from 'axios';

const addNewItem = (data: object) => {
  return axios.post('/api/item/new', data);
};

const getAllItems = () => {
  return axios.get('/api/item');
};

const getItemById = (itemId: string) => {
  return axios.get(`/api/item/id/${itemId}`);
};

const getItemsByParentId = (parentId: string) => {
  return axios.get(`/api/item/parentId/${parentId}`);
};

const getItemsByType = (type: string) => {
  return axios.get(`/api/item/type/${type}`);
};

const getItemsWithProjectIdByQuery = (query: object) => {
  return axios.get(`/api/item/query`, { params: query });
};

const updateItemById = (itemId: string, data: object) => {
  return axios.put(`/api/item/id/${itemId}`, data);
};

export {
  addNewItem,
  getAllItems,
  getItemById,
  getItemsByParentId,
  getItemsByType,
  getItemsWithProjectIdByQuery,
  updateItemById
};