import { useQuery } from '@tanstack/react-query';
import React, { memo } from 'react';

import BarComponent from '../../../../_components/charts/BarChart';
import { SelectComponent } from '../../../../_components/utils/SelectComponent';
import { HomeMainLoader } from '@/app/_components/utils/Loader';
import { chartSelectOptions } from '@/app/_constants/data';
import useLocalStorage from '@/app/_hooks/useLocalStorage';
import qry from '@/lib/queries';
import { getDateIndexes } from '@/lib/utils';

const HomePageTenant = () => {
  const { year, monthIndex, dayIndex } = getDateIndexes();

  const [selected, setSelected] = useLocalStorage(`@homeChart`, `${year}-${monthIndex}-${dayIndex}`);

  const handleSelect = (value: string) => {
    setSelected(value);
  };

  const homeChart = useQuery({
    queryKey: ['homeChart', selected],
    queryFn: () => qry.homeChartsRq('201'),
    retry: 0,
    refetchOnMount: false,
  });

  if (homeChart.isLoading) return <HomeMainLoader />;
  if (homeChart.isError) return <div className="error-page flex-1">Something went wrong loading the charts</div>;

  const chart = homeChart?.data?.data?.data?.stat;
  // const types = cleanTypes(chart.current_month_energy_breakdown);

  const currentMonth = chart.current_month_energy;

  const percentageIncrease =
    Math.round(chart.percentage_increase_from_last_month) > 100
      ? 100
      : Math.round(chart.percentage_increase_from_last_month) < 0
        ? 0
        : Math.round(chart.percentage_increase_from_last_month);

  const nextMonth = chart.next_month_energy_forcast;

  const maxPercentage = 99.9;
  const width = percentageIncrease > maxPercentage ? maxPercentage : percentageIncrease + 5;

  return (
    <div className="flex flex-col gap-5 min-h-full">
      <div className="flex gap-5 flex-col lg:flex-row">
        <div className="card flex flex-col w-full h-full">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-lg font-[700] text-gray-600 pb-1">Total Energy Consumption</h3>
            <div>
              <SelectComponent
                size="small"
                className="h-[100px] w-fit"
                title="Filter"
                defaultValue={selected}
                array={chartSelectOptions}
                handleSelect={handleSelect}
              />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="text-primary-200 font-[700] text-2xl">{currentMonth} kWh</h2>

            <div className="w-full bg-[#EBEBEB] rounded-[7px] dark:bg-gray-700">
              <div
                className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-1 leading-none rounded-[7px] rounded-tr-none rounded-br-none relative"
                style={{ width: `${width}%` }}
              >
                <div className={`absolute -top-[5px] left-[100%] w-[4px] h-[30px] bg-blue-600`}></div>
                {percentageIncrease}%
              </div>
            </div>
            <div className="flex lg:justify-between lg:items-center lg:flex-row lg:gap-0 gap-2  flex-col">
              <p className="text-gray-500 font-[500] text-xs">
                Next Month Prediction: <span className="text-primary-500 font-[600]">{nextMonth}kWh</span>
              </p>
              <p className="text-gray-500 font-[500] text-xs">
                Max. Threshold: <span className="text-primary-500 font-[600]">2,700kWh</span>
              </p>
            </div>
          </div>
          {/* <div className="flex flex-col justify-between items-start border border-gray-300 p-3 rounded-[var(--rounded)] flex-1">
            <h3 className="text-lg font-[700] text-gray-600 pb-1 mb-3">Consumption by Energy Type</h3>
            <div className="flex justify-between flex-wrap gap-4 lg:gap-0 items-center w-full">
              {types.map((type, index) => (
                <div className="flex flex-col items-start gap-1" key={index}>
                  <p className="text-gray-400 font-[500] text-[13px]">{type.name}</p>
                  <p className="text-gray-700 font-[600]">{type.value}kWh</p>
                </div>
              ))}
            </div>
          </div> */}
        </div>
      </div>
      <div className="card w-full flex-1">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-lg font-[600] text-gray-600">Consumption History</h1>
        </div>
        {/* <div className="flex gap-3 mb-10 lg:mb-6 justify-start items-start lg:justify-end lg:items-center flex-col lg:flex-row">
          <DropdownMenuComponent
            trigger={
              <Button className="px-2" variant="outlineGrayHover">
                Energy Type <ChevronDown size={20} />
              </Button>
            }
          />
          <DropdownMenuComponent
            trigger={
              <Button className="px-2" variant="outlineGrayHover">
                <Filter size={20} /> Filter
              </Button>
            }
          />
        </div> */}

        <div className="flex gap-10 justify-between items-center flex-col md:flex-row">
          <BarComponent data={chart.array_of_energy} />
        </div>
      </div>
    </div>
  );
};

export default memo(HomePageTenant);
