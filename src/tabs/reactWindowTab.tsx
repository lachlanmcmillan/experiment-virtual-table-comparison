import React, { useRef, useState } from "react";
import { Box } from "@mantine/core";
import { FixedSizeList, FixedSizeListProps } from "react-window";
import { MockData } from "../types/MockData";

export function ReactWindowTab({
  data,
  cols,
  paddingInline,
}: {
  data: MockData[];
  cols: any[];
  paddingInline: number;
}) {
  return (
      <VirtualTable
        height={800}
        // width="100%"
        itemCount={data.length}
        itemSize={27}
        data={data}
        header={
          <thead>
            <tr>
              <th
                style={{
                  width: 60,
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
                    textAlign: col.align as any,
                    paddingInline,
                  }}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
        }
        cols={cols}
        paddingInline={paddingInline}
        // footer={
        //   <tfoot>
        //     <tr>
        //       <td>Footer 1</td>
        //       <td>Footer 2</td>
        //       <td>Footer 3</td>
        //       <td>Footer 4</td>
        //     </tr>
        //   </tfoot>
        // }
      />
  );
}

/** Context for cross component communication */
const VirtualTableContext = React.createContext<{
  top: number;
  setTop: (top: number) => void;
  header: React.ReactNode;
  footer: React.ReactNode;
}>({
  top: 0,
  setTop: (value: number) => {},
  header: <></>,
  footer: <></>,
});

/** The virtual table. It basically accepts all of the same params as the original FixedSizeList.*/
function VirtualTable({
  row,
  header,
  footer,
  data,
  cols,
  paddingInline,
  ...rest
}: {
  header?: React.ReactNode;
  footer?: React.ReactNode;
} & Omit<FixedSizeListProps, "children" | "innerElementType">) {
  const listRef = useRef<FixedSizeList | null>();
  const [top, setTop] = useState(0);

  return (
    <VirtualTableContext.Provider value={{ top, setTop, header, footer }}>
      <FixedSizeList
        {...rest}
        innerElementType={Inner}
        onItemsRendered={(props) => {
          const style =
            listRef.current &&
            // @ts-ignore private method access
            listRef.current._getItemStyle(props.overscanStartIndex);
          setTop((style && style.top) || 0);

          // Call the original callback
          rest.onItemsRendered && rest.onItemsRendered(props);
        }}
        ref={(el) => (listRef.current = el)}
        itemData={data}
      >
        {({ index, data }) => (
          <tr>
            {/** Make sure your table rows are the same height as what you passed into the list... */}
            <td
              style={{
                height: "27px",
                width: 60,
                minWidth: 60,
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
                  minWidth: col.width,
                  textAlign: col.align as any,
                  paddingInline,
                }}
              >
                {col.transform
                  ? col.transform(data[index][col.key])
                  : data[index][col.key]}
              </td>
            ))}
          </tr>
        )}
      </FixedSizeList>
    </VirtualTableContext.Provider>
  );
}

/**
 * The Inner component of the virtual list. This is the "Magic".
 * Capture what would have been the top elements position and apply it to the table.
 * Other than that, render an optional header and footer.
 **/
const Inner = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
  function Inner({ children, ...rest }, ref) {
    const { header, footer, top } = React.useContext(VirtualTableContext);
    const offset = top + 27;
    return (
      <div {...rest} ref={ref}>
        <table>
          {header}
          <tbody style={{ top: offset, position: "absolute" }}>{children}</tbody>
          {footer}
        </table>
      </div>
    );
  }
);
