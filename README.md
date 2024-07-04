# Changelog from GitHub Releases

[![GitHub Super-Linter](https://github.com/ricardoboss/changelog-from-github-releases/actions/workflows/linter.yml/badge.svg)](https://github.com/super-linter/super-linter)
![CI](https://github.com/ricardoboss/changelog-from-github-releases/actions/workflows/ci.yml/badge.svg)
[![Check dist/](https://github.com/ricardoboss/changelog-from-github-releases/actions/workflows/check-dist.yml/badge.svg)](https://github.com/ricardoboss/changelog-from-github-releases/actions/workflows/check-dist.yml)
[![CodeQL](https://github.com/ricardoboss/changelog-from-github-releases/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/ricardoboss/changelog-from-github-releases/actions/workflows/codeql-analysis.yml)
[![Coverage](./badges/coverage.svg)](./badges/coverage.svg)

## Usage

The simplest way to use this action looks like this:

```yaml
steps:
  - name: Checkout
    id: checkout
    uses: actions/checkout@v4

  - name: Generate CHANGELOG.md
    id: changelog
    uses: ricardoboss/changelog-from-github-releases@v1

  - name: Print CHANGELOG.md
    id: print-changelog
    run: cat CHANGELOG.md
```

The result will be a `CHANGELOG.md` file that looks like this:

```markdown
# [v2.0.0](https://github.com/example/repo/releases/2) (2024-01-02)

Second release

# [v1.0.0](https://github.com/example/repo/releases/1) (2024-01-01)

First release
```

## Inputs

### `file`

The file to write the changelog to. Defaults to `./CHANGELOG.md`.

### `repository`

The repository to get the releases from. Defaults to `${{ github.repository }}`.

### `token`

The GitHub token to use for authentication. Defaults to `${{ github.token }}`.

### `prerelease`

Whether to include pre-releases. Defaults to `false`.

## Outputs

In addition to these outputs, the action also generates the file determined by
the `file` input that contains the generated changelog.

### `changelog`

The generated changelog.

## Example using all inputs

```yaml
steps:
  - name: Checkout
    id: checkout
    uses: actions/checkout@v4

  - name: Generate CHANGELOG.md
    id: changelog
    uses: ricardoboss/changelog-from-github-releases@v1
    with:
      file: './path/to/CHANGELOG.md'
      repository: 'owner/repository'
      token: '${{ secrets.MY_PAT }}'
      prerelease: 'true'
```

## License

The code in this project is licensed under the [MIT License](./LICENSE).
