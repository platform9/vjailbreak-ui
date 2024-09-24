interface PollForStatusParams {
  resource: any
  getResourceFunc: (name: string) => Promise<any>
  setResource: (res: any) => void
  stopPollingCond: (resource: any) => boolean
  errorChecker?: (resource: any) => string | null
  onSuccess?: () => void
  onError?: (error: string) => void
  pollingInterval?: number
}

export const pollForStatus = ({
  resource,
  getResourceFunc,
  setResource,
  stopPollingCond,
  errorChecker,
  onSuccess,
  onError,
  pollingInterval = 5000, // Default polling interval to 5 seconds
}: PollForStatusParams) => {
  if (!resource?.metadata?.name || stopPollingCond(resource)) return

  const intervalId = setInterval(async () => {
    console.log("Polling for resource status", resource.metadata.name)
    const updatedResource = await getResourceFunc(resource.metadata.name)
    setResource(updatedResource)

    // Check for error using the optional errorChecker
    if (errorChecker) {
      const errorMessage = errorChecker(updatedResource)
      if (errorMessage && onError) {
        onError(errorMessage)
      }
    }

    // If statusChecker indicates success, stop polling
    if (stopPollingCond(updatedResource)) {
      console.log("Polling stopped")
      clearInterval(intervalId)
      if (onSuccess) onSuccess() // Optional callback on success
    }
  }, pollingInterval)

  // Cleanup function
  return () => clearInterval(intervalId)
}
