'use client';
import { useEffect, useState } from 'react';
import { TopCoinsGainersAndLosers } from '../types/analytics.types';
import CardContainer from '@/components/CardContainer';
import serviceAnalytics from '@/modules/analytics/service/analytics.service';
import { ChartNoAxesCombined } from 'lucide-react';
import { Column, GenericTable } from '@/components/Table';
import { SkeletonCardCoins } from './SkeletonCoins';

export const TopGainersCoins = () => {
  const [listGainerCoins, setListGainerCoins] = useState<TopCoinsGainersAndLosers[] | []>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getListGainerCoins();
  }, []);

  async function getListGainerCoins() {
    setLoading(true);
    serviceAnalytics
      .getListTopCoinsTokeninsight()
      .then((response) => {
        setListGainerCoins(response);
      })
      .catch(() => {
        console.log('Error getting gainer coins');
      })
      .finally(() => {
        setLoading(false);
      });
  }
  const columns: Column<TopCoinsGainersAndLosers>[] = [
    {
      header: 'Token',
      key: 'name',
      width: 'w-[45%]',
      render: (_, row, index) => (
        <div className="flex items-center gap-2">
          <h2>{index + 1}</h2>
          <img src={row.logo} alt={`image ${row.name}`} className="w-7 h-7  rounded-full" />
          <div>
            <div className="font-medium">{row.name}</div>
            <div className="text-xs text-gray-400 uppercase">{row.symbol}</div>
          </div>
        </div>
      ),
    },
    {
      header: 'Precio',
      key: 'price',
      render: (_, row) => <span className="whitespace-nowrap">{'$ ' + row.price.toFixed(2)}</span>,
    },
    {
      header: '24H',
      key: 'price_change_24h',
      render: (_, row) => {
        const isPositive = row.price_change_24h * 100 > 0;
        const percentage = row.price_change_24h * 100;
        return (
          <div className="flex gap-0.5">
            <span className={`whitespace-nowrap ${isPositive ? 'text-cyan-300' : 'text-red-500'}`}>
              {isPositive ? `+ ${percentage.toFixed(2)} %` : `- ${Math.abs(percentage).toFixed(2)} % `}
            </span>
          </div>
        );
      },
    },
  ];

  return (
    <CardContainer>
      <div className="flex items-center gap-2 mb-4">
        <ChartNoAxesCombined className=" w-10 h-10 text-green-400 " />
        <h2 className="title-2">Ganadores</h2>
      </div>
      {loading ? <SkeletonCardCoins /> : <GenericTable data={listGainerCoins} columns={columns} />}
    </CardContainer>
  );
};
