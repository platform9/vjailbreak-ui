import DeleteIcon from "@mui/icons-material/Delete"
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material"

interface ResourceMap {
  source: string
  destination: string
}

interface ResourceMappingTableProps {
  sourceLabel: string
  destinationLabel: string
  mappings: ResourceMap[]
  onDeleteRow: (mapping: ResourceMap) => void
  tableWidth?: string
}

export default function ResourceMappingTable({
  sourceLabel,
  destinationLabel,
  mappings,
  onDeleteRow,
  tableWidth = "600px",
}: ResourceMappingTableProps) {
  return (
    <TableContainer component={Paper} sx={{ mt: 2, mb: 4, width: tableWidth }}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>{sourceLabel}</TableCell>
            <TableCell>{destinationLabel}</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mappings.map((mapping, index) => (
            <TableRow key={index}>
              <TableCell>{mapping.source}</TableCell>
              <TableCell>{mapping.destination}</TableCell>
              <TableCell align="right">
                <IconButton size="small" onClick={() => onDeleteRow(mapping)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
