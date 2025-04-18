'use client';
import CardContainer from '@/components/CardContainer';
import { useEffect, useState } from 'react';
import serviceConverter from '../service/convert.service';
import { SendQuoteResponse } from '../types/converter.type';
import Select, { Option } from '@/components/Select';
import Input from '@/components/Input';
import { ArrowRightLeft } from 'lucide-react';

export const PreviewConverter = () => {
  const [listCoins, setListCoins] = useState<SendQuoteResponse | null>(null);
  const [selectedFromAsset, setSelectedFromAsset] = useState('');
  const [selectedToAsset, setSelectedToAsset] = useState('');
  const [toAssetListCoins, setToAssetListCoins] = useState<Option[] | []>([]);
  const [amount, setAmount] = useState<number>(0);

  useEffect(() => {
    getAllPairsToConvert();
  }, []);

  async function getAllPairsToConvert() {
    const response = await serviceConverter.getAllPairsToConvert();
    setListCoins(response);
  }
  if (!listCoins) {
    return 'List coins is null';
  }

  const uniqueFromAssets = [
    ...new Set(
      Object.values(listCoins)
        .flat()
        .map((item) => item.fromAsset)
    ),
  ];
  const fromAssetsListCoins = uniqueFromAssets.map((asset) => ({
    label: asset.toUpperCase(),
    value: asset,
  }));

  const toAssetsPairsObject = Object.values(listCoins)
    .flat()
    .filter((item) => item.fromAsset === selectedFromAsset);

  function handleChangeFromAssetSelect(value: string) {
    setSelectedFromAsset(value);
    setSelectedToAsset('');
    if (!listCoins) {
      return 'List coins is null';
    }

    const filtered = Object.values(listCoins)
      .flat()
      .filter((item) => item.fromAsset === value)
      .map((asset) => ({
        label: asset.toAsset.toUpperCase(),
        value: asset.toAsset.toUpperCase(),
      }));

    setToAssetListCoins(filtered);
  }
  return (
    <CardContainer className="container mx-auto">
      <h2 className="title-1 mb-8 text-center">Cotizador de Criptomonedas</h2>
      <div className="max-w-2xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <Input
            type="number"
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="Amount"
          />
          <Select
            className="w-full md:w-auto "
            key={1}
            options={fromAssetsListCoins}
            placeholder="From asset"
            onOptionSelect={(option) =>
              handleChangeFromAssetSelect(option.value)
            }
          />
          <ArrowRightLeft className="text-cyan-300" />
          <Select
            className="w-full md:w-auto"
            options={toAssetListCoins}
            value={selectedToAsset}
            placeholder="To asset"
            onOptionSelect={(option) => setSelectedToAsset(option.value)}
          />
        </div>
      </div>
    </CardContainer>
  );
};
