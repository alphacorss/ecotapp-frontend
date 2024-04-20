'use client';
import { CartesianGrid, Label, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const COLORS = ['#DF5E9C', '#FCB869', '#7CD1E4'];

const lines = [
  {
    COLORS: COLORS[0],
    name: 'Upper Range',
    dataKey: 'amt',
  },
  {
    COLORS: COLORS[1],
    name: 'Lower Range',
    dataKey: 'uv',
  },
  {
    COLORS: COLORS[2],
    name: 'Actual Consumption',
    dataKey: 'pv',
  },
];

export default function LineComponent({ data }: { data: any[] }) {
  return (
    <div className="chart h-[calc(100%-15px)] min-h-[350px] -mb-5">
      <ResponsiveContainer width="100%" height="98%" className="w-full h-full">
        <LineChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 0,
            right: 0,
            left: 12,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="0" stroke="rgba(107,114,128,0.2)" />
          <Legend
            verticalAlign="top"
            align="left"
            height={60}
            content={
              <div className="flex flex-wrap justify-start items-center gap-5">
                {lines.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div
                      style={{
                        width: '15px',
                        height: '15px',
                        backgroundColor: COLORS[index % COLORS.length],
                        borderRadius: '50%',
                      }}
                    ></div>
                    <p className="text-[14px] font-[500] text-gray-600">{item.name}</p>
                  </div>
                ))}
              </div>
            }
          />
          <XAxis stroke="" dataKey="name" tick={{ fontSize: 13, fill: '#868686' }} />
          <YAxis stroke="" tick={{ fontSize: 13, fill: '#868686' }}>
            <Label
              style={{
                textAnchor: 'middle',
                fontSize: '100%',
                fontWeight: '500',
                fill: '#868686',
              }}
              angle={270}
              value={'(kWh)'}
              position="left"
            />
          </YAxis>
          <Tooltip
            content={(data) => (
              <div className="bg-black/70 rounded-[var(--rounded)] text-white p-3 flex flex-col justify-center items-start gap-3">
                {lines.map((line, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div
                      style={{
                        width: '10px',
                        height: '10px',
                        backgroundColor: line.COLORS,
                        borderRadius: '50%',
                      }}
                    ></div>
                    <p className="text-sm font-[400] text-white">
                      {line.name}:{' '}
                      <span className="font-[500] text-base">
                        {data?.payload && data.payload[0]?.payload[line.dataKey]}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            )}
          />
          {lines.map((line, index) => (
            <Line
              key={index}
              dot={false}
              dataKey={line.dataKey}
              name={line.name}
              label={line.name}
              stroke={line.COLORS}
              strokeWidth={2}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
      <p className="text-center text-gray-500 text-sm font-[500] mb-5">(Time)</p>
    </div>
  );
}
