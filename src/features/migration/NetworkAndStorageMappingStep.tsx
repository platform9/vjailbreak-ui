import { styled } from "@mui/material"
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

interface NetworkAndStorageMappingStepProps {
  values: { [key: string]: string }
  onChange: (value: string) => void
  errors: { [key: string]: string }
}

export default function NetworkAndStorageMappingStep({
  values,
  onChange,
  errors,
}: NetworkAndStorageMappingStepProps) {
  return (
    <VmsSelectionStepContainer>
      <Step stepNumber="3" label="Network and Storage Mapping" />
      <FieldsContainer>
        <ResourceMapping
          label="Map Networks"
          sourceItems={[
            "VMWare Network 1",
            "VMWare Network 2",
            "VMWare Network 3",
          ]}
          destinationItems={["OpenStack Network A", "OpenStack Network B"]}
          sourceLabel="VMware Network"
          destinationLabel="Openstack Network"
        />
        <ResourceMapping
          label="Map Storage"
          sourceItems={["Source Storage 1", "Source Storage 2"]}
          destinationItems={["Destination Storage A", "Destination Storage B"]}
          sourceLabel="VMWare Datastore"
          destinationLabel="OpenStack VolumeType"
        />
      </FieldsContainer>
    </VmsSelectionStepContainer>
  )
}
