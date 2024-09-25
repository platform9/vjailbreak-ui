import { styled } from "@mui/material"
import { useEffect, useState } from "react"
import { Route, Routes, useNavigate } from "react-router-dom"
import "./App.css"
import "./assets/reset.css"
import AppBar from "./components/AppBar"
import { getMigrationsList } from "./data/migrations/actions"
import { Migration } from "./data/migrations/model"
import MigrationFormDrawer from "./features/migration/MigrationForm"
import Dashboard from "./pages/dashboard/Dashboard"
import Onboarding from "./pages/onboarding/Onboarding"

const AppFrame = styled("div")(({ theme }) => ({
  margin: "0 auto",
  width: "100%",
  height: "100%",
  [theme.breakpoints.up("lg")]: {
    maxWidth: "1600px",
  },
}))

function App() {
  const navigate = useNavigate()
  const [migrations, setMigrations] = useState<Migration[] | null>(null)
  const [openMigrationForm, setOpenMigrationForm] = useState(false)

  useEffect(() => {
    const getMigrations = async () => {
      const migrations = await getMigrationsList()
      setMigrations(migrations)
    }
    getMigrations()
  }, [])

  useEffect(() => {
    if (migrations === null) {
      return
    } else if (migrations.length === 0) {
      navigate("/onboarding")
    } else {
      navigate("/dashboard")
    }
  }, [migrations, navigate])

  return (
    <div>
      <AppBar setOpenMigrationForm={setOpenMigrationForm} />
      <AppFrame>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/onboarding" element={<Onboarding />} />
        </Routes>
        {openMigrationForm && (
          <MigrationFormDrawer
            open
            onClose={() => setOpenMigrationForm(false)}
          />
        )}
      </AppFrame>
    </div>
  )
}

export default App
