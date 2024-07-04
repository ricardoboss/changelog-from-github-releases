/**
 * A (subset of a) GitHub Release.
 */
export interface Release {
  id: number
  url: string
  html_url: string
  tag_name: string
  name: string
  body: string
  draft: boolean
  prerelease: boolean
  published_at: string
}
