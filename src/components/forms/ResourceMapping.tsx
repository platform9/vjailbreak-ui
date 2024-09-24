import AddIcon from "@mui/icons-material/Add"
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material"
import { useState } from "react"
import ResourceMappingTable from "./ResourceMappingTable"

export interface ResourceMap {
  source: string
  destination: string
}

interface ResourceMappingProps {
  label?: string
  sourceItems: string[]
  destinationItems: string[]
  sourceLabel: string // Label for the source dropdown
  destinationLabel: string // Label for the destination dropdown
  values: ResourceMap[]
  onChange: (mappings: ResourceMap[]) => void
  error?: string
}

export default function ResourceMapping({
  label,
  sourceItems,
  destinationItems,
  sourceLabel,
  destinationLabel,
  values = [],
  onChange,
  error,
}: ResourceMappingProps) {
  const [selectedSourceItem, setSelectedSourceItem] = useState("")
  const [selectedDestinationItem, setSelectedDestinationItem] = useState("")

  const handleAddMapping = () => {
    if (selectedSourceItem && selectedDestinationItem) {
      const updatedMappings = [
        ...values,
        {
          source: selectedSourceItem,
          destination: selectedDestinationItem,
        },
      ]

      onChange(updatedMappings)
      setSelectedSourceItem("")
      setSelectedDestinationItem("")
    }
  }

  const handleDeleteMapping = (mapping: ResourceMap) => {
    const updatedMappings = values.filter(
      ({ source, destination }) =>
        mapping.source !== source || mapping.destination !== destination
    )

    onChange(updatedMappings)
  }

  // Filter out already mapped source and destination items
  const availableSourceItems = sourceItems.filter(
    (item) => !values.some((mapping) => mapping.source === item)
  )
  const availableDestinationItems = destinationItems.filter(
    (item) => !values.some((mapping) => mapping.destination === item)
  )

  return (
    <div>
      {label && <Typography variant="body1">{label}</Typography>}
      {values.length > 0 && (
        <ResourceMappingTable
          sourceLabel={sourceLabel}
          destinationLabel={destinationLabel}
          mappings={values}
          onDeleteRow={handleDeleteMapping}
        />
      )}
      <Box
        sx={{
          display: "grid",
          mt: 2,
          mb: 2,
          gap: 2,
          gridTemplateColumns: "1fr 1fr max-content",
        }}
      >
        <FormControl
          fullWidth
          size="small"
          disabled={availableSourceItems.length === 0}
        >
          <InputLabel id="source-item-label">{sourceLabel}</InputLabel>
          <Select
            labelId="source-item-label"
            value={selectedSourceItem}
            onChange={(e) => setSelectedSourceItem(e.target.value)}
            label={sourceLabel}
          >
            {availableSourceItems.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl
          fullWidth
          size="small"
          disabled={availableDestinationItems.length === 0}
        >
          <InputLabel id="destination-item-label">
            {destinationLabel}
          </InputLabel>
          <Select
            labelId="destination-item-label"
            value={selectedDestinationItem}
            onChange={(e) => setSelectedDestinationItem(e.target.value)}
            label={destinationLabel}
          >
            {availableDestinationItems.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddMapping}
          disabled={!selectedSourceItem || !selectedDestinationItem}
          startIcon={<AddIcon />}
        >
          Add
        </Button>
      </Box>
      {!!error && <FormHelperText error>{error}</FormHelperText>}
    </div>
  )
}
