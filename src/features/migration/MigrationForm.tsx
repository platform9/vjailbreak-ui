import { Box, Drawer, styled } from "@mui/material"
import { useEffect, useState } from "react"
import { MigrationTemplate, VmData } from "src/data/migration-templates/model"
import {
  createOpenstackCreds,
  getOpenstackCreds,
} from "src/data/openstack-creds/actions"
import { OpenstackCreds } from "src/data/openstack-creds/model"
import {
  createVmwareCreds,
  getVmwareCreds,
} from "src/data/vmware-creds/actions"
import { VMwareCreds } from "src/data/vmware-creds/model"
import useParams from "src/hooks/useParams"
import { isNilOrEmpty } from "src/utils"
import Footer from "../../components/forms/Footer"
import Header from "../../components/forms/Header"
import { pollForStatus } from "../helpers"
import SourceAndDestinationEnvStep from "./SourceAndDestinationEnvStep"

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
  vms?: VmData[]
  networksMapping?: { source: string; destination: string }[]
  storageMapping?: { source: string; destination: string }[]
}

const defaultValues: Partial<FormValues> = {}

type Errors = { [formId: string]: string }

export default function MigrationFormDrawer({
  open,
  onClose,
}: MigrationFormDrawerProps) {
  const { params, getParamsUpdater } = useParams<FormValues>(defaultValues)
  const { params: errors, getParamsUpdater: getErrorsUpdater } =
    useParams<Errors>({})

  // Migration JSON Objects
  const [vmWareCredsResource, setVmwareCredsResource] = useState<VMwareCreds>(
    {} as VMwareCreds
  )
  const [openstackCredsResource, setOpenstackCredsResource] =
    useState<OpenstackCreds>({} as OpenstackCreds)
  const [migrationTemplateObj, setMigrationTemplateObj] =
    useState<MigrationTemplate>({} as MigrationTemplate)

  useEffect(() => {
    if (isNilOrEmpty(params.vmwareCreds)) return

    // Function to create the VMwareCreds object
    const createVmwareCredsResource = async () => {
      const response = await createVmwareCreds(params.vmwareCreds)
      setVmwareCredsResource(response)
    }

    // Reset the VMwareCreds object if the user changes the credentials
    setVmwareCredsResource({} as VMwareCreds)

    createVmwareCredsResource()
  }, [params.vmwareCreds])

  useEffect(() => {
    if (
      vmWareCredsResource?.metadata?.name === undefined ||
      vmWareCredsResource?.status !== undefined
    )
      return

    const stopPolling = pollForStatus({
      resource: vmWareCredsResource,
      getResourceFunc: getVmwareCreds,
      setResource: setVmwareCredsResource,
      stopPollingCond: (creds) =>
        creds?.status?.vmwareValidationStatus !== undefined,
      errorChecker: (creds) => creds?.status?.vmwareValidationMessage || null,
      onSuccess: () => console.log("VMware creds validated successfully"),
      onError: (error) => getErrorsUpdater("vmwareCreds")(error),
      pollingInterval: 5000,
    })

    return () => stopPolling && stopPolling()
  }, [
    getErrorsUpdater,
    vmWareCredsResource,
    vmWareCredsResource?.metadata?.name,
    vmWareCredsResource?.status,
  ])

  useEffect(() => {
    if (isNilOrEmpty(params.openstackCreds)) return

    // Function to create the VMwareCreds object
    const createOpenstackCredsResource = async () => {
      const response = await createOpenstackCreds(params.openstackCreds)
      setOpenstackCredsResource(response)
    }

    // Reset the VMwareCreds object if the user changes the credentials
    setOpenstackCredsResource({} as OpenstackCreds)

    createOpenstackCredsResource()
  }, [params.openstackCreds])

  useEffect(() => {
    if (
      openstackCredsResource?.metadata?.name === undefined ||
      openstackCredsResource?.status !== undefined
    )
      return

    const stopPolling = pollForStatus({
      resource: openstackCredsResource,
      getResourceFunc: getOpenstackCreds,
      setResource: setOpenstackCredsResource,
      stopPollingCond: (creds) =>
        creds?.status?.openstackValidationStatus !== undefined,
      errorChecker: (creds) =>
        creds?.status?.openstackValidationMessage || null,
      onSuccess: () => console.log("Openstack creds validated successfully"),
      onError: (error) => getErrorsUpdater("openstackCreds")(error),
      pollingInterval: 5000,
    })

    return () => stopPolling && stopPolling()
  }, [getErrorsUpdater, openstackCredsResource])

  // useEffect(() => {
  //   // if (
  //   //   !isNil(migrationTemplateObj) &&
  //   //   !isNilOrEmpty(migrationTemplateObj?.status)
  //   // ) {
  //   //   getUpdatedMigrationTemplate()
  //   // }
  //   if (isNilOrEmpty(migrationTemplateObj)) return
  //   getUpdatedMigrationTemplate()
  // }, [getUpdatedMigrationTemplate, migrationTemplateObj])

  // console.log("params", params)

  // const availableVmwareNetworks = useMemo(() => {
  //   if (params.vms === undefined) return []
  //   return uniq(flatten(params.vms.map((vm) => vm.networks || [])))
  // }, [params.vms])

  // const availableVmwareDatastores = useMemo(() => {
  //   if (params.vms === undefined) return []
  //   return uniq(flatten(params.vms.map((vm) => vm.datastores || [])))
  // }, [params.vms])

  const handleSubmit = () => {}

  console.log("params", params)
  console.log("openstack", openstackCredsResource)

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
          {/* <VmsSelectionStep
            vms={vmsDiscovered}
            onChange={getParamsUpdater}
            error={errors["vms"]}
          /> */}
          {/* Step 3 */}
          {/* <NetworkAndStorageMappingStep
            vmwareNetworks={availableVmwareNetworks}
            vmWareStorage={availableVmwareDatastores}
            openstackNetworks={
              migrationTemplateObj?.status?.openstack?.networks
            }
            openstackStorage={
              migrationTemplateObj?.status?.openstack?.volumeTypes
            }
            onChange={getParamsUpdater}
            networkMappingError={errors["networksMapping"]}
            storageMappingError={errors["storageMapping"]}
          /> */}
        </Box>
      </DrawerContent>
      <Footer submitButtonLabel={"Start Migration"} onClose={onClose} />
    </StyledDrawer>
  )
}
