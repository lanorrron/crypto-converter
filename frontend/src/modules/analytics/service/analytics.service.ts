import { BASE_URL } from '@/shared/constants/base-url';
import axios from 'axios';

async function getListPopularCoinsCoingecko() {
  const response = await axios.get(`${BASE_URL}/popular`);
  return response.data;
}
async function getListTopCoinsTokeninsight(limit?: number) {
  const response = await axios.get(`${BASE_URL}/top-coins`, {
    params: {
      limit,
    },
  });
  return response.data;
}

async function getListTopLosersCoins() {
  const response = await axios.get(`${BASE_URL}/top-losers`);
  return response.data;
}

export default {
  getListPopularCoinsCoingecko,
  getListTopCoinsTokeninsight,
  getListTopLosersCoins,
};
