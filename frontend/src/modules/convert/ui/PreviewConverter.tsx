'use client';
import CardContainer from '@/components/CardContainer';
import { useEffect, useState } from 'react';
import serviceConverter from '../service/convert.service';
import { ListAllConvertPairs, SendQuoteResponse } from '../types/converter.type';
import Select, { Option } from '@/components/Select';
import Input from '@/components/Input';
import { ArrowRightLeft } from 'lucide-react';
import Button from '@/components/Button';
import toast from 'react-hot-toast';
import SkeletonConverter from './SkeletonConverter';

export const PreviewConverter = () => {
  const [listCoins, setListCoins] = useState<ListAllConvertPairs | null>(null);
  const [selectedFromAsset, setSelectedFromAsset] = useState('');
  const [selectedToAsset, setSelectedToAsset] = useState('');
  const [toAssetListCoins, setToAssetListCoins] = useState<Option[] | []>([]);
  const [amount, setAmount] = useState<number>(0);
  const [quote, setQuote] = useState<SendQuoteResponse | null>(null);
  const [loadingSendQuote, setLoadingSendQuote] = useState<boolean>(false);
  const [resultToAmount, setResultToAmount] = useState<string>('');

  useEffect(() => {
    getAllPairsToConvert();
  }, []);

  async function getAllPairsToConvert() {
    const response = await serviceConverter.getAllPairsToConvert();
    setListCoins(response);
  }

  const uniqueFromAssets = listCoins
    ? [
        ...new Set(
          Object.values(listCoins)
            .flat()
            .map((item) => item.fromAsset)
        ),
      ]
    : [];
  const fromAssetsListCoins = uniqueFromAssets.map((asset) => ({
    label: asset.toUpperCase(),
    value: asset,
  }));

  function handleChangeFromAssetSelect(value: string) {
    setSelectedFromAsset(value);
    setSelectedToAsset('');
    if (!listCoins) {
      toast.error('List coins is null', {
        duration: 3000,
        position: 'top-center',
      });
      return;
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

  async function sendQuoteRequest() {
    setLoadingSendQuote(true);
    try {
      const response = await serviceConverter.sendQuoteRequest({
        fromAsset: selectedFromAsset,
        toAsset: selectedToAsset,
        fromAmount: amount,
      });
      setQuote(response);
      setResultToAmount(response?.toAmount ?? '');
    } catch (err: any) {
      const message = err?.response?.data?.message ?? 'Error inesperado';
      toast.error(message, {
        duration: 3000,
        position: 'top-center',
      });
    } finally {
      setLoadingSendQuote(false);
    }
  }
  function handleChangeInverterCoins() {
    const temp = selectedFromAsset;
    setSelectedFromAsset(selectedToAsset);
    setSelectedToAsset(temp);
    setResultToAmount('');
  }

  useEffect(() => {
    if (listCoins && selectedFromAsset && selectedToAsset && amount > 0) {
      const timeout = setTimeout(() => {
        sendQuoteRequest();
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [selectedFromAsset, selectedToAsset, amount]);

  return (
    <div>
      {!listCoins ? (
        <SkeletonConverter />
      ) : (
        <CardContainer className="container mx-auto">
          <h2 className="title-1 mb-8 text-center">Cotizador de Criptomonedas</h2>
          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex-1 w-full">
                <Input type="number" onChange={(e) => setAmount(Number(e.target.value))} placeholder="Monto" />
              </div>
              <div className="flex-1 w-full ">
                <Select
                  key={1}
                  value={selectedFromAsset}
                  options={fromAssetsListCoins}
                  placeholder="De"
                  onOptionSelect={(option) => handleChangeFromAssetSelect(option.value)}
                />
              </div>
              <div>
                <ArrowRightLeft onClick={handleChangeInverterCoins} className="text-cyan-300 cursor-pointer" />
              </div>
              <div className="flex-1 w-full ">
                <Select
                  disabled={!selectedFromAsset}
                  options={toAssetListCoins}
                  value={selectedToAsset}
                  placeholder="A"
                  onOptionSelect={(option) => setSelectedToAsset(option.value)}
                />
              </div>
            </div>
            <div className="flex flex-col items-center justify-center mt-4">
              <h2 className="title-2 m-4">{loadingSendQuote ? 'Cargando...' : resultToAmount}</h2>
            </div>
          </div>
        </CardContainer>
      )}
    </div>
  );
};
