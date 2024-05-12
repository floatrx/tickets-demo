import { useListTicketsQuery } from '@/api/tickets';
import { TicketCard } from '@/components/features/ticket/ticket-card';
import { ToggleFilters } from '@/components/filters/ToggleFilters';

export const TicketsList = () => {
  const { data: tickets } = useListTicketsQuery();

  return (
    <div>
      <h2>Tickets List</h2>
      <ToggleFilters />
      {tickets?.map((ticket) => <TicketCard key={ticket.id} ticket={ticket} />)}
    </div>
  );
};
