import axios from 'axios';
import client from './client.js';
import mmkv from '../Components/mmkv.js';

const getPopular = () => {
    return client.get(`popular?language=en&page=1`);
  };
  const getUpcoming = () => {
    return client.get(`upcoming?language=en-US&page=1`);
  };
  const getTopRated = () => {
    return client.get(`top_rated?language=en-US&page=1`);
  };
  const getNowPlaying = () => {
    return client.get(`now_playing?language=en-US&page=1`);
  };
  const getMovieDetails = (id,lang) => {
    return client.get(`${id}?language=${lang}`);
  };
  const getCreditDetails = (id, lang) => {
    return client.get(`${id}/credits?language=${lang}`);
  };
const authService = {
    getPopular,
    getTopRated,
    getUpcoming,
    getNowPlaying,
    getMovieDetails,
    getCreditDetails
}


export default authService;