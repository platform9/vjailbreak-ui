import { Box, Drawer, styled } from "@mui/material"
import { flatten, uniq } from "ramda"
import { useEffect, useMemo, useState } from "react"
import {
  createMigrationTemplate,
  getMigrationTemplate,
} from "src/data/migration-templates/action"
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
import { pollForStatus } from "../pollForStatus"
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
  vmwareCreds?: {
    vcenterHost: string
    datacenter: string
    username: string
    password: string
  }
  openstackCreds?: OpenstackCreds
  vms?: VmData[]
  networkMappings?: { source: string; destination: string }[]
  storageMappings?: { source: string; destination: string }[]
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
  const [validatingVmwareCreds, setValidatingVmwareCreds] = useState(false)
  const [validatingOpenstackCreds, setValidatingOpenstackCreds] =
    useState(false)

  // Migration JSON Objects
  const [vmWareCredsResource, setVmwareCredsResource] = useState<VMwareCreds>(
    {} as VMwareCreds
  )
  const [openstackCredsResource, setOpenstackCredsResource] =
    useState<OpenstackCreds>({} as OpenstackCreds)
  const [migrationTemplateResource, setMigrationTemplateResource] =
    useState<MigrationTemplate>({} as MigrationTemplate)

  useEffect(() => {
    if (isNilOrEmpty(params.vmwareCreds)) return

    // Function to create the VMwareCreds object
    const createVmwareCredsResource = async () => {
      setValidatingVmwareCreds(true)
      const response = await createVmwareCreds(params.vmwareCreds)
      setVmwareCredsResource(response)
    }

    // Reset the VMwareCreds object if the user changes the credentials
    setVmwareCredsResource({} as VMwareCreds)

    createVmwareCredsResource()
  }, [params.vmwareCreds])

  useEffect(() => {
    if (
      isNilOrEmpty(vmWareCredsResource) &&
      vmWareCredsResource?.status === undefined
    )
      return

    const stopPolling = pollForStatus({
      resource: vmWareCredsResource,
      getResourceFunc: getVmwareCreds,
      onUpdate: (resource) => {
        const status = resource?.status?.vmwareValidationStatus
        if (status === "Succeeded") {
          getErrorsUpdater("vmwareCreds")("")
          setVmwareCredsResource(resource)
          setValidatingVmwareCreds(false)
        } else if (!!status && status !== "Succeeded") {
          getErrorsUpdater("vmwareCreds")(
            resource.status?.vmwareValidationMessage
          )
          setValidatingVmwareCreds(false)
        }
      },
      stopPollingCond: (creds) =>
        creds?.status?.vmwareValidationStatus !== undefined,
      onSuccess: () => setValidatingVmwareCreds(false),
      onError: (error) => {
        getErrorsUpdater("vmwareCreds")(error)
        setValidatingVmwareCreds(false)
      },
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

    // Function to create the OpenstackCreds object
    const createOpenstackCredsResource = async () => {
      setValidatingOpenstackCreds(true)
      const response = await createOpenstackCreds(params.openstackCreds)
      setOpenstackCredsResource(response)
    }

    // Reset the OpenstackCreds object if the user changes the credentials
    setOpenstackCredsResource({} as OpenstackCreds)

    createOpenstackCredsResource()
  }, [params.openstackCreds])

  useEffect(() => {
    if (
      isNilOrEmpty(openstackCredsResource) &&
      openstackCredsResource?.status === undefined
    )
      return

    const stopPolling = pollForStatus({
      resource: openstackCredsResource,
      getResourceFunc: getOpenstackCreds,
      onUpdate: (resource) => {
        const status = resource?.status?.openstackValidationStatus
        if (status === "Succeeded") {
          getErrorsUpdater("openstackCreds")("")
          setOpenstackCredsResource(resource)
          setValidatingOpenstackCreds(false)
        } else if (!!status && status !== "Succeeded") {
          getErrorsUpdater("openstackCreds")(
            resource.status?.openstackValidationMessage
          )
          setValidatingOpenstackCreds(false)
        }
      },
      stopPollingCond: (creds) =>
        creds?.status?.openstackValidationStatus !== undefined,
      onSuccess: () => setValidatingOpenstackCreds(false),
      onError: (error) => {
        getErrorsUpdater("openstackCreds")(error)
        setValidatingOpenstackCreds(false)
      },
      pollingInterval: 5000,
    })

    return () => stopPolling && stopPolling()
  }, [getErrorsUpdater, openstackCredsResource])

  useEffect(() => {
    // Once the Openstack and VMware creds are validated, create the migration template
    if (
      vmWareCredsResource?.status?.vmwareValidationStatus !== "Succeeded" ||
      openstackCredsResource?.status?.openstackValidationStatus !==
        "Succeeded" ||
      !vmWareCredsResource?.metadata?.name ||
      !openstackCredsResource?.metadata?.name
    )
      return
    const createMigrationTemplateResource = async () => {
      const response = await createMigrationTemplate({
        name: params.vmwareCreds?.datacenter,
        vmwareRef: vmWareCredsResource.metadata.name,
        openstackRef: openstackCredsResource.metadata.name,
      })
      setMigrationTemplateResource(response)
    }
    createMigrationTemplateResource()
  }, [
    vmWareCredsResource?.metadata?.name,
    openstackCredsResource?.metadata?.name,
    vmWareCredsResource?.status?.vmwareValidationStatus,
    openstackCredsResource?.status?.openstackValidationStatus,
    params.vmwareCreds?.datacenter,
  ])

  useEffect(() => {
    if (
      migrationTemplateResource?.metadata?.name === undefined ||
      migrationTemplateResource?.status !== undefined
    )
      return

    const stopPolling = pollForStatus({
      resource: migrationTemplateResource,
      getResourceFunc: getMigrationTemplate,
      onUpdate: (resource) => {
        getErrorsUpdater("vms")("")
        setMigrationTemplateResource(resource)
      },
      stopPollingCond: (template) => template?.status !== undefined,
      onError: (error) => {
        getErrorsUpdater("vms")(error)
      },
      pollingInterval: 2000,
    })

    return () => stopPolling && stopPolling()
  }, [
    getErrorsUpdater,
    migrationTemplateResource,
    migrationTemplateResource?.metadata?.name,
    migrationTemplateResource?.status,
  ])

  const availableVmwareNetworks = useMemo(() => {
    if (params.vms === undefined) return []
    return uniq(flatten(params.vms.map((vm) => vm.networks || [])))
  }, [params.vms])

  const availableVmwareDatastores = useMemo(() => {
    if (params.vms === undefined) return []
    return uniq(flatten(params.vms.map((vm) => vm.datastores || [])))
  }, [params.vms])

  const handleSubmit = () => {}

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
            validatingVmwareCreds={validatingVmwareCreds}
            validatingOpenstackCreds={validatingOpenstackCreds}
            vmwareCredsValidated={
              vmWareCredsResource?.status?.vmwareValidationStatus ===
              "Succeeded"
            }
            openstackCredsValidated={
              openstackCredsResource?.status?.openstackValidationStatus ===
              "Succeeded"
            }
          />
          {/* Step 2 */}
          <VmsSelectionStep
            vms={migrationTemplateResource?.status?.vmware}
            onChange={getParamsUpdater}
            error={errors["vms"]}
            loadingVms={
              !isNilOrEmpty(migrationTemplateResource) &&
              migrationTemplateResource?.status === undefined &&
              !!errors["vms"]
            }
          />
          {/* Step 3 */}
          <NetworkAndStorageMappingStep
            vmwareNetworks={availableVmwareNetworks}
            vmWareStorage={availableVmwareDatastores}
            openstackNetworks={
              migrationTemplateResource?.status?.openstack?.networks
            }
            openstackStorage={
              migrationTemplateResource?.status?.openstack?.volumeTypes
            }
            params={params}
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
