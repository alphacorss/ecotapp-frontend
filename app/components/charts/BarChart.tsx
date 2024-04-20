'use client';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Label,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { currentDate } from '@/lib/utils';

export default function BarComponent({ data }: { data: any[] }) {
  const currentMonth = currentDate().split(',')[1];
  const activeMonth = data.find((item) => currentMonth.includes(item.name));

  return (
    <div className="chart">
      <ResponsiveContainer width="100%" height="100%" className={'w-full h-full'}>
        <BarChart
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
          <CartesianGrid strokeDasharray="1" vertical={false} />
          <XAxis dataKey="name" tick={{ fontSize: 13 }} />
          <YAxis tick={{ fontSize: 13 }}>
            <Label
              style={{
                textAnchor: 'middle',
                fontSize: '100%',
                fontWeight: '500',
                fill: '#868686',
              }}
              angle={270}
              value={'(kWh)'}
              position="insideLeft"
            />
          </YAxis>
          <Tooltip labelFormatter={(e) => e} formatter={(value) => `${value}kWh`} />
          <Bar
            dataKey="amt"
            name="Energy Consumption"
            label="Amt"
            radius={[10, 10, 0, 0]}
            fill="#dedede"
            activeBar={<Rectangle fill="#DB17B2" stroke="#DB17B2" />}
          >
            {data.map((entry, index) => {
              return <Cell key={index} fill={entry === activeMonth ? '#DB17B2' : '#dedede'} />;
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
