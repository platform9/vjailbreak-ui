import { Box, FormControl, FormHelperText, Paper, styled } from "@mui/material"
import {
  DataGrid,
  GridColDef,
  GridRowSelectionModel,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid"
import { VmData } from "src/data/migration-templates/model"
import Step from "../../components/forms/Step"

// Custom Toolbar with just the Quick Filter
const CustomToolbar = () => {
  return (
    <Box
      sx={{
        p: 1,
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <GridToolbarQuickFilter />
    </Box>
  )
}

const VmsSelectionStepContainer = styled("div")(({ theme }) => ({
  display: "grid",
  gridGap: theme.spacing(1),
}))

const FieldsContainer = styled("div")(({ theme }) => ({
  display: "grid",
  marginLeft: theme.spacing(6),
}))

const columns: GridColDef[] = [
  { field: "name", headerName: "VM Name", flex: 2 },
]

const paginationModel = { page: 0, pageSize: 5 }

interface VmsSelectionStepProps {
  vms: VmData[]
  onChange: (id: string) => (value: unknown) => void
  error: string
}

export default function VmsSelectionStep({
  vms,
  onChange,
  error,
}: VmsSelectionStepProps) {
  const handleVmSelection = (selectedRowIds: GridRowSelectionModel) => {
    const selectedVms = vms.filter((vm) => selectedRowIds.includes(vm.name))
    onChange("vms")(selectedVms)
  }

  return (
    <VmsSelectionStepContainer>
      <Step stepNumber="2" label="Select Virtual Machines to Migrate" />
      <FieldsContainer>
        <FormControl error={!!error} required>
          <Paper sx={{ width: "100%", height: 338 }}>
            <DataGrid
              rows={vms}
              columns={columns}
              initialState={{ pagination: { paginationModel } }}
              pageSizeOptions={[5, 10, 25]}
              localeText={{ noRowsLabel: "No VMs discovered" }}
              rowHeight={35}
              onRowSelectionModelChange={handleVmSelection}
              getRowId={(row) => row.name}
              slots={{ toolbar: CustomToolbar }}
              checkboxSelection
              disableColumnMenu
              disableColumnResize
            />
          </Paper>
        </FormControl>
        {error && <FormHelperText error>{error}</FormHelperText>}
      </FieldsContainer>
    </VmsSelectionStepContainer>
  )
}
