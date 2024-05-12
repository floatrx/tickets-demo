import { FlightInfo } from '@/components/features/flight/flight-info';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { formatCurrency } from '@/lib/format';
import type { ITicket } from '@/types/ticket';

interface IProps {
  ticket: ITicket;
}

export const TicketCard: FC<IProps> = ({ ticket }) => {
  const { id, price, airline, flights } = ticket;
  return (
    <Card>
      <CardHeader>
        <span>ID: {id}</span>
        <span>
          Price: <span className="currency currency-xl">{formatCurrency(price)}</span>
        </span>
      </CardHeader>
      <CardContent>
        <div>
          <img className="h-[40px] object-cover" src={airline.logo} alt={airline.logo} />
          <div>Airline: {airline.name}</div>
        </div>
        <div className="space-y-2">
          {flights.map((flight) => (
            <FlightInfo key={flight.id} flight={flight} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
