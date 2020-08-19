import axios from 'axios';

const getAllFeatures = () => {
  return axios.get('/api/feature');
};

const addNewFeature = (data: object) => {
  return axios.post('/api/feature', data);
};

export {
  getAllFeatures,
  addNewFeature
};