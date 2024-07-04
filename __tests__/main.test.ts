/**
 * Unit tests for the action's main functionality, src/main.ts
 *
 * These should be run as if the action was called from a workflow.
 * Specifically, the inputs listed in `action.yml` should be set as environment
 * variables following the pattern `INPUT_<INPUT_NAME>`.
 */

import * as core from '@actions/core'
import * as main from '../src/main'
import { expect } from '@jest/globals'
import * as release_fetcher from '../src/release_fetcher'
import { Release } from '../src/models/release'

// Mock the action's main function
const runMock = jest.spyOn(main, 'run')

// Mock the GitHub Actions core library
let debugMock: jest.SpiedFunction<typeof core.debug>
let setOutput: jest.SpiedFunction<typeof core.setOutput>
let setFailed: jest.SpiedFunction<typeof core.setFailed>
let getInputMock: jest.SpiedFunction<typeof core.getInput>
let fetchReleasesMock: jest.SpiedFunction<typeof release_fetcher.fetchReleases>

describe('action', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    debugMock = jest.spyOn(core, 'debug').mockImplementation()
    setOutput = jest.spyOn(core, 'setOutput').mockImplementation()
    setFailed = jest.spyOn(core, 'setFailed').mockImplementation()
    getInputMock = jest.spyOn(core, 'getInput').mockImplementation()
    fetchReleasesMock = jest
      .spyOn(release_fetcher, 'fetchReleases')
      .mockImplementation()
  })

  it('generates a changelog', async () => {
    getInputMock.mockImplementation(name => {
      switch (name) {
        case 'file':
          return 'CHANGELOG.test.md'
        case 'repository':
          return 'example/repo'
        case 'token':
          return 'token'
        case 'prerelease':
          return 'false'
        default:
          return ''
      }
    })

    fetchReleasesMock.mockResolvedValue([
      {
        html_url: 'https://github.com/example/repo/releases/1',
        name: 'v1.0.0',
        body: 'First release',
        draft: false,
        prerelease: false,
        published_at: '2024-01-01T00:00:00Z'
      }
    ] as Release[])

    await main.run()
    expect(runMock).toHaveReturned()

    expect(debugMock).toHaveBeenNthCalledWith(1, 'File: CHANGELOG.test.md')
    expect(debugMock).toHaveBeenNthCalledWith(2, 'Repository: example/repo')
    expect(debugMock).toHaveBeenNthCalledWith(3, 'Include pre-releases: false')
    expect(fetchReleasesMock).toHaveBeenCalledWith('example/repo', 'token')
    expect(setOutput).toHaveBeenNthCalledWith(
      1,
      'changelog',
      `
# [v1.0.0](https://github.com/example/repo/releases/1) (2024-01-01)

First release
`
    )
    expect(setFailed).not.toHaveBeenCalled()
  })
})
