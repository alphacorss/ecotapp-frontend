'use client';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

import { TCurrentMonthEnergyBreakdown } from '@/app/types';

const COLORS = ['#94169F', '#FFB200', '#65DC1C', '#42A1E5 ', '#FF00FF', '#23d4d4', '#FFed00'];

export function PieComponent({ data }: { data: TCurrentMonthEnergyBreakdown }) {
  const arrayData = () => {
    return [
      // { name: 'Water', amt: data.water },
      { name: 'Electricity', amt: data.electricity },
      // { name: 'Gas', amt: data.gas },
      // { name: 'Heat', amt: data.heat },
    ];
  };
  return (
    <div className="chart">
      <ResponsiveContainer width="100%" height="90%" className={'w-full h-full'}>
        <PieChart>
          <Pie
            data={arrayData()}
            cx="50%"
            cy="50%"
            label={({ cx, cy, midAngle, innerRadius, outerRadius, index }) => {
              const RADIAN = Math.PI / 180;
              const radius = 25 + innerRadius + (outerRadius - innerRadius);
              const x = cx + radius * Math.cos(-midAngle * RADIAN);
              const y = cy + radius * Math.sin(-midAngle * RADIAN);

              return (
                <text
                  x={x}
                  y={y}
                  fill="#868686"
                  fontSize={13}
                  textAnchor={x > cx ? 'start' : 'end'}
                  dominantBaseline="central"
                >
                  {arrayData()[index].name === 'Water' ? `${arrayData()[index].amt}oZ` : `${arrayData()[index].amt}kWh`}
                </text>
              );
            }}
            outerRadius={100}
            innerRadius={0}
            fill="#8884d8"
            dataKey="amt"
          >
            {arrayData().map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            content={
              <div className="flex flex-wrap justify-center items-center gap-2">
                {arrayData().map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div
                      style={{
                        width: '10px',
                        height: '10px',
                        backgroundColor: COLORS[index % COLORS.length],
                        borderRadius: '50%',
                      }}
                    ></div>
                    <p className="text-[13px] text-gray-500">{item.name}</p>
                  </div>
                ))}
              </div>
            }
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
