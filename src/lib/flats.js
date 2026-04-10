/**
 * Generates the canonical list of 60 flat IDs.
 * Format: {block}{unit} where block is 0–9 and unit is 01–06.
 * Examples: "001", "006", "101", "906"
 */
export function generateFlats() {
  const flats = [];
  for (let block = 0; block <= 9; block++) {
    for (let unit = 1; unit <= 6; unit++) {
      flats.push(`${block}0${unit}`);
    }
  }
  return flats;
}

export const ALL_FLATS = generateFlats();
