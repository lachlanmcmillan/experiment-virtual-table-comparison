import { Badge } from "@mantine/core"

export const aircraftTypeColors = {
  'Airbus A320': 'blue',
  'Boeing 737': 'green',
  'Embraer E190': 'red'
}

export const AircraftTypeBadge = ({ language }: { language: string }) => {
  return (
    <Badge color={aircraftTypeColors[language as keyof typeof aircraftTypeColors] || 'white'} style={{ overflow: 'visible', textWrap: 'nowrap', display: 'block' }}>{language}</Badge>
  )
}