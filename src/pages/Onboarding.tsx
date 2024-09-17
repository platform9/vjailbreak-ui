import AddIcon from "@mui/icons-material/Add"
import Button from "@mui/material/Button"

export default function Onboarding() {
  return (
    <div>
      <Button variant="contained" startIcon={<AddIcon />}>
        New Migration
      </Button>
    </div>
  )
}
