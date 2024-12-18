import { TableVirtuoso } from "react-virtuoso";
import { MockData } from "../types/MockData";
import { formatDate, Row } from "../components/Table";
import { Box } from "@mantine/core";
import { AircraftTypeBadge } from "../components/AircraftTypeBadge";

export function ReactVirtuosoTab({
  data,
  cols,
  paddingInline,
}: {
  data: MockData[];
  cols: any[];
  paddingInline: number;
}) {
  return (
    <TableVirtuoso
      style={{ height: 800, overscrollBehaviorY: 'none' }}
      data={data}
      fixedHeaderContent={() => (
        <tr style={{ backgroundColor: "white" }}>
          <th
            style={{
              width: 60,
              minWidth: 60,
              height: 27,
              textAlign: "right",
              paddingInline,
            }}
          >
            #
          </th>
          {cols.map((col) => (
            <th
              key={col.label}
              style={{
                width: col.width,
                minWidth: col.width,
                textAlign: col.align as any,
                paddingInline,
              }}
            >
              {col.label}
            </th>
          ))}
        </tr>
      )}
      // components={{
      //   TableHead: ({ style, ...props }) => (
      //     <thead>
      //       <tr>
      //         <th
      //           style={{
      //             width: 60,
      //             height: 27,
      //             textAlign: "right",
      //             paddingInline,
      //           }}
      //         >
      //           #
      //         </th>
      //         {cols.map((col) => (
      //           <th
      //             key={col.label}
      //             style={{
      //               width: col.width,
      //               textAlign: col.align as any,
      //               paddingInline,
      //             }}
      //           >
      //             {col.label}
      //           </th>
      //         ))}
      //       </tr>
      //     </thead>
      //   ),
      // }}
      itemContent={(index, data) => (
        <>
          <td
            style={{
              height: "27px",
              width: 60,
              textAlign: "right",
              paddingInline,
            }}
          >
            {index}
          </td>
          {cols.map((col) => (
            <td
              key={col.label}
              style={{
                height: "27px",
                width: col.width,
                textAlign: col.align as any,
                paddingInline,
              }}
            >
              {col.transform ? col.transform(data[col.key]) : data[col.key]}
            </td>
          ))}
        </>
      )}
    />
  );
}
