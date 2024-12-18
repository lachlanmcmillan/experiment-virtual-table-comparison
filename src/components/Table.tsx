import { Box } from "@mantine/core";
import { MockData } from '../types/MockData';
import { AircraftTypeBadge } from './AircraftTypeBadge';


export const StandardTable = ({ children }: { children: React.ReactNode }) => (
  <Box mt="xl" h={800} style={{ overflow: "auto" }}>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Flight Number</th>
          <th>Departure Airport Code</th>
          <th>Arrival Airport Code</th>
          <th>Departure Date Time</th>
          <th>Arrival Date Time</th>
          <th>Flight Duration Minutes</th>
          <th>Airline Name</th>
          <th>Aircraft Type</th>
          <th>Passenger Count</th>
          <th>Pilot Name</th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  </Box>
);

export const Row = ({ item, index }: { item: MockData; index: number }) => {
  return (
    <tr>
      <td>{index}</td>
      <td>{item.flight_number}</td>
      <td>{item.departure_airport_code}</td>
      <td>{item.arrival_airport_code}</td>
      <td>{formatDate(item.departure_date_time)}</td>
      <td>{formatDate(item.arrival_date_time)}</td>
      <td>{item.flight_duration_minutes}</td>
      <td>{item.airline_name}</td>
      <td><AircraftTypeBadge language={item.aircraft_type} /></td>
      <td>{item.passenger_count}</td>
      <td>{item.pilot_name}</td>
    </tr>
  )
}

export const formatDate = (date: string) => {
  const [month, day, year, time] = date.split(/[/ ]/);

  const d = new Date(`${year}-${month}-${day}T${time}Z`);
  return d.toLocaleString('en-AU', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' });
}