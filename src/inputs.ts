import * as core from '@actions/core'

/**
 * Get the file path to write the CHANGELOG.md to.
 * @returns {string} The file path to write the CHANGELOG.md to.
 * @example './CHANGELOG.md'
 */
export function file(): string {
  return core.getInput('file')
}

/**
 * Get the repository to get the releases from.
 * @returns {string} The repository to get the releases from.
 * @example 'owner/repo'
 */
export function repository(): string {
  return core.getInput('repository')
}

/**
 * Get the GitHub token to use for authentication.
 * @returns {string} The GitHub token to use for authentication.
 */
export function token(): string {
  return core.getInput('token')
}
