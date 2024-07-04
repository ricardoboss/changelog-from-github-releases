import * as core from '@actions/core'
import * as inputs from './inputs'
import { fetchReleases } from './release_fetcher'
import { generateChangelog } from './changelog_generator'
import * as fs from 'node:fs'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const file: string = inputs.file()
    const repository: string = inputs.repository()
    const token: string = inputs.token()

    core.debug(`Writing to file: ${file}`)
    core.debug(`Repository: ${repository}`)

    const releases = await fetchReleases(repository, token)
    const changelog = await generateChangelog(releases)

    fs.writeFileSync(file, changelog)
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
