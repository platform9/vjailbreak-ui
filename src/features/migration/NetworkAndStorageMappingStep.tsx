import { FormControl, FormHelperText, styled } from "@mui/material"
import ResourceMapping from "../../components/forms/ResourceMapping"
import Step from "../../components/forms/Step"

const VmsSelectionStepContainer = styled("div")(({ theme }) => ({
  display: "grid",
  gridGap: theme.spacing(1),
}))

const FieldsContainer = styled("div")(({ theme }) => ({
  display: "grid",
  marginLeft: theme.spacing(6),
  gridGap: theme.spacing(2),
}))

export interface ResourceMap {
  source: string
  destination: string
}

interface NetworkAndStorageMappingStepProps {
  vmwareNetworks: string[]
  vmWareStorage: string[]
  openstackNetworks: string[]
  openstackStorage: string[]
  onChange: (key: string) => (value: ResourceMap[]) => void
  networkMappingError?: string
  storageMappingError?: string
}

export default function NetworkAndStorageMappingStep({
  vmwareNetworks = [],
  vmWareStorage = [],
  openstackNetworks = [],
  openstackStorage = [],
  onChange,
  networkMappingError,
  storageMappingError,
}: NetworkAndStorageMappingStepProps) {
  return (
    <VmsSelectionStepContainer>
      <Step stepNumber="3" label="Network and Storage Mapping" />
      <FieldsContainer>
        <FormControl error={!!networkMappingError}>
          <ResourceMapping
            label="Map Networks"
            sourceItems={vmwareNetworks}
            destinationItems={openstackNetworks}
            sourceLabel="VMware Network"
            destinationLabel="Openstack Network"
            onChange={(value) => onChange("networksMapping")(value)}
          />
          {networkMappingError && (
            <FormHelperText error>{networkMappingError}</FormHelperText>
          )}
        </FormControl>
        <FormControl error={!!storageMappingError}>
          <ResourceMapping
            label="Map Storage"
            sourceItems={vmWareStorage}
            destinationItems={openstackStorage}
            sourceLabel="VMWare Datastore"
            destinationLabel="OpenStack VolumeType"
            onChange={(value) => onChange("storageMapping")(value)}
          />
          {storageMappingError && (
            <FormHelperText error>{storageMappingError}</FormHelperText>
          )}
        </FormControl>
      </FieldsContainer>
    </VmsSelectionStepContainer>
  )
}
