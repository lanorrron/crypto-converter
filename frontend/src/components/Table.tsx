// components/GenericTable.tsx
import React from 'react';

export type Column<T> = {
  header: string;
  key: keyof T;
  render?: (value: T[keyof T], row: T, index: number) => React.ReactNode;
};

type GenericTableProps<T> = {
  data: T[];
  columns: Column<T>[];
};

export function GenericTable<T>({ data, columns }: GenericTableProps<T>) {
  return (
    <table className="w-full text-sm text-left">
      <thead>
        <tr className="text-cyan-300 border-b border-cyan-500/20">
          {columns.map((col, i) => (
            <th key={i} className="py-2 px-3 font-medium">
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, ri) => (
          <tr key={ri} className="hover:bg-slate-700/20 transition-colors">
            {columns.map((col, ci) => (
              <td key={ci} className="py-3 px-3">
                {col.render
                  ? col.render(row[col.key], row, ri)
                  : (row[col.key] as React.ReactNode)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
