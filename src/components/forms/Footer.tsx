import LoadingButton from "@mui/lab/LoadingButton"
import { Button, styled } from "@mui/material"

interface FooterProps {
  cancelButtonLabel?: string
  submitButtonLabel?: string
  onClose: () => void
  onSubmit: () => void
  disableSubmit?: boolean
  submitting?: boolean
}

const StyledFooter = styled("div")(({ theme }) => ({
  display: "flex",
  justifyItems: "end",
  justifyContent: "end",
  gap: theme.spacing(2),
  // marginTop: "auto",
  padding: theme.spacing(2),
  borderTop: "1px solid #CDD0D4",
}))

export default function Footer({
  cancelButtonLabel = "Cancel",
  submitButtonLabel = "Submit",
  onClose,
  onSubmit,
  submitting = false,
  disableSubmit = false,
}: FooterProps) {
  return (
    <StyledFooter>
      <Button
        type="button"
        variant="outlined"
        color="secondary"
        onClick={onClose}
      >
        {cancelButtonLabel}
      </Button>
      <LoadingButton
        loading={submitting}
        loadingPosition="start"
        type="submit"
        variant="contained"
        color="primary"
        disabled={disableSubmit || submitting}
        onClick={onSubmit}
      >
        {submitting ? "Submitting" : submitButtonLabel}
      </LoadingButton>
    </StyledFooter>
  )
}
