import { useVirtualizer } from "@tanstack/react-virtual";
import React from "react";
import { MockData } from "../types/MockData";

export function TanstackVirtualTab({
  data,
  cols,
  paddingInline,
}: {
  data: MockData[];
  cols: any[];
  paddingInline: number;
}) {
  const parentRef = React.useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 27,
    overscan: 20,
  });

  return (
    <>
      <div
        ref={parentRef}
        className="container"
        style={{ height: 800, overflow: "auto", overscrollBehaviorY: "none" }}
      >
        <table
          style={{
            tableLayout: "fixed",
            height: virtualizer.getTotalSize(),
            // width: "100%",
            position: "relative",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr
              style={{
                backgroundColor: "white",
                top: 0,
                position: "sticky",
                zIndex: 2,
              }}
            >
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
          </thead>
          <tbody>
            {virtualizer.getVirtualItems().map((virtualRow) => {
              const item = data[virtualRow.index];
              return (
                <tr
                  key={item.id}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: virtualRow.size,
                    transform: `translateY(${virtualRow.start + 27}px)`,
                  }}
                >
                  <td
                    style={{
                      textAlign: "right",
                      width: 60,
                      minWidth: 60,
                      paddingInline,
                    }}
                  >
                    {virtualRow.index}
                  </td>
                  {cols.map((col) => (
                    <td
                      key={col.key}
                      style={{
                        width: col.width,
                        minWidth: col.width,
                        textAlign: col.align as any,
                        paddingInline,
                      }}
                    >
                      {col.transform
                        ? col.transform(item[col.key])
                        : item[col.key]}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
