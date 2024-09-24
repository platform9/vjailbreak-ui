export const getVmwareCredsList = () => ({
  apiVersion: "vjailbreak.k8s.pf9.io/v1alpha1",
  items: [
    {
      apiVersion: "vjailbreak.k8s.pf9.io/v1alpha1",
      kind: "VMwareCreds",
      metadata: {
        annotations: {
          "kubectl.kubernetes.io/last-applied-configuration":
            '{"apiVersion":"vjailbreak.k8s.pf9.io/v1alpha1","kind":"VMwareCreds","metadata":{"name":"badvmwarecreds","namespace":"migration-system"},"spec":{"VCENTER_HOST":"vcenter.phx.pnap.platform9.horse","VCENTER_INSECURE":true,"VCENTER_PASSWORD":"badcreds","VCENTER_USERNAME":"tanay@jumpcloud.com"},"status":{"vmwareValidationMessage":"Error validating VMwareCreds \'pnapbmc1\': failed to login: ServerFaultCode: Cannot complete login due to an incorrect user name or password.","vmwareValidationStatus":"Failed"}}\n',
        },
        creationTimestamp: "2024-09-23T18:06:37Z",
        generation: 1,
        managedFields: [
          {
            apiVersion: "vjailbreak.k8s.pf9.io/v1alpha1",
            fieldsType: "FieldsV1",
            fieldsV1: {
              "f:metadata": {
                "f:annotations": {
                  "f:kubectl.kubernetes.io/last-applied-configuration": {},
                },
              },
            },
            manager: "kubectl-last-applied",
            operation: "Apply",
          },
          {
            apiVersion: "vjailbreak.k8s.pf9.io/v1alpha1",
            fieldsType: "FieldsV1",
            fieldsV1: {
              "f:spec": {
                "f:VCENTER_HOST": {},
                "f:VCENTER_INSECURE": {},
                "f:VCENTER_PASSWORD": {},
                "f:VCENTER_USERNAME": {},
              },
            },
            manager: "kubectl",
            operation: "Apply",
            time: "2024-09-23T18:13:05Z",
          },
          {
            apiVersion: "vjailbreak.k8s.pf9.io/v1alpha1",
            fieldsType: "FieldsV1",
            fieldsV1: {
              "f:status": {
                ".": {},
                "f:vmwareValidationMessage": {},
                "f:vmwareValidationStatus": {},
              },
            },
            manager: "kubectl-edit",
            operation: "Update",
            subresource: "status",
            time: "2024-09-23T18:31:34Z",
          },
        ],
        name: "badvmwarecreds",
        namespace: "migration-system",
        resourceVersion: "1002136",
        uid: "707206a2-b8d4-4391-b259-51a2ea0bad9d",
      },
      spec: {
        VCENTER_HOST: "vcenter.phx.pnap.platform9.horse",
        VCENTER_INSECURE: true,
        VCENTER_PASSWORD: "badcreds",
        VCENTER_USERNAME: "tanay@jumpcloud.com",
      },
      status: {
        vmwareValidationMessage:
          "Error validating VMwareCreds 'pnapbmc1': failed to login: ServerFaultCode: Cannot complete login due to an incorrect user name or password.",
        vmwareValidationStatus: "Failed",
      },
    },
    {
      apiVersion: "vjailbreak.k8s.pf9.io/v1alpha1",
      kind: "VMwareCreds",
      metadata: {
        annotations: {
          "kubectl.kubernetes.io/last-applied-configuration":
            '{"apiVersion":"vjailbreak.k8s.pf9.io/v1alpha1","kind":"VMwareCreds","metadata":{"name":"goodvmwarecreds","namespace":"migration-system"},"spec":{"VCENTER_HOST":"vcenter.phx.pnap.platform9.horse","VCENTER_INSECURE":true,"VCENTER_PASSWORD":"Password456","VCENTER_USERNAME":"tanay@jumpcloud.com"},"status":{"vmwareValidationMessage":"Successfully authenticated to VMware","vmwareValidationStatus":"Succeeded"}}\n',
        },
        creationTimestamp: "2024-09-23T18:06:37Z",
        generation: 1,
        managedFields: [
          {
            apiVersion: "vjailbreak.k8s.pf9.io/v1alpha1",
            fieldsType: "FieldsV1",
            fieldsV1: {
              "f:metadata": {
                "f:annotations": {
                  "f:kubectl.kubernetes.io/last-applied-configuration": {},
                },
              },
            },
            manager: "kubectl-last-applied",
            operation: "Apply",
          },
          {
            apiVersion: "vjailbreak.k8s.pf9.io/v1alpha1",
            fieldsType: "FieldsV1",
            fieldsV1: {
              "f:spec": {
                "f:VCENTER_HOST": {},
                "f:VCENTER_INSECURE": {},
                "f:VCENTER_PASSWORD": {},
                "f:VCENTER_USERNAME": {},
              },
            },
            manager: "kubectl",
            operation: "Apply",
            time: "2024-09-23T18:13:05Z",
          },
          {
            apiVersion: "vjailbreak.k8s.pf9.io/v1alpha1",
            fieldsType: "FieldsV1",
            fieldsV1: {
              "f:status": {
                ".": {},
                "f:vmwareValidationMessage": {},
                "f:vmwareValidationStatus": {},
              },
            },
            manager: "kubectl-edit",
            operation: "Update",
            subresource: "status",
            time: "2024-09-23T18:31:14Z",
          },
        ],
        name: "goodvmwarecreds",
        namespace: "migration-system",
        resourceVersion: "1002077",
        uid: "e1424b7e-13a2-45e5-b76b-79c662d65e4c",
      },
      spec: {
        VCENTER_HOST: "vcenter.phx.pnap.platform9.horse",
        VCENTER_INSECURE: true,
        VCENTER_PASSWORD: "Password456",
        VCENTER_USERNAME: "tanay@jumpcloud.com",
      },
      status: {
        vmwareValidationMessage: "Successfully authenticated to VMware",
        vmwareValidationStatus: "Succeeded",
      },
    },
  ],
  kind: "VMwareCredsList",
  metadata: {
    continue: "",
    resourceVersion: "1071359",
  },
})

export const getVmwareCred = (good = true) => {
  const allCreds = getVmwareCredsList()?.items
  return good ? allCreds[1] : allCreds[0]
}

export const getOpenstackCredsList = () => ({
  apiVersion: "vjailbreak.k8s.pf9.io/v1alpha1",
  items: [
    {
      apiVersion: "vjailbreak.k8s.pf9.io/v1alpha1",
      kind: "OpenstackCreds",
      metadata: {
        annotations: {
          "kubectl.kubernetes.io/last-applied-configuration":
            '{"apiVersion":"vjailbreak.k8s.pf9.io/v1alpha1","kind":"OpenstackCreds","metadata":{"name":"badopenstackcreds","namespace":"migration-system"},"spec":{"OS_AUTH_URL":"https://sa-pmo-cspmo.platform9.horse/keystone/v3","OS_DOMAIN_NAME":"Default","OS_PASSWORD":"badcreds","OS_REGION_NAME":"cspmo","OS_TENANT_NAME":"service","OS_USERNAME":"tanay@platform9.com"},"status":{"openstackValidationMessage":"Error validating OpenstackCreds \'sapmo1\'","openstackValidationStatus":"Failed"}}\n',
        },
        creationTimestamp: "2024-09-23T18:06:37Z",
        generation: 1,
        managedFields: [
          {
            apiVersion: "vjailbreak.k8s.pf9.io/v1alpha1",
            fieldsType: "FieldsV1",
            fieldsV1: {
              "f:metadata": {
                "f:annotations": {
                  "f:kubectl.kubernetes.io/last-applied-configuration": {},
                },
              },
            },
            manager: "kubectl-last-applied",
            operation: "Apply",
          },
          {
            apiVersion: "vjailbreak.k8s.pf9.io/v1alpha1",
            fieldsType: "FieldsV1",
            fieldsV1: {
              "f:spec": {
                "f:OS_AUTH_URL": {},
                "f:OS_DOMAIN_NAME": {},
                "f:OS_PASSWORD": {},
                "f:OS_REGION_NAME": {},
                "f:OS_TENANT_NAME": {},
                "f:OS_USERNAME": {},
              },
            },
            manager: "kubectl",
            operation: "Apply",
            time: "2024-09-23T18:13:05Z",
          },
          {
            apiVersion: "vjailbreak.k8s.pf9.io/v1alpha1",
            fieldsType: "FieldsV1",
            fieldsV1: {
              "f:status": {
                ".": {},
                "f:openstackValidationMessage": {},
                "f:openstackValidationStatus": {},
              },
            },
            manager: "kubectl-edit",
            operation: "Update",
            subresource: "status",
            time: "2024-09-23T18:31:02Z",
          },
        ],
        name: "badopenstackcreds",
        namespace: "migration-system",
        resourceVersion: "1002039",
        uid: "8781cd70-6bf8-46c6-922e-bcace532fb6d",
      },
      spec: {
        OS_AUTH_URL: "https://sa-pmo-cspmo.platform9.horse/keystone/v3",
        OS_DOMAIN_NAME: "Default",
        OS_PASSWORD: "badcreds",
        OS_REGION_NAME: "cspmo",
        OS_TENANT_NAME: "service",
        OS_USERNAME: "tanay@platform9.com",
      },
      status: {
        openstackValidationMessage: "Error validating OpenstackCreds 'sapmo1'",
        openstackValidationStatus: "Failed",
      },
    },
    {
      apiVersion: "vjailbreak.k8s.pf9.io/v1alpha1",
      kind: "OpenstackCreds",
      metadata: {
        annotations: {
          "kubectl.kubernetes.io/last-applied-configuration":
            '{"apiVersion":"vjailbreak.k8s.pf9.io/v1alpha1","kind":"OpenstackCreds","metadata":{"name":"goodopenstackcreds","namespace":"migration-system"},"spec":{"OS_AUTH_URL":"https://sa-pmo-cspmo.platform9.horse/keystone/v3","OS_DOMAIN_NAME":"Default","OS_PASSWORD":"Password123","OS_REGION_NAME":"cspmo","OS_TENANT_NAME":"service","OS_USERNAME":"tanay@platform9.com"},"status":{"openstackValidationMessage":"Successfully authenticated to Openstack","openstackValidationStatus":"Succeeded"}}\n',
        },
        creationTimestamp: "2024-09-23T18:06:37Z",
        generation: 1,
        managedFields: [
          {
            apiVersion: "vjailbreak.k8s.pf9.io/v1alpha1",
            fieldsType: "FieldsV1",
            fieldsV1: {
              "f:metadata": {
                "f:annotations": {
                  "f:kubectl.kubernetes.io/last-applied-configuration": {},
                },
              },
            },
            manager: "kubectl-last-applied",
            operation: "Apply",
          },
          {
            apiVersion: "vjailbreak.k8s.pf9.io/v1alpha1",
            fieldsType: "FieldsV1",
            fieldsV1: {
              "f:spec": {
                "f:OS_AUTH_URL": {},
                "f:OS_DOMAIN_NAME": {},
                "f:OS_PASSWORD": {},
                "f:OS_REGION_NAME": {},
                "f:OS_TENANT_NAME": {},
                "f:OS_USERNAME": {},
              },
            },
            manager: "kubectl",
            operation: "Apply",
            time: "2024-09-23T18:13:04Z",
          },
          {
            apiVersion: "vjailbreak.k8s.pf9.io/v1alpha1",
            fieldsType: "FieldsV1",
            fieldsV1: {
              "f:status": {
                ".": {},
                "f:openstackValidationMessage": {},
                "f:openstackValidationStatus": {},
              },
            },
            manager: "kubectl-edit",
            operation: "Update",
            subresource: "status",
            time: "2024-09-23T18:30:46Z",
          },
        ],
        name: "goodopenstackcreds",
        namespace: "migration-system",
        resourceVersion: "1001987",
        uid: "83fabcfb-8664-4154-8ad8-9ce6405b9fc9",
      },
      spec: {
        OS_AUTH_URL: "https://sa-pmo-cspmo.platform9.horse/keystone/v3",
        OS_DOMAIN_NAME: "Default",
        OS_PASSWORD: "Password123",
        OS_REGION_NAME: "cspmo",
        OS_TENANT_NAME: "service",
        OS_USERNAME: "tanay@platform9.com",
      },
      status: {
        openstackValidationMessage: "Successfully authenticated to Openstack",
        openstackValidationStatus: "Succeeded",
      },
    },
  ],
  kind: "OpenstackCredsList",
  metadata: {
    continue: "",
    resourceVersion: "1084297",
  },
})

export const getOpenstackCred = (good = true) => {
  const allCreds = getOpenstackCredsList()?.items
  return good ? allCreds[1] : allCreds[0]
}
