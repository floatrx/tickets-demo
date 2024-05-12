import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { dayjs } from '@/lib/dayjs';
import type { FlightDetailsExtended } from '@/types/flight';

interface IProps {
  flight: FlightDetailsExtended;
}

export const FlightInfo: FC<IProps> = ({ flight }) => {
  const { transfers, direction } = flight;
  const departureTime = dayjs(flight.departureTime);
  const arrivalTime = dayjs(flight.arrivalTime);
  const diff = arrivalTime.diff(departureTime);
  const duration = dayjs.duration(diff, 'minutes').format('H[h] m[m]');
  return (
    <Card>
      <CardHeader>
        <code>{flight.number}</code>
      </CardHeader>
      <CardContent>
        <div>Departure time: {dayjs(flight.departureTime).format('DD.MM.YYYY / HH:mm')}</div>
        <div>Arrival time: {dayjs(flight.arrivalTime).format('DD.MM.YYYY / HH:mm')}</div>
        <div>
          Duration: {dayjs.duration(flight.duration, 'minutes').format('H[h] m[m]')} / {duration}
        </div>
        <div>
          Direction: {direction.id} {direction.name}
        </div>
        <div>Transfers: {transfers.map(({ name }) => name).join(', ')}</div>
      </CardContent>
    </Card>
  );
};
