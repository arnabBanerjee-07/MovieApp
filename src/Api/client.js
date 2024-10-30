import axios from 'axios';
import mmkv from '../Components/mmkv';

const Token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMmNiMmJlNWU3YzcwYmZmMTdjYzU2ZDJmNGE1YjE5NiIsIm5iZiI6MTczMDA0ODkyMi42ODU1NjUsInN1YiI6IjY3MWJiN2RlNDU0MmUzNzFmZTBhODFlMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iVL20LpUUGsjIO1ELeuTwqQrbhK1f0Z0znmeZbAq4CU"
const client = axios.create({
  baseURL: 'https://api.themoviedb.org/3/movie/',
  headers: {
     accept: 'application/json',
    Authorization: `Bearer ${Token}`
  },
});

//client.defaults.headers.post['Content-Type'] = 'application/json';

export default client;

// // Set the AUTH token for any request
// client.interceptors.request.use(function (config) {
//   const token = mmkv.get('userToken');
//   console.log(' token ', token);
//   config.headers.Authorization = token ? `${token}` : '';
//   return config;
// });