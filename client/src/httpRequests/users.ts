import axios from 'axios';

const getUsersByName = (userName: string) => {
  console.log(userName);
  const config = {
    params: { name: userName }
  };
  return axios.get('/api/user', config);
};

export {
  getUsersByName
};