import * as core from '@actions/core'
import { Release } from './models/release.ts'

/**
 * Generate a changelog from GitHub Releases.
 * @param releases The GitHub Releases to generate the CHANGELOG.md from.
 * @returns {Promise<string>} Resolves with the changelog.
 */
export async function generateChangelog(releases: Release[]): Promise<string> {
  core.debug(`Generating changelog from ${releases.length} releases`)

  return releases
    .map(async release => await generateChangelogFromRelease(release))
    .join('\n')
}

/**
 * Generate a changelog from a single GitHub Release.
 * @param release The GitHub Release to generate the changelog from.
 * @returns {Promise<string>} Resolves with the changelog.
 */
async function generateChangelogFromRelease(release: Release): Promise<string> {
  return `
## [${release.name}](${release.html_url}) (${release.published_at})

${release.body}
`
}
