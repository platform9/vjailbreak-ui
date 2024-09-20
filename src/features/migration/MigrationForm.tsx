import { Drawer, styled } from "@mui/material"
import useParams from "src/hooks/useParams"
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

interface FormValues extends Record<string, unknown> {
  dataCenter?: string
}

const defaultValues: FormValues = {
  // Testing values
  dataCenter: "PNAP BMC",
}

type Errors = { [formId: string]: string }

export default function MigrationFormDrawer({
  open,
  onClose,
}: MigrationFormDrawerProps) {
  const { params, getParamsUpdater } = useParams<FormValues>(defaultValues)
  const { params: errors, getParamsUpdater: getErrorsUpdater } =
    useParams<Errors>({})

  const handleSubmit = () => {}

  return (
    <StyledDrawer anchor="right" open={open} onClose={onClose}>
      <Header title="Migration Form" />
      <DrawerContent>
        <StyledForm onSubmit={handleSubmit}>
          {/* Step 1 */}
          <SourceAndDestinationEnvStep
            params={params}
            onChange={getParamsUpdater}
            errors={errors}
          />
          {/* Step 2 */}
          <VmsSelectionStep
            params={params}
            onChange={getParamsUpdater}
            errors={errors}
          />
          {/* Step 3 */}
          <NetworkAndStorageMappingStep
            params={params}
            onChange={getParamsUpdater}
            errors={errors}
          />
        </StyledForm>
      </DrawerContent>
      <Footer submitButtonLabel={"Start Migration"} onClose={onClose} />
    </StyledDrawer>
  )
}
