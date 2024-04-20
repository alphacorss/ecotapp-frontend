'use client';
import { Area, AreaChart, Cell, Label, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { currentDate } from '@/lib/utils';

export default function AreaComponent({ data, type }: { data: any[]; type: 'monotone' | 'temperature' }) {
  const currentMonth = currentDate().split(',')[1];
  const activeMonth = data.find((item) => currentMonth.includes(item.name));

  return (
    <div className="chart h-[calc(100%)] min-h-[350px] -mb-5">
      <ResponsiveContainer width="100%" height="90%" className={'w-full h-full'}>
        <AreaChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#386FDC" stopOpacity={0.6} />
              <stop offset="95%" stopColor="#386FDC" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" tick={{ fontSize: 13, fill: '#868686' }} />
          <YAxis tick={{ fontSize: 13, fill: '#868686' }}>
            <Label
              style={{
                textAnchor: 'middle',
                fontSize: '100%',
                fontWeight: '500',
                fill: '#868686',
              }}
              angle={270}
              value={'kWh'}
              position="insideLeft"
            />
          </YAxis>
          <Tooltip labelFormatter={(e) => e} formatter={(value) => `${value}kWh`} />
          <Area
            type={type as any}
            dataKey="amt"
            name="Energy Consumption"
            label="Amt"
            stroke="#386FDC"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorUv)"
          >
            {data.map((entry, index) => {
              return <Cell key={index} fill={entry === activeMonth ? '#DB17B2' : '#dedede'} />;
            })}
          </Area>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
