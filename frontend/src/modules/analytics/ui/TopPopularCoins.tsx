'use client';
import { useEffect, useState } from 'react';
import { PopularCoins } from '../types/analytics.types';
import CardContainer from '@/components/CardContainer';
import serviceAnalytics from '@/modules/analytics/service/analytics.service';
import { Coins } from 'lucide-react';
import { Column, GenericTable } from '@/components/Table';

export const TopPupularCoins = () => {
  const [listPopularCoins, setListPopularCoins] = useState<PopularCoins[] | []>(
    []
  );
  useEffect(() => {
    getListPopularCoins();
  }, []);

  async function getListPopularCoins() {
    serviceAnalytics
      .getListPopularCoinsCoingecko()
      .then((response) => {
        setListPopularCoins(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const columns: Column<PopularCoins>[] = [
    {
      header: 'Token',
      key: 'name',
      render: (_, row, index) => (
        <div className="flex items-center gap-2">
          <h2>{index + 1}</h2>
          <img
            src={row.image}
            alt={`image ${row.name}`}
            className="w-8 h-8 rounded-full"
          />
          <div>
            <div className="font-medium">{row.name}</div>
            <div className="text-xs text-gray-400 uppercase">{row.symbol}</div>
          </div>
        </div>
      ),
    },
    {
      header: 'Precio',
      key: 'current_price',
      render: (_, row) => <span>{row.current_price.toFixed(3)}</span>,
    },
    {
      header: '24H',
      key: 'ath_change_percentage',
      render: (_, row) => {
        const isPositive = row.price_change_percentage_24h > 0;
        return (
          <div className="flex gap-0.5">
            <span
              className={`whitespace-nowrap ${isPositive ? 'text-cyan-300' : 'text-red-500'}`}
            >
              {isPositive
                ? `+ ${row.price_change_percentage_24h.toFixed(3)} %`
                : `- ${Math.abs(row.price_change_percentage_24h).toFixed(3)} % `}
            </span>
          </div>
        );
      },
    },
  ];

  return (
    <CardContainer>
      <div className="flex items-center gap-2 mb-4">
        <Coins className=" w-10 h-10 text-cyan-400 " />
        <h2 className="title-2">Populares</h2>
      </div>
      <GenericTable data={listPopularCoins} columns={columns} />
    </CardContainer>
  );
};
