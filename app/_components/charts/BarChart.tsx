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

import { cleanNumber, getDateIndexes } from '@/lib/utils';

export default function BarComponent({ data }: { data: number[] }) {
  const { monthIndex } = getDateIndexes();

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const cleanData = data.map((item, index) => {
    const monthIndex = index % 12;
    return {
      name: months[monthIndex],
      amt: item,
    };
  });

  return (
    <div className="chart">
      <ResponsiveContainer width="100%" height="100%" className={'w-full h-full'}>
        <BarChart
          width={500}
          height={350}
          data={cleanData}
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
          <Tooltip
            labelFormatter={(e) => e}
            formatter={(value) => `${cleanNumber(value as number)}kWh`}
            cursor={false}
          />
          <Bar
            dataKey="amt"
            name="Energy Consumption"
            label="Amt"
            radius={[10, 10, 0, 0]}
            fill="gray"
            activeBar={<Rectangle fill="#DB17B2" stroke="#DB17B2" />}
          >
            {cleanData.map((_, index) => {
              return <Cell key={index} fill={index + 1 === parseInt(monthIndex) ? '#DB17B2' : '#dedede'} />;
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
