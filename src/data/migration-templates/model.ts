export interface GetMigrationTemplatesList {
  apiVersion: string
  items: MigrationTemplate[]
  kind: string
  metadata: GetMigrationTemplatesListMetadata
}

export interface MigrationTemplate {
  apiVersion: string
  kind: string
  metadata: MigrationTemplateMetadata
  spec: MigrationTemplateSpec
}

export interface MigrationTemplateMetadata {
  annotations: Annotations
  creationTimestamp: Date
  generation: number
  managedFields: ManagedField[]
  name: string
  namespace: string
  resourceVersion: string
  uid: string
}

export interface Annotations {
  "kubectl.kubernetes.io/last-applied-configuration": string
}

export interface ManagedField {
  apiVersion: string
  fieldsType: string
  fieldsV1: FieldsV1
  manager: string
  operation: string
  time: Date
}

export interface FieldsV1 {
  "f:metadata": FMetadata
  "f:spec": FSpec
}

export interface FMetadata {
  "f:annotations": FAnnotations
}

export interface FAnnotations {
  ".": Empty
  "f:kubectl.kubernetes.io/last-applied-configuration": Empty
}

export type Empty = object

export interface FSpec {
  ".": Empty
  "f:destination": FDestination
  "f:networkMapping": Empty
  "f:source": FSource
  "f:storageMapping": Empty
}

export interface FDestination {
  ".": Empty
  "f:openstackRef": Empty
}

export interface FSource {
  ".": Empty
  "f:datacenter": Empty
  "f:vmwareRef": Empty
}

export interface MigrationTemplateSpec {
  destination: Destination
  networkMapping: string
  source: Source
  storageMapping: string
}

export interface Destination {
  openstackRef: string
}

export interface Source {
  datacenter: string
  vmwareRef: string
}

export interface GetMigrationTemplatesListMetadata {
  continue: string
  resourceVersion: string
}
