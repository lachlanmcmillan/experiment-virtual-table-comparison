import { Title, Text, Tabs, Box, Button, Group, Select } from "@mantine/core";
import { ReactVirtuosoTab } from "./tabs/reactVirtuosoTab";
import { ReactWindowTab } from "./tabs/reactWindowTab";
import { TanstackVirtualTab } from "./tabs/tanstackVirtual";
import { BaselineTab } from "./tabs/baselineTab";
import data from "./MOCK_DATA.json";
import { useRef, useState } from "react";
import afterFrame from "afterframe";
import { AircraftTypeBadge } from "./components/AircraftTypeBadge";

function App() {
  const [renderKey, setRenderKey] = useState(0);
  const [currentTab, setCurrentTab] = useState<string>("baseline");
  const rowLimitRef = useRef<string>(rowLimitOptions[1].value);

  const rerender = () => {
    const measure = measureInteraction(
      `${currentTab} ${rowLimitRef.current} rows`
    );
    setRenderKey(renderKey + 1);

    afterFrame(() => {
      measure.end();
    });
  };

  const dataSlice = data.slice(0, parseInt(rowLimitRef.current));

  const tableProps = {
    data: dataSlice,
    cols,
    paddingInline: 5,
    height: 800,
    rowHeight: 27,
    key: renderKey,
  };

  return (
    <>
      <Box mt="lg" w="100%">
        <Title order={1} ta="center">
          Virtual Table Comparison
        </Title>
        <Text ta="center">
          This is a comparison of virtualization libraries.
        </Text>
        <Group mt="md" justify="center">
          <Select
            defaultValue={rowLimitRef.current}
            onChange={(value) =>
              (rowLimitRef.current = value || rowLimitOptions[0].value)
            }
            data={rowLimitOptions}
          />
          <Button onClick={rerender}>Rerender</Button>
        </Group>
        <Tabs
          mt="lg"
          keepMounted={false}
          value={currentTab}
          onChange={(value) => setCurrentTab(value || "baseline")}
        >
          <Tabs.List justify="center">
            <Tabs.Tab value="baseline">Baseline</Tabs.Tab>
            <Tabs.Tab value="react-window">React Window</Tabs.Tab>
            <Tabs.Tab value="react-virtuoso">React Virtuoso</Tabs.Tab>
            <Tabs.Tab value="tanstack-virtual">Tanstack Virtual</Tabs.Tab>
          </Tabs.List>
          <Box
            mt="lg"
            miw={cols.reduce((acc, col) => acc + (col.width || 0), 0)}
            style={{ overflow: "auto" }}
          >
            <Tabs.Panel value="baseline">
              <BaselineTab {...tableProps} />
            </Tabs.Panel>
            <Tabs.Panel value="react-virtuoso">
              <ReactVirtuosoTab {...tableProps} />
            </Tabs.Panel>
            <Tabs.Panel value="react-window">
              <ReactWindowTab {...tableProps} />
            </Tabs.Panel>
            <Tabs.Panel value="tanstack-virtual">
              <TanstackVirtualTab {...tableProps} />
            </Tabs.Panel>
          </Box>
        </Tabs>
      </Box>
    </>
  );
}

const rowLimitOptions = [1, 100, 1000, data.length].map((item) => ({
  value: item.toString(),
  label: item.toString(),
}));

function measureInteraction(interactionName: string) {
  performance.mark(interactionName + " start");

  return {
    end() {
      performance.mark(interactionName + " end");
      const measure = performance.measure(
        interactionName + " duration",
        interactionName + " start",
        interactionName + " end"
      );
      console.log(interactionName, Math.round(measure.duration), "ms");
    },
  };
}

const cols = [
  {
    label: "Flight No.",
    width: 100,
    key: "flight_number",
    align: "left",
  },
  {
    label: "Dep.",
    width: 55,
    key: "departure_airport_code",
    align: "left",
  },
  {
    label: "Arr.",
    width: 55,
    key: "arrival_airport_code",
    align: "left",
  },
  {
    label: "Dep. Time",
    width: 150,
    key: "departure_date_time",
    align: "left",
  },
  {
    label: "Arr. Time",
    width: 150,
    key: "arrival_date_time",
    align: "left",
  },
  {
    label: "Duration",
    width: 80,
    key: "flight_duration_minutes",
    align: "right",
  },
  {
    label: "Airline",
    width: 120,
    key: "airline_name",
    align: "left",
  },
  {
    label: "Aircraft",
    width: 150,
    key: "aircraft_type",
    align: "left",
    transform: (value: string) => <AircraftTypeBadge language={value} />,
  },
  {
    label: "Passengers",
    width: 120,
    key: "passenger_count",
    align: "right",
  },
  {
    label: "Pilot",
    width: 200,
    key: "pilot_name",
    align: "left",
  },
];

export default App;
