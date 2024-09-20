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

export interface ResourceMapping {
  sourceItem: string
  destinationItem: string
}

interface ResourceMappingTableProps {
  sourceLabel: string
  destinationLabel: string
  mappings: ResourceMapping[]
  onDeleteRow: (mapping: ResourceMapping) => void
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
              <TableCell>{mapping.sourceItem}</TableCell>
              <TableCell>{mapping.destinationItem}</TableCell>
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
