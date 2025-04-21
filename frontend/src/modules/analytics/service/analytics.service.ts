import { BASE_URL } from '@/shared/constants/base-url';
import axios from 'axios';

async function getListTicker24hrs() {
  const response = await axios.get(`${BASE_URL}/top-coins`);
  return response.data;
}

export default {
  getListTicker24hrs,
};
