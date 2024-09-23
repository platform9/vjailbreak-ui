import { Box, Drawer, styled } from "@mui/material"
import { flatten, uniq } from "ramda"
import { useCallback, useEffect, useMemo, useState } from "react"
import {
  createMigrationTemplate,
  getMigrationTemplate,
} from "src/data/migration-templates/action"
import { MigrationTemplate, VmData } from "src/data/migration-templates/model"
import { createOpenstackCreds } from "src/data/openstack-creds/actions"
import { OpenstackCreds } from "src/data/openstack-creds/model"
import { createVmwareCreds } from "src/data/vmware-creds/actions"
import { VMwareCreds } from "src/data/vmware-creds/model"
import useParams from "src/hooks/useParams"
import { isNilOrEmpty } from "src/utils"
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
  const [vmWareCredsObj, setVmWareCredsObj] = useState<VMwareCreds>(
    {} as VMwareCreds
  )
  const [openstackCredsObj, setOpenstackCredsObj] = useState<OpenstackCreds>(
    {} as OpenstackCreds
  )
  const [migrationTemplateObj, setMigrationTemplateObj] =
    useState<MigrationTemplate>({} as MigrationTemplate)

  const [vmsDiscovered, setVmsDiscovered] = useState<VmData[]>([])

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
    if (!vmWareCredsValidated && !isNilOrEmpty(params.vmwareCreds)) {
      validateVmwareCreds(params.vmwareCreds)
    }
  }, [params.vmwareCreds, validateVmwareCreds, vmWareCredsValidated])

  const validateOpenstackCreds = useCallback(
    async (params) => {
      getErrorsUpdater("openstackCreds")("") // Clear previous errors
      const openstackCredsObj = await createOpenstackCreds(params)
      setOpenstackCredsObj(openstackCredsObj)
    },
    [getErrorsUpdater]
  )

  useEffect(() => {
    if (!openstackCredsValidated && !isNilOrEmpty(params.openstackCreds)) {
      validateOpenstackCreds(params.openstackCreds)
    }
  }, [openstackCredsValidated, params.openstackCreds, validateOpenstackCreds])

  const setUpMigrationTemplate = useCallback(async (params) => {
    const migrationTemplateObj = await createMigrationTemplate(params)
    setMigrationTemplateObj(migrationTemplateObj)
  }, [])

  useEffect(() => {
    if (
      vmWareCredsValidated &&
      openstackCredsValidated &&
      isNilOrEmpty(migrationTemplateObj)
    ) {
      setUpMigrationTemplate(params)
    }
  }, [
    migrationTemplateObj,
    openstackCredsValidated,
    params,
    setUpMigrationTemplate,
    vmWareCredsValidated,
  ])

  const getUpdatedMigrationTemplate = useCallback(async () => {
    console.log("getUpdatedMigrationTemplate")
    if (!isNilOrEmpty(migrationTemplateObj)) return
    // const updatedMigrationTemplate = await getMigrationTemplate({
    //   templateName: migrationTemplateObj.metadata.name,
    // })
    const updatedMigrationTemplate = await getMigrationTemplate({
      templateName: "migrationtemplate",
    })
    setMigrationTemplateObj(updatedMigrationTemplate)
    const vmsList = updatedMigrationTemplate?.status?.vmware
    setVmsDiscovered(vmsList)
  }, [migrationTemplateObj])

  useEffect(() => {
    getUpdatedMigrationTemplate()
    // let intervalId: NodeJS.Timeout | null = null

    // if (
    //   !isNil(migrationTemplateObj) &&
    //   isNilOrEmpty(migrationTemplateObj?.status)
    // ) {
    //   intervalId = setInterval(() => {
    //     getUpdatedMigrationTemplate()
    //   }, 10000) // 10 seconds
    // }

    // return () => {
    //   if (intervalId) {
    //     clearInterval(intervalId)
    //   }
    // }
  }, [migrationTemplateObj, getUpdatedMigrationTemplate])

  useEffect(() => {
    // if (
    //   !isNil(migrationTemplateObj) &&
    //   !isNilOrEmpty(migrationTemplateObj?.status)
    // ) {
    //   getUpdatedMigrationTemplate()
    // }
    if (isNilOrEmpty(migrationTemplateObj)) return
    getUpdatedMigrationTemplate()
  }, [getUpdatedMigrationTemplate, migrationTemplateObj])

  console.log("params", params)

  const availableVmwareNetworks = useMemo(() => {
    if (params.vms === undefined) return []
    return uniq(flatten(params.vms.map((vm) => vm.networks || [])))
  }, [params.vms])

  const availableVmwareDatastores = useMemo(() => {
    if (params.vms === undefined) return []
    return uniq(flatten(params.vms.map((vm) => vm.datastores || [])))
  }, [params.vms])

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
            vms={vmsDiscovered}
            onChange={getParamsUpdater}
            error={errors["vms"]}
          />
          {/* Step 3 */}
          <NetworkAndStorageMappingStep
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
          />
        </Box>
      </DrawerContent>
      <Footer submitButtonLabel={"Start Migration"} onClose={onClose} />
    </StyledDrawer>
  )
}
