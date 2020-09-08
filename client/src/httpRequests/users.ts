import axios from 'axios';

const createNewUser = (data: object) => {
  return axios.post('/api/user/new', data)
};

const getAllUsers = () => {
  return axios.get('/api/user')
};

const getUserById = (id: string) => {
  return axios.get(`/api/user/${id}`)
};

// not being used.
const getUser = (_id: string | undefined = (undefined)) => {
  const config = {
    params: { _id: _id }
  };
  return axios.get('/api/user/', config)
};

export {
  createNewUser,
  getAllUsers,
  getUserById,
  getUser
};