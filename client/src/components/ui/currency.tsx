import { formatCurrency } from '@/lib/format';
import { cn } from '@/lib/utils';

interface IProps {
  className?: string;
  value: number;
}

export const Currency: FC<IProps> = ({ className, value }) => {
  return <span className={cn('currency', className)}>{formatCurrency(value)}</span>;
};
