import { Box, styled, Typography } from "@mui/material"
import OpenstackRCFileUpload from "../../components/forms/OpenstackRCFileUpload"
import Step from "../../components/forms/Step"
import TextField from "../../components/forms/TextField"

const SourceAndDestinationStepContainer = styled("div")(({ theme }) => ({
  display: "grid",
  gridGap: theme.spacing(1),
}))

const FieldsContainer = styled("div")(({ theme }) => ({
  display: "grid",
  marginLeft: theme.spacing(6),
}))

const Fields = styled("div")(() => ({
  display: "grid",
  gridAutoFlow: "column",
}))

interface SourceAndDestinationEnvStepProps {
  values: { [key: string]: unknown }
  onChange: (id: string) => (value: unknown) => void
  errors: { [key: string]: string }
}

export default function SourceAndDestinationEnvStep({
  values,
  onChange,
  errors,
}: SourceAndDestinationEnvStepProps) {
  console.log("SourceAndDestinationEnvStep")
  return (
    <SourceAndDestinationStepContainer>
      <Step stepNumber="1" label="Source and Destination Environments" />
      <FieldsContainer>
        <Box
          sx={{
            display: "grid",
          }}
        >
          <Typography variant="body1">Source VMWare</Typography>
          <TextField
            id="vCenterLocation"
            label="vCenter Server"
            variant="outlined"
            value={values["vcenter-server"]}
            onChange={(e) => onChange(e.target.value)}
            error={!!errors.sourceEnv}
            required
          />
          <Fields>
            <TextField
              id="username"
              label="Username"
              variant="outlined"
              value={values["username"]}
              onChange={(e) => onChange(e.target.value)}
              error={!!errors.sourceEnv}
              fullWidth
              required
            />
            <TextField
              id="password"
              label="Password"
              variant="outlined"
              value={values["password"]}
              onChange={(e) => onChange(e.target.value)}
              error={!!errors.sourceEnv}
              fullWidth
              required
            />
          </Fields>
        </Box>
      </FieldsContainer>
      <FieldsContainer>
        <Typography variant="body1">Destination Platform</Typography>
        <OpenstackRCFileUpload
          onChange={(values) => onChange("openstackCreds")(values)}
        />
      </FieldsContainer>
    </SourceAndDestinationStepContainer>
  )
}
