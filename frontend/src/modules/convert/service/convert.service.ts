import axios from 'axios';
import { SendQuoteRequest } from '../types/converter.type';
import { BASE_URL } from '@/shared/constants/base-url';

async function getAllPairsToConvert() {
  const response = await axios.get(`${BASE_URL}/list-all-covert-pairs`);
  const grouped = response.data.reduce((acc: any, item: any) => {
    const key = item.fromAsset?.trim();

    if (!key) return acc;

    if (!acc[key]) {
      acc[key] = [];
    }

    acc[key].push(item);
    return acc;
  }, {});
  return grouped;
}

async function sendQuoteRequest(request: SendQuoteRequest) {
  const response = await axios.post(`${BASE_URL}/send-quote-request`, null, {
    params: {
      fromAsset: request.fromAsset,
      toAsset: request.toAsset,
      fromAmount: request.fromAmount,
    },
  });

  return response.data;
}

export default {
  getAllPairsToConvert,
  sendQuoteRequest,
};
