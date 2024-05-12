export const formatCurrency = (value: number): string => {
  const formatter = new Intl.NumberFormat(navigator.language, {
    style: 'currency',
    currency: 'USD',
    currencyDisplay: 'narrowSymbol', // currency symbol in a compact form
    maximumFractionDigits: 0, // round the number to the nearest whole number
  });
  return formatter.format(value);
};
