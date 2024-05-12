import { useListTicketsQuery } from '@/api/tickets';

export const App = () => {
  const { data } = useListTicketsQuery();
  return (
    <section>
      <h1>Tickets (test)</h1>
      <pre>
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>
    </section>
  );
};
