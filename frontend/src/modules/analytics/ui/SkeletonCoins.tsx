// components/LosersTableSkeleton.tsx
import React from 'react';

export const SkeletonCardCoins = () => {
  return (
    <div className="space-y-4 animate-pulse">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="grid grid-cols-3 gap-4 items-center p-4 bg-slate-800/40 rounded-md"
        >
          <div className="flex items-center gap-2">
            <div className="w-4 text-sm text-gray-600">{i + 1}</div>
            <div className="w-8 h-8 bg-gray-700 rounded-full" />
            <div className="space-y-1">
              <div className="w-24 h-4 bg-gray-700 rounded" />
              <div className="w-12 h-3 bg-gray-600 rounded" />
            </div>
          </div>

          <div className="w-20 h-4 bg-gray-700 rounded" />

          <div className="w-24 h-4 bg-gray-700 rounded" />
        </div>
      ))}
    </div>
  );
};
