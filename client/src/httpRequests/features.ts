import axios from 'axios';

const addNewFeature = (data: object) => {
  return axios.post('/api/feature', data);
};

export {
  addNewFeature
};