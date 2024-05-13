import { useState } from 'react';
import { ArrowLeftToLine } from 'lucide-react';
import { useMediaQuery } from 'usehooks-ts';
import { Card, CardHeader } from '@/components/ui/card';
import { FilterTransfers } from '@/components/filters/filter-transfers';
import { SortTabs } from '@/components/filters/sort-tabs';
import { Spinner } from '@/components/ui/spinner';
import { TicketCard } from '@/components/features/ticket/ticket-card';
import { cn } from '@/lib/utils';
import { useListTicketsQuery } from '@/api/tickets';
import type { ITicketSort, TicketFilter } from '@/types/ticket';

// Styles
import s from './tickets-list.module.css';

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
            <div className="text-muted-foreground text-sm">
              Found tickets <strong>{tickets?.length}</strong>
            </div>
          </CardHeader>
        </Card>
      </aside>

      <div className="flex-auto">
        <SortTabs
          className="mb-4"
          onChange={(value) => {
            setSort(value as ITicketSort);
          }}
        />
        <section>
          {tickets?.map((ticket) => <TicketCard key={ticket.id} ticket={ticket} />)}
          <div>
            <button
              className="button button-primary w-full"
              onClick={() => {
                setLimit((prev) => prev + 5);
              }}
            >
              Load more
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
