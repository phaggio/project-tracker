import axios from 'axios';

const addNewItem = (data: object) => {
  return axios.post('/api/item/new', data);
};

const getAllItems = () => {
  return axios.get('/api/item');
};

const getItemById = (itemId: string) => {
  return axios.get(`/api/item/${itemId}`);
};

const getItemsByParentId = (parentId: string) => {
  return axios.get(`/api/item/parentId/${parentId}`);
};

const getItemsByType = (type: string) => {
  return axios.get(`/api/item/type/${type}`);
}

const updateItemById = (itemId: string, data: object) => {
  return axios.put(`/api/item/${itemId}`, data);
};

export {
  addNewItem,
  getAllItems,
  getItemById,
  getItemsByParentId,
  getItemsByType,
  updateItemById
};