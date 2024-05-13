export const formatCurrency = (value: number): string => {
  const formatter = new Intl.NumberFormat(navigator.language, {
    style: 'currency',
    currency: 'USD',
    currencyDisplay: 'narrowSymbol', // currency symbol in a compact form
    maximumFractionDigits: 0, // round the number to the nearest whole number
  });
  return formatter.format(value);
};

export const formatDuration = (durationInSeconds: number | undefined): string => {
  if (!durationInSeconds) return 'n\\a';

  // Hours, minutes and seconds
  const hh = ~~(durationInSeconds / 3600);
  const mm = ~~((durationInSeconds % 3600) / 60);
  const ss = ~~durationInSeconds % 60;

  let res = '';

  if (hh) res += `${hh}h `;
  if (mm) res += `${mm < 10 && hh ? '0' : ''}${mm}m `;
  if (ss) res += `${ss < 10 ? '0' : ''}${ss}s`;

  return res;
};
