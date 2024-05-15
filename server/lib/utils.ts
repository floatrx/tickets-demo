export const calculateDiffBetweenDates = (departure: string, arrival: string): number => {
  return new Date(arrival).getTime() - new Date(departure).getTime();
};

export const calculateOptimalIndex = (totalDuration: number, totalTransfers: number, price: number): number => {
  return Number((totalDuration / 1000000 + 2 * totalTransfers + 3 * price).toFixed());
};
