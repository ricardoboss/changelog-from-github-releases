import * as core from '@actions/core'
import { Release } from './models/release'

/**
 * Generate a changelog from GitHub Releases.
 * @param releases The GitHub Releases to generate the changelog from.
 * @param includePreReleases Whether to include pre-releases.
 * @returns {string} The changelog.
 */
export function generateChangelog(
  releases: Release[],
  includePreReleases: boolean
): string {
  core.info(`Generating changelog from ${releases.length} releases...`)

  return releases
    .filter(release => includePreReleases || !release.prerelease)
    .filter(release => !release.draft)
    .map(release => generateChangelogFromRelease(release))
    .join('\n')
}

/**
 * Generate a changelog from a single GitHub Release.
 * @param release The GitHub Release to generate the changelog from.
 * @returns {Promise<string>} Resolves with the changelog.
 */
function generateChangelogFromRelease(release: Release): string {
  const date = new Date(release.published_at)
  const dateString = `${date.getUTCFullYear()}-${(date.getUTCMonth() + 1).toString().padStart(2, '0')}-${date.getUTCDate().toString().padStart(2, '0')}`

  return `
# [${release.name}](${release.html_url}) (${dateString})

${release.body}
`
}
