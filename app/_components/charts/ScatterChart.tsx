'use client';
import {
  CartesianGrid,
  ComposedChart,
  Label,
  Legend,
  Line,
  ResponsiveContainer,
  Scatter,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const COLORS = ['#12B76A', '#386FDC'];

const lines = [
  {
    COLORS: COLORS[0],
    name: 'Regression Line',
    dataKey: 'amt',
  },
  {
    COLORS: COLORS[1],
    name: 'Data Regression',
    dataKey: 'uv',
  },
];

export default function ScatterComponent({ data }: { data: any[] }) {
  return (
    <div className="chart h-[calc(100%-15px)] min-h-[350px] -mb-5">
      <ResponsiveContainer width="100%" height="98%" className={'w-full h-full'}>
        <ComposedChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: -50,
            right: 0,
            left: 10,
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
          <XAxis stroke="" dataKey="name" tick={{ fontSize: 13, fill: '#868686' }}>
            <Label
              style={{
                textAnchor: 'middle',
                fontSize: '100%',
                fontWeight: '500',
                fill: '#868686',
              }}
              value={'Months'}
              position="bottom"
            />
          </XAxis>
          <YAxis stroke="" tick={{ fontSize: 13, fill: '#868686' }}>
            <Label
              style={{
                textAnchor: 'middle',
                fontSize: '100%',
                fontWeight: '500',
                fill: '#868686',
              }}
              angle={270}
              value={'(Energy consumption (m3/day))'}
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
          <Scatter name="A school" dataKey="pv" fill={COLORS[1]} />
          <Line dot={false} dataKey="uv" name="Upper Range" stroke={COLORS[0]} strokeWidth={2} />
        </ComposedChart>
      </ResponsiveContainer>
      <p className="text-center text-gray-500 text-sm font-[500] mb-5">(Formula: Y = a + bX + E)</p>
    </div>
  );
}
