import axios from 'axios';
import { constants } from '../constants';

const apiAxios = axios.create({
  baseURL: constants.url,
  // headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
});
export default apiAxios;
