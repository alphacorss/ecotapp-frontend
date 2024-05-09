'use client';
import { Area, AreaChart, Cell, Label, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export default function AreaComponent({
  data,
  type,
}: {
  data: {
    time: string;
    value: number;
  }[];
  type: 'monotone' | 'temperature';
}) {
  return (
    <div className="chart h-full min-h-[350px] -mb-5">
      <ResponsiveContainer width="100%" height="90%" className={'w-full h-full'}>
        <AreaChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 0,
            right: 14,
            left: 0,
            bottom: 12,
          }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#386FDC" stopOpacity={0.6} />
              <stop offset="95%" stopColor="#386FDC" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <XAxis dataKey="time" tickMargin={3} tick={{ fontSize: type === 'temperature' ? 11 : 13, fill: '#868686' }} />
          <YAxis tick={{ fontSize: 13, fill: '#868686' }}>
            <Label
              style={{
                textAnchor: 'middle',
                fontSize: '100%',
                fontWeight: '500',
                fill: '#868686',
              }}
              angle={270}
              value={'(kwh)'}
              position="insideLeft"
            />
          </YAxis>
          <Tooltip labelFormatter={(e) => e} formatter={(value) => `${value}kWh`} />
          <Area
            type={type as any}
            dataKey="value"
            name="Energy Consumption"
            label="Amt"
            stroke="#386FDC"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorUv)"
          >
            {data.map((_, i) => (
              <Cell key={i} />
            ))}
          </Area>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
