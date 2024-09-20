import { Paper, styled } from "@mui/material"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import Step from "../../components/forms/Step"

const VmsSelectionStepContainer = styled("div")(({ theme }) => ({
  display: "grid",
  gridGap: theme.spacing(1),
}))

const FieldsContainer = styled("div")(({ theme }) => ({
  display: "grid",
  marginLeft: theme.spacing(6),
}))

const columns: GridColDef[] = [{ field: "name", headerName: "Name", flex: 2 }]

const rows = [
  { id: 1, lastName: "Snow", name: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", name: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", name: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", name: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", name: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", name: "jdgjjs", age: 150 },
  { id: 7, lastName: "Clifford", name: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", name: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", name: "Harvey", age: 65 },
]

const paginationModel = { page: 0, pageSize: 5 }

interface VmsSelectionStepProps {
  values: { [key: string]: unknown }
  onChange: (id: string) => (value: unknown) => void
  errors: { [key: string]: string }
}

export default function VmsSelectionStep({
  values,
  onChange,
  errors,
}: VmsSelectionStepProps) {
  return (
    <VmsSelectionStepContainer>
      <Step stepNumber="2" label="Select Virtual Machines to Migrate" />
      <FieldsContainer>
        <Paper sx={{ height: "287px", width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10, 25]}
            localeText={{ noRowsLabel: "No VMs discovered" }}
            rowHeight={35}
            checkboxSelection
            disableColumnMenu
            disableColumnResize
          />
        </Paper>
      </FieldsContainer>
    </VmsSelectionStepContainer>
  )
}
