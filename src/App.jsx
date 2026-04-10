import { useBillTracker } from './hooks/useBillTracker';
import { isPastMonth } from './lib/months';
import Header from './components/Header';
import MonthSelector from './components/MonthSelector';
import SummaryBar from './components/SummaryBar';
import FlatGrid from './components/FlatGrid';

export default function App() {
  const { selectedMonth, changeMonth, monthOptions, data, toggle, summary, flats } =
    useBillTracker();

  const readOnly = isPastMonth(selectedMonth);

  return (
    <div className="min-h-screen flex flex-col bg-gray-950">
      <Header />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8 space-y-6">
        {/* Controls row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <MonthSelector
            selected={selectedMonth}
            options={monthOptions}
            onChange={changeMonth}
          />
          <p className="text-xs text-gray-500">
            {readOnly
              ? 'Switch to current month to edit.'
              : 'Tap a flat to toggle its paid status.'}
          </p>
        </div>

        {/* Summary */}
        <SummaryBar summary={summary} />

        {/* Flat grid */}
        <FlatGrid
          flats={flats}
          data={data}
          readOnly={readOnly}
          onToggle={toggle}
          selectedMonth={selectedMonth}
        />
      </main>

      <footer className="text-center text-xs text-gray-600 py-4 border-t border-gray-800">
        Gas Bill Tracker — data stored locally in your browser
      </footer>
    </div>
  );
}
