import * as core from '@actions/core'
import { Release } from './models/release'

/**
 * Generate a changelog from GitHub Releases.
 * @param releases The GitHub Releases to generate the changelog from.
 * @returns {string} The changelog.
 */
export function generateChangelog(releases: Release[]): string {
  core.debug(`Generating changelog from ${releases.length} releases`)

  return releases
    .map(release => generateChangelogFromRelease(release))
    .join('\n')
}

/**
 * Generate a changelog from a single GitHub Release.
 * @param release The GitHub Release to generate the changelog from.
 * @returns {Promise<string>} Resolves with the changelog.
 */
function generateChangelogFromRelease(release: Release): string {
  return `
# [${release.name}](${release.html_url}) (${release.published_at})

${release.body}
`
}
