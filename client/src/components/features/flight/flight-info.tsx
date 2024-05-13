import { Duration } from '@/components/ui/duration';
import { dayjs } from '@/lib/dayjs';
import type { FlightDetailsExtended } from '@/types/flight';

import s from './flight-info.module.css';

interface IProps {
  flight: FlightDetailsExtended;
}

export const FlightInfo: FC<IProps> = ({ flight }) => {
  const { transfers, from, to } = flight;
  const departureTime = dayjs(flight.departureTime).format('HH:mm');
  const arrivalTime = dayjs(flight.arrivalTime).format('HH:mm');

  return (
    <div className={s.wrapper}>
      <div className={s.column}>
        <span>
          {from.code} - {to.code}
        </span>
        <p>
          {departureTime} - {arrivalTime}
        </p>
      </div>
      <div className={s.column}>
        <span>Duration</span>
        <p>
          <Duration value={flight.duration} />
        </p>
      </div>
      <div className={s.column}>
        <span>
          {transfers.length || 'No'} Transfer{transfers.length > 1 ? 's' : ''}
        </span>
        <p>{transfers.map(({ code }) => code).join(', ')}</p>
      </div>
    </div>
  );
};
