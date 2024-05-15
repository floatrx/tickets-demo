import { useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import { ArrowLeftToLine } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardHeader } from '@/components/ui/card';
import { FilterTransfers } from '@/components/filters/filter-transfers';
import { SortTabs } from '@/components/filters/sort-tabs';
import { Spinner } from '@/components/ui/spinner';
import { TicketCard } from '@/components/features/ticket/ticket-card';
import { useListTicketsQuery } from '@/api/tickets';
import type { TTicketFilter, TTicketSort, TTicketTransferCount } from '@/types/ticket';

// Styles
import s from './tickets-list.module.css';

/**
 * Main component to display tickets list with filters and sorting
 */
export const TicketsList = () => {
  // Filters and sorting
  const [sort, setSort] = useState<TTicketSort>(null);
  const [filter, setFilter] = useState<TTicketFilter>(null);
  const [transferCount, setTransferCount] = useState<TTicketTransferCount>(null);
  const [limit, setLimit] = useState<number | null>(null);

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

  const loadMoreTickets = () => setLimit((prev) => (prev ?? 5) + 5);

  if (!searchResults) {
    return (
      <div className={s.spinner}>
        <Spinner spinning size="xl" />
      </div>
    );
  }

  const { data: tickets, total, count } = searchResults;

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
              Found tickets <strong>{count !== total ? `${count}/${total}` : 'all'}</strong>
            </div>
          </CardHeader>
        </Card>
      </aside>

      <section className={s.main}>
        <SortTabs
          className={s.sort}
          onChange={(value) => {
            setSort(value as TTicketSort);
          }}
        />
        <div>{tickets?.map((ticket) => <TicketCard key={ticket.id} ticket={ticket} />)}</div>
        {count > tickets.length && (
          <footer className={s.footer}>
            <div className={s.count}>
              Shown {tickets.length} of {count} tickets
            </div>
            <button className={cn(s.more, 'button button-primary')} onClick={loadMoreTickets}>
              Load more
            </button>
          </footer>
        )}
      </section>
    </div>
  );
};
