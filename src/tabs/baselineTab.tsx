import { MockData } from "../types/MockData";

export function BaselineTab({
  data,
  cols,
  paddingInline,
}: {
  data: MockData[];
  cols: any[];
  paddingInline: number;
}) {
  return (
    <div style={{ overflow: "auto", height: 800 }}>
      <table>
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
          {data.map((item, index) => (
            <Row
              item={item}
              key={item.id}
              index={index}
              cols={cols}
              paddingInline={paddingInline}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export const Row = ({
  item,
  index,
  cols,
  paddingInline,
}: {
  item: MockData;
  index: number;
  cols: any[];
  paddingInline: number;
}) => {
  return (
    <tr>
      <td style={{ width: 60, height: 27, textAlign: "right", paddingInline }}>
        {index}
      </td>
      {cols.map((col) => (
        <td
          key={col.label}
          style={{
            width: col.width,
            height: 27,
            textAlign: col.align as any,
            paddingInline,
          }}
        >
          {col.transform ? col.transform(item[col.key]) : item[col.key]}
        </td>
      ))}
    </tr>
  );
};
