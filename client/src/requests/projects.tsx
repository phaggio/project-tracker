import axios from 'axios';

export default {
  addNewProject: function (data: object) {
    return axios.post('/api/project', data)
  }
}