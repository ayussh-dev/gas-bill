import { formatMonth, isPastMonth, currentMonth } from '../lib/months';

export default function MonthSelector({ selected, options, onChange }) {
  const isReadOnly = isPastMonth(selected);
  const current = currentMonth();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
      <div className="flex items-center gap-2">
        <label htmlFor="month-select" className="text-sm font-medium text-gray-400">
          Month
        </label>
        <div className="relative">
          <select
            id="month-select"
            value={selected}
            onChange={(e) => onChange(e.target.value)}
            className="appearance-none bg-gray-800 border border-gray-700 text-gray-100 text-sm rounded-xl py-2 pl-4 pr-9 focus:outline-none focus:ring-2 focus:ring-amber-500 transition cursor-pointer"
          >
            {options.map((m) => (
              <option key={m} value={m}>
                {formatMonth(m)} {m === current ? '(current)' : ''}
              </option>
            ))}
          </select>
          {/* chevron */}
          <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </div>
      </div>

      {isReadOnly && (
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 bg-amber-400/10 border border-amber-400/30 rounded-full px-3 py-1">
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          Read-only — past month
        </span>
      )}
    </div>
  );
}
