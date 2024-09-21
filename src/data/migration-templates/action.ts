import ApiClient from "src/api/ApiClient"
import { createMigrationTemplateJson } from "./helpers"
import { MigrationTemplate } from "./model"

const { vjailbreak } = ApiClient.getInstance()

export const createMigrationTemplate = async (
  params
): Promise<MigrationTemplate> => {
  const body = createMigrationTemplateJson(params)
  try {
    const data = await vjailbreak.createOpenstackCredentials(body)
    return data
  } catch (error) {
    console.error("Error creating MigrationTemplate", error)
    return {} as MigrationTemplate
  }
}
