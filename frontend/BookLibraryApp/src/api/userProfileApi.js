import axios from 'axios';

export default axios.create({
  // baseURL: 'http://d247857d0d4b.ngrok.io/api/v1',
  baseURL: 'https://library-server-1.herokuapp.com/api/v1/user',
});
