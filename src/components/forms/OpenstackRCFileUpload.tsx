import { Button, styled, TextField } from "@mui/material"
import { parse } from "dotenv"
import React, { useState } from "react"

const FileUploadFieldContainer = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr auto",
  alignItems: "center",
  gap: theme.spacing(2),
  marginTop: theme.spacing(2),
}))

interface OpenstackRCFileUploaderProps {
  onChange: (values: unknown) => void
}

export default function OpenstackRCFileUploader({
  onChange,
}: OpenstackRCFileUploaderProps) {
  const [fileName, setFileName] = useState<string>("")

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setFileName(file.name)
      parseRCFile(file)
    }
  }

  const parseRCFile = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const content = e.target?.result as string
      const parsedFields = parseFields(content)
      onChange(parsedFields)
    }
    reader.readAsText(file)
  }

  const parseFields = (content: string) => {
    // Remove 'export' from each line before parsing with dotenv
    const cleanedContent = content.replace(/^export\s+/gm, "")
    return parse(cleanedContent)
  }

  return (
    <FileUploadFieldContainer>
      <TextField
        label="OpenStack RC File"
        value={fileName}
        variant="outlined"
        component="label"
        color="primary"
        aria-readonly
        sx={{ flex: 1 }}
        size="small"
        required
      />
      <Button variant="contained" component="label" color="primary">
        Choose File
        <input type="file" accept=".sh" hidden onChange={handleFileChange} />
      </Button>
    </FileUploadFieldContainer>
  )
}
