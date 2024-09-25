import { Paper } from "@mui/material"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import CustomSearchToolbar from "src/components/grid/CustomSearchToolbar"
import { Migration } from "src/data/migrations/model"

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    valueGetter: (_, row) => row.metadata?.name,
    flex: 3,
  },
  { field: "status", headerName: "Status", flex: 1 },
]

const paginationModel = { page: 0, pageSize: 25 }

interface DashboardProps {
  migrations: Migration[]
}

export default function Dashboard({ migrations }: DashboardProps) {
  return (
    <Paper sx={{ margin: 4 }}>
      <DataGrid
        rows={migrations}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[25, 50, 100]}
        localeText={{ noRowsLabel: "No Migrations Available" }}
        getRowId={(row) => row.metadata?.name}
        slots={{
          toolbar: CustomSearchToolbar,
        }}
      />
    </Paper>
  )
}
