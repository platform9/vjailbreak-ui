interface Resource {
  metadata: {
    name: string
  }
}

interface PollForStatusParams<T extends Resource> {
  resource: T
  getResourceFunc: (name: string) => Promise<T>
  onUpdate: (resource: T) => void // Called every time the resource is fetched
  stopPollingCond: (resource: T) => boolean
  onSuccess?: (resource: T) => void
  pollingInterval?: number
}

export const pollForStatus = <T extends Resource>({
  resource,
  getResourceFunc,
  onUpdate,
  stopPollingCond,
  onSuccess,
  pollingInterval = 5000, // Default polling interval to 5 seconds
}: PollForStatusParams<T>) => {
  if (!resource?.metadata?.name || stopPollingCond(resource)) return

  const intervalId = setInterval(async () => {
    console.log("Polling for resource status", resource.metadata.name)
    const updatedResource = await getResourceFunc(resource.metadata.name)
    onUpdate(updatedResource)

    // If statusChecker indicates success, stop polling
    if (stopPollingCond(updatedResource)) {
      console.log("Polling stopped")
      clearInterval(intervalId)
      if (onSuccess) onSuccess(updatedResource) // Optional callback on success
    }
  }, pollingInterval)

  // Cleanup function
  return () => clearInterval(intervalId)
}
