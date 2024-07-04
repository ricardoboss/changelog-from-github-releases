import * as core from '@actions/core'
import { Release } from './models/release.ts'
import { Octokit } from 'octokit'

/**
 * Fetch the releases from a GitHub repository.
 * @param repository The repository to get the releases from.
 * @param token The GitHub token to use for authentication.
 * @returns {Promise<Release[]>} Resolves with the releases from the repository.
 */
export async function fetchReleases(
  repository: string,
  token: string
): Promise<Release[]> {
  const octokit = new Octokit({
    auth: token,
  })

  core.debug(`Fetching releases from repository: ${repository}`)

  const response = await octokit.rest.repos.listReleases({
    owner: repository.split('/')[0],
    repo: repository.split('/')[1],
  })

  return response.data as Release[];
}
