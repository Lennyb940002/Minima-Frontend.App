import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface SalesChartData {
  date: string;
  sales: number;
}

interface SalesChartProps {
  data: SalesChartData[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black/90 border border-white/10 p-2 rounded-lg shadow-lg">
        <p className="text-sm text-white">{`Mois: ${label}`}</p>
        <p className="text-sm text-yellow-500">
          {`Ventes: ${payload[0].value.toLocaleString('fr-FR', {
            style: 'currency',
            currency: 'EUR'
          })}`}
        </p>
      </div>
    );
  }
  return null;
};

export function SalesChart({ data }: SalesChartProps) {
  return (
    <div className="bg-black border border-white/10 rounded-xl p-6 h-[310px]">
      <h3 className="text-sm mb-4">Évolution des ventes</h3>
      {data.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-white">Ajoutez votre première vente :)</p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 10,
              left: 10,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis
              dataKey="date"
              stroke="#666"
              tick={{ fill: '#666' }}
              tickLine={{ stroke: '#666' }}
            />
            <YAxis
              stroke="#666"
              tick={{ fill: '#666' }}
              tickLine={{ stroke: '#666' }}
              tickFormatter={(value) =>
                value.toLocaleString('fr-FR', {
                  style: 'currency',
                  currency: 'EUR',
                  maximumFractionDigits: 0
                })
              }
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#EAB308"
              strokeWidth={2}
              dot={{
                fill: '#EAB308',
                strokeWidth: 2,
                r: 4,
                stroke: '#000'
              }}
              activeDot={{
                fill: '#EAB308',
                strokeWidth: 2,
                r: 6,
                stroke: '#000'
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default SalesChart;