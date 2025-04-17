'use client';
import Card from '@/components/Card';
import CardContainer from '@/components/CardContainer';
import { useEffect, useState } from 'react';
import serviceConverter from '../service/convert.service';
import { SendQuoteResponse } from '../types/converter.type';
import Select from '@/components/Select';
import Input from '@/components/Input';

export const PreviewConverter = () => {
  const [listCoins, setListCoins] = useState<SendQuoteResponse | null>(null);
  const [selectedFromAsset, setSelectedFromAsset] = useState('');
  const [selectedToAsset, setSelectedToAsset] = useState('');

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
        .flat() // aplanamos todos los arrays
        .map((item) => item.fromAsset) // sacamos solo los fromAsset
    ),
  ];
  const fromAssetsListCoins = uniqueFromAssets.map((asset) => ({
    label: asset.toUpperCase(),
    value: asset,
  }));

  const toAssetsPairsObject = Object.values(listCoins)
    .flat()
    .filter((item) => item.fromAsset === selectedFromAsset);

  const toAssetListCoins = toAssetsPairsObject.map((asset) => ({
    label: asset.toAsset.toUpperCase(),
    value: asset.toAsset.toUpperCase(),
  }));

  function handleChangeSelect(value: string) {
    const previousValue = selectedFromAsset;
    setSelectedFromAsset(value);
    if (previousValue != value) {
      setSelectedToAsset('');
    }
  }

  return (
    <CardContainer>
      <h2 className="title-1 mb-8 text-center">Cotizador de Criptomonedas</h2>
      <div>
        <div className="p-4 flex flex-row justify-center gap-8">
          <Input
            onChange={(e) => console.log(e.target.value)}
            placeholder="Monto"
          />
          <div>
            <Select
              options={fromAssetsListCoins}
              placeholder="Elegir"
              onOptionSelect={(option) => handleChangeSelect(option.value)}
            />
            <Select
              options={toAssetListCoins}
              placeholder="Elegir"
              onOptionSelect={(option) => handleChangeSelect(option.value)}
            />
          </div>
        </div>
      </div>
    </CardContainer>
  );
};
