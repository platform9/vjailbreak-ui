import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline"
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline"
import { Box, CircularProgress, Paper, Typography } from "@mui/material"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import CustomSearchToolbar from "src/components/grid/CustomSearchToolbar"
import { Migration } from "src/data/migrations/model"

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    valueGetter: (_, row) => row.metadata?.name,
    flex: 2,
  },
  {
    field: "status",
    headerName: "Status",
    valueGetter: (_, row) => row.status?.phase,
    flex: 1,
    renderCell: (params) => {
      const phase = params.row?.status?.phase
      let icon

      if (phase === "Succeeded") {
        icon = <CheckCircleOutlineIcon style={{ color: "green" }} />
      } else if (phase === "Running") {
        icon = <CircularProgress size={20} style={{ marginRight: 3 }} />
      } else if (phase === "Failed") {
        icon = <ErrorOutlineIcon style={{ color: "red" }} />
      }

      return (
        <>
          {phase ? (
            <Box height={52} display={"flex"} alignItems={"center"}>
              {icon}
              <Typography variant="body2" style={{ marginLeft: 8 }}>
                {phase}
              </Typography>
            </Box>
          ) : null}
        </>
      )
    },
  },
]

const paginationModel = { page: 0, pageSize: 25 }

interface DashboardProps {
  migrations: Migration[]
}

export default function Dashboard({ migrations = [] }: DashboardProps) {
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
          toolbar: () => <CustomSearchToolbar title="Migrations" />,
        }}
      />
    </Paper>
  )
}
