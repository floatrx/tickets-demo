import { ArrowLeftToLine } from 'lucide-react';
import { useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import { useListTicketsQuery } from '@/api/tickets';
import { TicketCard } from '@/components/features/ticket/ticket-card';
import { FilterTransfers } from '@/components/filters/filter-transfers';
import { SortTabs } from '@/components/filters/sort-tabs';
import { Card, CardHeader } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';
import type { ITicketSort, TicketFilter } from '@/types/ticket';

// Styles
import s from './tickets-list.module.css';

/**
 * Main component to display tickets list with filters and sorting
 * @constructor
 */
export const TicketsList = () => {
  // Filters and sorting
  const [sort, setSort] = useState<ITicketSort>(null);
  const [filter, setFilter] = useState<TicketFilter>(null);
  const [transferCount, setTransferCount] = useState<number[] | null>(null);
  const [limit, setLimit] = useState(5);

  // Collapsible filters
  const [showFilters, setShowFilters] = useState(true);
  const isMobile = useMediaQuery('(min-width: 768px)');
  const collapseFilters = !isMobile && !showFilters; // Collapse filters on mobile -> reset on desktop
  const toggleFilters = () => setShowFilters((prev) => !prev);

  // Fetch tickets with filters and sorting rules
  const { data: searchResults } = useListTicketsQuery({ limit, sort, filter, transferCount });

  const handleFilterChange = (filters: number[]) => {
    setFilter(filters.length ? 'transfers' : null);
    setTransferCount(filters.length ? filters : null);
  };

  if (!searchResults)
    return (
      <div className={s.spinner}>
        <Spinner spinning size="xl" />
      </div>
    );

  const { data: tickets } = searchResults;

  return (
    <div className={cn(s.wrapper, { [s.collapsed]: collapseFilters })}>
      <aside className={s.aside}>
        <Card>
          <CardHeader>
            <div className={s.title}>
              Number of transfers
              <ArrowLeftToLine className={s.toggle} onClick={toggleFilters} />
            </div>
            <FilterTransfers onChange={handleFilterChange} />
            <div className={s.footer}>
              Found tickets <strong>{tickets?.length}</strong>
            </div>
          </CardHeader>
        </Card>
      </aside>

      <div className={s.main}>
        <SortTabs
          className={s.sort}
          onChange={(value) => {
            setSort(value as ITicketSort);
          }}
        />
        <div>
          {tickets?.map((ticket) => <TicketCard key={ticket.id} ticket={ticket} />)}
          <button className={cn(s.more, 'button button-primary')} onClick={() => setLimit((prev) => prev + 5)}>
            Load more
          </button>
        </div>
      </div>
    </div>
  );
};
