import { useQuery } from '@tanstack/react-query';
import { getUnixTime } from 'date-fns';
import ExcelJS from 'exceljs';
import React from 'react';
import { toast } from 'sonner';

import { cleanChartDataMonthly, getStartEndDateByHourDiff } from '../helpers';
import Queries from '@/app/_context/Queries';
import usePathParams from '@/app/_hooks/usePathParams';
import { TAnalyticsConsumption, TFacility, TFacilityUser, TOrg, TRealTimeData, TReport } from '@/app/types';
import qry from '@/lib/queries';
import { capitalizeFirstLetter, getDateIndexes } from '@/lib/utils';

const { year, monthIndex, dayIndex } = getDateIndexes();

const useAnalytics = () => {
  const { viewType, energy_type, refreshTime, orgId, facilityId, tenantId } = usePathParams();

  //analytics query
  const { orgs, facilities, tenants } = React.useContext(Queries);
  const [showFilterModal, setShowFilterModal] = React.useState(false);

  const today = `${year}-${monthIndex}-${dayIndex}`;

  const q = `unit=${201}&date=${today}&energy_type=${energy_type}&organization=${orgId}&facility=${facilityId}&tenant=${tenantId}`;

  const analytics = useQuery({
    queryKey: ['analytics', energy_type, orgId, facilityId, tenantId],
    queryFn: () => qry.analyticsRq(q),
  });

  const isLoading = analytics.isLoading;
  const consumption: TAnalyticsConsumption = analytics.data?.data.data.stat;
  const total = consumption?.total_energy_consumed;

  const organization: TOrg | undefined = orgs.data?.data?.organization?.find((org: TOrg) => org._id === orgId);

  const facilitiesArry = facilities.data?.data?.facilities ?? facilities.data?.data?.data?.facilities;
  const facility: TFacility = facilitiesArry?.find((f: TFacility) => f._id === facilityId);

  const tenantsArry = tenants.data?.data?.users ?? tenants.data?.data?.data?.users;
  const tenant: TFacilityUser = tenantsArry?.find((t: TFacilityUser) => t._id === tenantId);

  //real time query
  const { start_date, end_date } = getStartEndDateByHourDiff(24);
  const realTimeq = `unit=${201}&date=${today}&energy_type=${energy_type}&start_date=${start_date}&end_date=${end_date}`;

  const realTime = useQuery({
    queryKey: ['realTime', energy_type, orgId, facilityId, tenantId, refreshTime],
    queryFn: () => qry.realTimeRq(realTimeq),
    refetchInterval: 10000 * (refreshTime === '1h' ? 3600000 : parseInt(refreshTime as string)),
    refetchOnMount: false,
    enabled: viewType === 'real-time',
  });

  const realTimeData: TRealTimeData = realTime.data?.data.data.stat;
  const realTimeIsLoading = realTime.isLoading;

  //reports
  const [reports, setReports] = React.useState<TReport[]>([]);

  const addToReport = (report: TReport) => {
    const { data } = report;
    const reportExists = reports.some((report) => JSON.stringify(report.data) === JSON.stringify(data));

    if (reportExists) {
      toast.error('Already added to report');
    } else {
      setReports([...reports, report]);
      toast.success('Added to report');
    }
  };

  const clearReport = () => {
    if (reports.length === 0) {
      toast.error('No report(s) to clear');
      return;
    }

    setReports([]);
    toast.success('Cleared report');
  };

  const downloadReport = async () => {
    const titleStyle = { bold: true, size: 12 };
    const valueStyle = { size: 12 };

    if (reports.length === 0) {
      toast.error('No report(s) to download');
      return;
    }

    toast.success('Downloading report');

    const workbook = new ExcelJS.Workbook();
    const time = getUnixTime(new Date());
    try {
      reports.map((report: TReport, index: number) => {
        const { data, title, energyType, orgName, facilityName, tenantName } = report;

        if (!data) return;

        const sheet = workbook.addWorksheet(
          tenantName ?? facilityName ?? orgName
            ? `${title}-${time}-${tenantName ?? facilityName ?? orgName}`
            : `${title}-${time}`,
        );

        sheet.mergeCells('A1:F1');
        sheet.getCell('A1').value = 'ECOTAPP ENERGY CONSUMPTION REPORT';
        sheet.getCell('A1').font = { bold: true, size: 14 };

        if (orgName) {
          sheet.getCell('A3').value = `Organization Name`;
          sheet.getCell('A3').font = titleStyle;
          sheet.getCell('B3').value = orgName;
          sheet.getCell('B3').font = valueStyle;
        }
        if (facilityName) {
          sheet.getCell('A4').value = `Facility Name`;
          sheet.getCell('A4').font = titleStyle;
          sheet.getCell('B4').value = facilityName;
          sheet.getCell('B4').font = valueStyle;
        }
        if (tenantName) {
          sheet.getCell('A5').value = `Tenant Name`;
          sheet.getCell('A5').font = titleStyle;
          sheet.getCell('B5').value = tenantName;
          sheet.getCell('B5').font = valueStyle;
        }

        if (title === 'analytics') {
          const analticsData = data as TAnalyticsConsumption;

          sheet.getCell('D3').value = 'Energy Type';
          sheet.getCell('D3').font = titleStyle;
          sheet.getCell('E3').value = capitalizeFirstLetter(energyType);
          sheet.getCell('E3').font = valueStyle;

          sheet.getCell('D4').value = 'Energy Use Intensity';
          sheet.getCell('D4').font = titleStyle;
          sheet.getCell('E4').value = `${analticsData.energy_use_intensity.value}kWh`;
          sheet.getCell('E4').font = valueStyle;

          sheet.getCell('D5').value = 'Energy Cont Intensity';
          sheet.getCell('D5').font = titleStyle;
          sheet.getCell('E5').value = `${analticsData.energy_cost_intensity.value}kWh`;
          sheet.getCell('E5').font = valueStyle;

          sheet.getCell('D6').value = 'Energy Efficiency';
          sheet.getCell('D6').font = titleStyle;
          sheet.getCell('E6').value = `${analticsData.energy_efficiency.value}%`;
          sheet.getCell('E6').font = valueStyle;

          sheet.getCell('G3').value = 'Total Energy Consumed';
          sheet.getCell('G3').font = titleStyle;
          sheet.getCell('H3').value = `${analticsData.total_energy_consumed}kWh`;
          sheet.getCell('H3').font = valueStyle;

          const monthlyData = cleanChartDataMonthly(analticsData?.array_of_energy);
          const rowNumber = 8;

          sheet.getCell(`A${rowNumber}`).value = 'Month';
          sheet.getCell(`A${rowNumber}`).font = titleStyle;
          sheet.getCell(`B${rowNumber}`).value = 'Energy Consumed';
          sheet.getCell(`B${rowNumber}`).font = titleStyle;

          monthlyData.forEach((data, index) => {
            sheet.getCell(`A${rowNumber + index + 1}`).value = data.time;
            sheet.getCell(`B${rowNumber + index + 1}`).value = `${data.value}kWh`;
          });
        } else {
          const realTimeData = data as TRealTimeData;

          sheet.getCell('D3').value = 'Energy Type';
          sheet.getCell('D3').font = titleStyle;
          sheet.getCell('E3').value = capitalizeFirstLetter(energyType);
          sheet.getCell('E3').font = valueStyle;

          sheet.getCell('G3').value = 'Total Energy Consumed';
          sheet.getCell('G3').font = titleStyle;
          sheet.getCell('H3').value = `${realTimeData.total_energy_consumed}kWh`;
          sheet.getCell('H3').font = valueStyle;

          const rowNumber = 6;
          const hourlyData = realTimeData.array_of_energy;

          sheet.getCell(`A${rowNumber}`).value = 'Hour';
          sheet.getCell(`A${rowNumber}`).font = titleStyle;
          sheet.getCell(`B${rowNumber}`).value = 'Energy Consumed';
          sheet.getCell(`B${rowNumber}`).font = titleStyle;

          hourlyData.forEach((data, index) => {
            sheet.getCell(`A${rowNumber + index + 1}`).value = `${index + 1}h`;
            sheet.getCell(`B${rowNumber + index + 1}`).value = `${data}kWh`;
          });
        }
      });

      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'report.xlsx';
      a.click();
      window.URL.revokeObjectURL(url);

      toast.success('Report downloaded successfully');
    } catch (error) {
      toast.error('Error downloading report');
    }
  };

  return {
    isLoading,
    realTimeIsLoading,
    consumption,
    realTimeData,
    total,
    organization,
    facility,
    tenant,
    viewType,
    energy_type,
    refreshTime,
    showFilterModal,
    setShowFilterModal,
    reports,
    addToReport,
    clearReport,
    downloadReport,
  };
};

export default useAnalytics;
