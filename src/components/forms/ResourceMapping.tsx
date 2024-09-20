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

interface ResourceMappingProps {
  label?: string
  sourceItems: string[]
  destinationItems: string[]
  sourceLabel: string // Label for the source dropdown
  destinationLabel: string // Label for the destination dropdown
  error?: string
}

interface Mapping {
  sourceItem: string
  destinationItem: string
}

export default function ResourceMapping({
  label,
  sourceItems,
  destinationItems,
  sourceLabel,
  destinationLabel,
  error,
}: ResourceMappingProps) {
  const [mappings, setMappings] = useState<Mapping[]>([])
  const [selectedSourceItem, setSelectedSourceItem] = useState("")
  const [selectedDestinationItem, setSelectedDestinationItem] = useState("")

  const handleAddMapping = () => {
    if (selectedSourceItem && selectedDestinationItem) {
      setMappings([
        ...mappings,
        {
          sourceItem: selectedSourceItem,
          destinationItem: selectedDestinationItem,
        },
      ])
      setSelectedSourceItem("")
      setSelectedDestinationItem("")
    }
  }

  const handleDeleteMapping = (mapping: Mapping) => {
    const updatedMappings = mappings.filter(
      ({ sourceItem, destinationItem }) =>
        mapping.sourceItem !== sourceItem ||
        mapping.destinationItem !== destinationItem
    )
    setMappings(updatedMappings)
  }

  // Filter out already mapped source and destination items
  const availableSourceItems = sourceItems.filter(
    (item) => !mappings.some((mapping) => mapping.sourceItem === item)
  )
  const availableDestinationItems = destinationItems.filter(
    (item) => !mappings.some((mapping) => mapping.destinationItem === item)
  )

  return (
    <div>
      {label && <Typography variant="body1">{label}</Typography>}
      {mappings.length > 0 && (
        <ResourceMappingTable
          sourceLabel={sourceLabel}
          destinationLabel={destinationLabel}
          mappings={mappings}
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
        <FormControl fullWidth size="small">
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
        <FormControl fullWidth size="small">
          <InputLabel id="destination-item-label">
            {destinationLabel}
          </InputLabel>
          <Select
            labelId="destination-item-label"
            value={selectedDestinationItem}
            onChange={(e) => setSelectedDestinationItem(e.target.value)}
            label={destinationLabel}
          >
            {availableDestinationItems.length > 0 ? (
              availableDestinationItems.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>
                No more {destinationLabel} options available
              </MenuItem>
            )}
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
