import axios from 'axios';

const addNewFeature = (data: object) => {
  return axios.post('/api/feature', data);
};

const getUsersByName = (userName: string) => {
  console.log(userName);
  const config = {
    params: { name: userName}
  }
  return axios.get('/api/user', config);
}

export {
  addNewFeature,
  getUsersByName
};