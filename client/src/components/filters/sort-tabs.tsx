import { cn } from '@/lib/utils';
import type { ITicketSort } from '@/types/ticket';
import { useCallback, useState } from 'react';

// Styles
import s from './sort-tabs.module.css';

interface IProps {
  className?: string;
  onChange?: (value: ITicketSort) => void;
}

const variants: { label: string; value: ITicketSort }[] = [
  { label: 'Cheaper', value: 'price' },
  { label: 'Faster', value: 'duration' },
  { label: 'Optimal', value: 'optimal' },
];

export const SortTabs: FC<IProps> = ({ onChange, className }) => {
  const [value, setValue] = useState<ITicketSort>('price');

  const handleChange = useCallback(
    (value: ITicketSort) => {
      setValue(value);
      onChange?.(value);
    },
    [onChange],
  );

  return (
    <fieldset className={cn(s.fieldset, className)}>
      {variants.map((variant) => (
        <label
          key={variant.value}
          className={cn(s.option, {
            [s.active]: variant.value === value,
          })}
        >
          <input
            type="radio"
            name="variant"
            value={String(variant.value)}
            checked={variant.value === value}
            onChange={() => handleChange(variant.value)}
          />
          {variant.label}
        </label>
      ))}
    </fieldset>
  );
};
