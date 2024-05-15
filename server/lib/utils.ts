export const calculateDiffBetweenDates = (departure: string, arrival: string): number => {
  return new Date(arrival).getTime() - new Date(departure).getTime();
};

const getDurationMinutes = (durationMs: number): number => {
  return Math.floor(durationMs / 1000 / 60);
};

/**
 * Calculate the optimal index based on the total duration, total transfers, and price
 * - Each minute of duration is worth 1 point
 * - Each transfer is worth 2 points
 * - Each unit of price is worth 3 points
 * @param totalDuration
 * @param totalTransfers
 * @param price
 */
export const calculateOptimalIndex = (totalDuration: number, totalTransfers: number, price: number): number => {
  return Number((getDurationMinutes(totalDuration) + 2 * totalTransfers + 3 * price).toFixed());
};
