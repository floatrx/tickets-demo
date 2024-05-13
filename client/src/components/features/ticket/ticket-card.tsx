import { useState } from 'react';
import { FlightInfo } from '@/components/features/flight/flight-info';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Currency } from '@/components/ui/Currency';
import { Duration } from '@/components/ui/duration';

import type { ITicket } from '@/types/ticket';

// Styles
import s from './ticket-card.module.css';

interface IProps {
  ticket: ITicket;
}

export const TicketCard: FC<IProps> = ({ ticket }) => {
  const { price, airline, flights, totalDuration } = ticket;
  const [debug, setDebug] = useState(false);

  const toggleDebug = () => setDebug((prev) => !prev);

  return (
    <Card className={s.wrapper} onClick={toggleDebug}>
      <CardHeader>
        <div className={s.header}>
          <Currency className={s.price} value={price} />
          <div>
            <img className={s.logo} src={airline.logo} alt={airline.logo} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div>
          {flights.map((flight) => (
            <FlightInfo key={flight.id} flight={flight} />
          ))}
        </div>
      </CardContent>
      {debug && (
        <CardFooter>
          <div className={s.footer}>
            <div>
              Total duration:{' '}
              <strong>
                <Duration value={totalDuration} />
              </strong>
            </div>
            <div>
              Optimal idx: <strong>{ticket.optimalIdx}</strong>
            </div>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};
