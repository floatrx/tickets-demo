import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useCallback } from 'react';

// Styles
import s from './filter-transfers.module.css';

interface IProps {
  onChange?: (filters: number[]) => void;
}

// Available transfers filter options
const transfers = [
  { id: 0, label: 'Without transfers', value: '0' },
  { id: 1, label: '1 transfer', value: '1' },
  { id: 2, label: '2 transfers', value: '2' },
  { id: 3, label: '3 transfers', value: '3' },
];

/**
 * Filter by transfers. Supports multiple selection.
 * @param onChange
 * @constructor
 */
export const FilterTransfers: FC<IProps> = ({ onChange }) => {
  const handleFilters = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      // Get selected filters from checkboxes
      let filters = Array.from(e.currentTarget.elements).reduce((acc, el) => {
        if (el instanceof HTMLInputElement && el.checked) {
          acc.push(+el.value);
        }
        return acc;
      }, [] as number[]);

      // Case: Selected all filters -> skip
      if (filters.length === transfers.length) {
        filters = []; // reset filters
      }

      onChange?.(filters);
    },
    [onChange],
  );

  return (
    <form onChange={handleFilters}>
      {transfers.map(({ id, label, value }) => (
        <Label key={id} className={s.label}>
          <Checkbox value={value} className={s.checkbox} />
          {label}
        </Label>
      ))}
    </form>
  );
};
