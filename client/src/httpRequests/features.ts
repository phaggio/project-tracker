import axios from 'axios';

const getAllFeatures = () => {
  return axios.get('/api/feature');
};

const getFeatureById = (featureId: string) => {
  const config = {
    params: { _id: featureId }
  }
  return axios.get('/api/feature/id', config);
}

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
  getFeatureById,
  getFeaturesByProjectId,
  addNewFeature
};