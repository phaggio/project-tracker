import axios from 'axios';

const getAllFeatures = () => {
  return axios.get('/api/feature');
};

const getFeaturesByProjectId = (projectId: string) => {
  const config = {
    params: { projectId: projectId }
  };
  return axios.get('/api/feature/ByProjectId', config);
}

const addNewFeature = (data: object) => {
  return axios.post('/api/feature', data);
};

export {
  getAllFeatures,
  getFeaturesByProjectId,
  addNewFeature
};