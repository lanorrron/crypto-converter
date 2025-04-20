export type CoinPairs = {
  fromAsset: string;
  fromAssetMaxAmount: number;
  fromAssetMinAmount: number;
  fromIsBase: boolean;
  toAsset: string;
  toAssetMaxAmount: number;
  toAssetMinAmount: number;
};

export type ListAllConvertPairs = {
  [key: number]: CoinPairs[];
};

export type SendQuoteRequest = {
  fromAsset: string;
  toAsset: string;
  fromAmount: number;
};
export type SendQuoteResponse = {
  quoteId: string;
  ratio: string;
  inverseRatio: string;
  validTimestamp: number;
  toAmount: string;
  fromAmount: string;
};
