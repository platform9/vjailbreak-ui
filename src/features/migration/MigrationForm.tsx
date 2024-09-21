import { Box, Drawer, styled } from "@mui/material"
import { useCallback, useEffect, useState } from "react"
import { createOpenstackCreds } from "src/data/openstack-creds/actions"
import { OpenstackCreds } from "src/data/openstack-creds/model"
import { createVmwareCreds } from "src/data/vmware-creds/actions"
import { VMwareCreds } from "src/data/vmware-creds/model"
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

interface MigrationFormDrawerProps {
  open: boolean
  onClose: () => void
}

interface FormValues extends Record<string, unknown> {
  vmwareCreds?: VMwareCreds
  openstackCreds?: OpenstackCreds
}

const defaultValues: Partial<FormValues> = {
  // Testing values
  // vmwareCreds: {
  //   datacenter: "PNAP BMC",
  // },
}

type Errors = { [formId: string]: string }

export default function MigrationFormDrawer({
  open,
  onClose,
}: MigrationFormDrawerProps) {
  const { params, getParamsUpdater } = useParams<FormValues>(defaultValues)
  const { params: errors, getParamsUpdater: getErrorsUpdater } =
    useParams<Errors>({})

  // Migration JSON Objects
  const [vmWareCredsObj, setVmWareCredsObj] = useState<VMwareCreds>(
    {} as VMwareCreds
  )
  const [openstackCredsObj, setOpenstackCredsObj] = useState<OpenstackCreds>(
    {} as OpenstackCreds
  )

  const vmWareCredsValidated =
    vmWareCredsObj?.status?.vmwareValidationMessage === "Success"
  const openstackCredsValidated =
    openstackCredsObj?.status?.openstackValidationMessage === "Success"

  const handleSubmit = () => {}

  const validateVmwareCreds = useCallback(
    async (params) => {
      console.log("validateVmwareCreds")
      getErrorsUpdater("vmwareCreds")("") // Clear previous errors
      const vmWareCredsObj = await createVmwareCreds(params)
      setVmWareCredsObj(vmWareCredsObj)
    },
    [getErrorsUpdater]
  )

  useEffect(() => {
    if (!vmWareCredsValidated && params.vmwareCreds) {
      validateVmwareCreds(params.vmwareCreds)
    }
  }, [params.vmwareCreds, vmWareCredsValidated])

  const validateOpenstackCreds = useCallback(
    async (params) => {
      getErrorsUpdater("openstackCreds")("") // Clear previous errors
      const openstackCredsObj = await createOpenstackCreds(params)
      setOpenstackCredsObj(openstackCredsObj)
    },
    [getErrorsUpdater]
  )

  useEffect(() => {
    if (!openstackCredsValidated && params.openstackCreds) {
      validateOpenstackCreds(params.openstackCreds)
    }
  }, [openstackCredsValidated, params.openstackCreds, validateOpenstackCreds])

  console.log("params", params)

  return (
    <StyledDrawer
      anchor="right"
      open={open}
      onClose={onClose}
      ModalProps={{ keepMounted: false }}
    >
      <Header title="Migration Form" />
      <DrawerContent>
        <Box
          component="form"
          autoComplete="off"
          onSubmit={handleSubmit}
          sx={{ display: "grid", gap: 4 }}
        >
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
        </Box>
      </DrawerContent>
      <Footer submitButtonLabel={"Start Migration"} onClose={onClose} />
    </StyledDrawer>
  )
}
