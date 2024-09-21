import { v4 as uuidv4 } from "uuid"

export const createVmwareCredsJson = (params) => {
  const { name, dataCenter, username, password } = params || {}
  return {
    apiVersion: "vjailbreak.k8s.pf9.io/v1alpha1",
    kind: "VMwareCreds",
    metadata: {
      name: name || uuidv4(),
    },
    spec: {
      VCENTER_HOST: dataCenter,
      VCENTER_INSECURE: true,
      VCENTER_PASSWORD: password,
      VCENTER_USERNAME: username,
    },
  }
}
