import { dayjs } from '@/lib/dayjs';

export const Duration = ({ value, time = 'ms' }: { value: number; time?: 'ms' | 's' | 'h' }) => {
  return dayjs
    .duration(value, time)
    .format('D[d] H[h] m[m]')
    .replace(/\b0y\b/, '')
    .replace(/\b0m\b/, '')
    .replace(/\b0d\b/, '')
    .replace(/\b0h\b/, '');
};
