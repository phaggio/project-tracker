import axios from 'axios';

const addNewFeature = (data: object) => {
  return axios.post('/api/feature', data);
};

const getAllFeatures = () => {
  return axios.get('/api/feature');
};

const getFeatureById = (featureId: string) => {
  // return axios.get(`/api/feature/id`, config);
  return axios.get(`/api/feature/${featureId}`)
};

const getFeaturesByProjectId = (projectId: string) => {
  // const config = {
  //   params: { projectId: projectId }
  // };
  return axios.get(`/api/feature/ProjectId/${projectId}`);
}

const updateFeatureById = (featureId: string, data: object) => {
  console.log('from axios')
  console.log(data)
  return axios.put(`/api/feature/${featureId}`, data)
};

export {
  addNewFeature,
  getAllFeatures,
  getFeatureById,
  getFeaturesByProjectId,
  updateFeatureById
};