import { Drawer, styled } from "@mui/material"
import { useState } from "react"
import Footer from "../../components/forms/Footer"
import Header from "../../components/forms/Header"
import NetworkAndStorageMappingStep from "./NetworkAndStorageMappingStep"
import SourceAndDestinationEnvStep from "./SourceAndDestinationEnvStep"
import VmsSelectionStep from "./VmsSelectionStep"

const StyledDrawer = styled(Drawer)(() => ({
  "& .MuiDrawer-paper": {
    display: "grid",
    gridTemplateRows: "max-content 1fr max-content",
    width: "1034px",
  },
}))

const DrawerContent = styled("div")(({ theme }) => ({
  overflow: "auto",
  padding: theme.spacing(4, 6, 4, 4),
}))

const StyledForm = styled("form")(({ theme }) => ({
  display: "grid",
  gridGap: theme.spacing(4),
}))

interface MigrationFormDrawerProps {
  open: boolean
  onClose: () => void
}

export default function MigrationFormDrawer({
  open,
  onClose,
}: MigrationFormDrawerProps) {
  const [values, setValues] = useState<{ [key: string]: unknown }>({})
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const handleOnChange = (key: string) => (value: unknown) => {
    setValues({ ...values, [key]: value })
  }

  const handleSubmit = () => {}

  return (
    <StyledDrawer anchor="right" open={open} onClose={onClose}>
      <Header title="Migration Form" />
      <DrawerContent>
        <StyledForm onSubmit={handleSubmit}>
          {/* Step 1 */}
          <SourceAndDestinationEnvStep
            values={values}
            onChange={handleOnChange}
            errors={errors}
          />
          {/* Step 2 */}
          <VmsSelectionStep
            values={values}
            onChange={handleOnChange}
            errors={errors}
          />
          {/* Step 3 */}
          <NetworkAndStorageMappingStep
            values={values}
            onChange={handleOnChange}
            errors={errors}
          />
        </StyledForm>
      </DrawerContent>
      <Footer submitButtonLabel={"Start Migration"} onClose={onClose} />
    </StyledDrawer>
  )
}
