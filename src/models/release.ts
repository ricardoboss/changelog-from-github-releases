/**
 * A (subset of a) GitHub Release.
 */
export interface Release {
  html_url: string
  name: string
  body: string
  draft: boolean
  prerelease: boolean
  published_at: string
}
