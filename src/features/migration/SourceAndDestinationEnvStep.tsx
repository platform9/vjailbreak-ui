import { Visibility, VisibilityOff } from "@mui/icons-material"
import {
  Box,
  FormControl,
  FormLabel,
  IconButton,
  InputAdornment,
  styled,
  Typography,
} from "@mui/material"
import { useCallback, useEffect, useState } from "react"
import { debounce } from "src/utils"
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
  params: { [key: string]: unknown }
  onChange: (id: string) => (value: unknown) => void
  errors: { [fieldId: string]: string }
}

export default function SourceAndDestinationEnvStep({
  params,
  onChange,
  errors,
}: SourceAndDestinationEnvStepProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [vmwareCreds, setVmwareCreds] = useState({
    datacenter: "",
    username: "",
    password: "",
  })

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  const handleVmwareCredsChange = (value) => {
    setVmwareCreds({ ...vmwareCreds, ...value })
  }

  const handleOpenstackCredsChange = (values) => {
    onChange("openstackCreds")(values)
  }

  const debouncedOnChange = useCallback(
    debounce((creds) => {
      onChange("vmwareCreds")(creds) // Pass the validated creds to the parent component
    }, 1000 * 5), // Debounce for 5 seconds
    [onChange]
  )

  useEffect(() => {
    // Only call debouncedOnChange when all required fields are filled out
    if (
      vmwareCreds.datacenter &&
      vmwareCreds.username &&
      vmwareCreds.password
    ) {
      console.log("All fields are filled, calling debounced onChange")
      debouncedOnChange(vmwareCreds)
    }

    // Cleanup debounced function on unmount or when creds change
    return () => {
      debouncedOnChange.cancel() // Ensure debounce is cleared
    }
  }, [vmwareCreds, debouncedOnChange])

  return (
    <SourceAndDestinationStepContainer>
      <Step stepNumber="1" label="Source and Destination Environments" />
      <FieldsContainer>
        <FormControl fullWidth error={!!errors["vmwareCreds"]} required>
          <Box
            sx={{
              display: "grid",
            }}
          >
            <Typography variant="body1">Source VMWare</Typography>
            <TextField
              id="datacenter"
              label="vCenter Server"
              variant="outlined"
              value={params["vcenter-server"]}
              onChange={(e) =>
                handleVmwareCredsChange({ datacenter: e.target.value })
              }
              error={!!errors.sourceEnv}
              required
            />
            <Fields>
              <TextField
                id="username"
                label="Username"
                variant="outlined"
                value={params["username"]}
                onChange={(e) =>
                  handleVmwareCredsChange({ username: e.target.value })
                }
                error={!!errors.sourceEnv}
                fullWidth
                required
              />
              <TextField
                label="Password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
                onChange={(e) =>
                  handleVmwareCredsChange({ password: e.target.value })
                }
                fullWidth
                required
              />
            </Fields>
          </Box>
          {!!errors["vmwareCreds"] && (
            <FormLabel error sx={{ mb: 1 }}>
              {errors["vmwareCreds"]}
            </FormLabel>
          )}
        </FormControl>
      </FieldsContainer>
      <FieldsContainer>
        <Typography variant="body1">Destination Platform</Typography>
        <OpenstackRCFileUpload onChange={handleOpenstackCredsChange} />
      </FieldsContainer>
    </SourceAndDestinationStepContainer>
  )
}
