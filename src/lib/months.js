/** Returns the current month string in YYYY-MM format. */
export function currentMonth() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
}

/** Formats a YYYY-MM string to a human-readable label like "April 2026". */
export function formatMonth(ym) {
  const [year, month] = ym.split('-');
  const date = new Date(Number(year), Number(month) - 1, 1);
  return date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
}

/** Returns true if the given YYYY-MM is strictly before the current month. */
export function isPastMonth(ym) {
  return ym < currentMonth();
}

/**
 * Generates an array of YYYY-MM strings from the earliest recorded month
 * up to (and including) the current month.
 */
export function buildMonthOptions(storedMonths) {
  const current = currentMonth();
  const all = new Set([...storedMonths, current]);
  return [...all].sort().reverse(); // newest first
}
