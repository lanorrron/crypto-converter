export type CoinPairs = {
  fromAsset: string;
  fromAssetMaxAmount: number;
  fromAssetMinAmount: number;
  fromIsBase: boolean;
  toAsset: string;
  toAssetMaxAmount: number;
  toAssetMinAmount: number;
};

export type SendQuoteResponse = {
  [key: number]: CoinPairs[]; // Las claves son numéricas y los valores son arrays de CoinPairs
};
