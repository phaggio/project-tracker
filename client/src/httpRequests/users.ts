import axios from 'axios';

const getUser = (_id: string | undefined = (undefined)) => {
  const config = {
    params: { _id: _id }
  };
  return axios.get('/api/user/', config);
};

const createNewUser = (data: object) => {
  console.log(data);
  return axios.post('/api/user/new', data);
};

export {
  getUser,
  createNewUser
};