import { ALL_FLATS } from './flats';

const PREFIX = 'gasbill';

function storageKey(month) {
  return `${PREFIX}:${month}`;
}

/** Loads payment data for a given month. Returns a map of flatId -> boolean. */
export function loadMonth(month) {
  try {
    const raw = localStorage.getItem(storageKey(month));
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

/** Saves payment data for a given month. */
export function saveMonth(month, data) {
  try {
    localStorage.setItem(storageKey(month), JSON.stringify(data));
  } catch {
    // Fail silently if storage is full
  }
}

/**
 * Toggles paid status for a flat in a given month and persists it.
 * Returns the new data map.
 */
export function toggleFlat(month, flatId) {
  const data = loadMonth(month);
  data[flatId] = !data[flatId];
  saveMonth(month, data);
  return data;
}

/**
 * Returns all YYYY-MM keys that have been stored (across all months).
 */
export function listStoredMonths() {
  const months = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(`${PREFIX}:`)) {
      months.push(key.slice(PREFIX.length + 1));
    }
  }
  return months;
}

/**
 * Returns summary counts { paid, unpaid, total } for a given month's data.
 */
export function getSummary(data) {
  const paid = ALL_FLATS.filter((id) => data[id] === true).length;
  return { paid, unpaid: ALL_FLATS.length - paid, total: ALL_FLATS.length };
}
