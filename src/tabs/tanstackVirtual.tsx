import { Box } from "@mantine/core";
import { useVirtualizer } from "@tanstack/react-virtual";
import React from "react";
import { MockData } from "../types/MockData";
import { formatDate } from "../components/Table";
import { AircraftTypeBadge } from "../components/AircraftTypeBadge";

export function TanstackVirtualTab({ data }: { data: MockData[] }) {
  const parentRef = React.useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 36,
    overscan: 20,
  });

  return (
    <>
      <div
        ref={parentRef}
        className="container"
        style={{ height: 800, overflow: "auto" }}
      >
        <table>
          <thead></thead>
          <tbody>
            {virtualizer.getVirtualItems().map((virtualRow, index) => {
              const item = data[virtualRow.index];
              return (
                <tr
                  key={item.id}
                  style={{
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${
                      virtualRow.start - index * virtualRow.size
                    }px)`,
                  }}
                >
                  <td>{index}</td>
                  <td>{item.flight_number}</td>
                  <td>{item.departure_airport_code}</td>
                  <td>{item.arrival_airport_code}</td>
                  <td>{formatDate(item.departure_date_time)}</td>
                  <td>{formatDate(item.arrival_date_time)}</td>
                  <td>{item.flight_duration_minutes}</td>
                  <td>{item.airline_name}</td>
                  <td>
                    <AircraftTypeBadge language={item.aircraft_type} />
                  </td>
                  <td>{item.passenger_count}</td>
                  <td>{item.pilot_name}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
