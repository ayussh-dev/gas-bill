import { useState, useCallback, useEffect } from 'react';
import { currentMonth, buildMonthOptions } from '../lib/months';
import { loadMonth, toggleFlat, listStoredMonths, getSummary } from '../lib/storage';
import { ALL_FLATS } from '../lib/flats';

export function useBillTracker() {
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [data, setData] = useState(() => loadMonth(currentMonth()));
  const [monthOptions, setMonthOptions] = useState(() =>
    buildMonthOptions(listStoredMonths())
  );

  // Reload data whenever the selected month changes
  useEffect(() => {
    setData(loadMonth(selectedMonth));
  }, [selectedMonth]);

  const toggle = useCallback(
    (flatId) => {
      const newData = toggleFlat(selectedMonth, flatId);
      setData({ ...newData });
      // Refresh month options in case a new month was introduced
      setMonthOptions(buildMonthOptions(listStoredMonths()));
    },
    [selectedMonth]
  );

  const changeMonth = useCallback((month) => {
    setSelectedMonth(month);
    setMonthOptions(buildMonthOptions(listStoredMonths()));
  }, []);

  const summary = getSummary(data);

  return {
    selectedMonth,
    changeMonth,
    monthOptions,
    data,
    toggle,
    summary,
    flats: ALL_FLATS,
  };
}
