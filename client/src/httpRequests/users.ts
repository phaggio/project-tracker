import axios from 'axios';

const getUsersByName = (userName: string) => {
  console.log(userName);
  const config = {
    params: { name: userName }
  };
  return axios.get('/api/user', config);
};

const createNewUser = (data: object) => {
  console.log(data);
  return axios.post('/api/user/new', data);
};

export {
  createNewUser,
  getUsersByName
};