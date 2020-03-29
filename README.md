# Get release javascript action

This action gets the release with the specified tag

## Inputs

### `tag_name`

**Not Required** The name of the person to greet. Default `"The name of the current release"`.

### Outputs

- `id`: The release ID
- `html_url`: The URL users can navigate to in order to view the release. i.e. `https://github.com/octocat/Hello-World/releases/v1.0.0`
- `upload_url`: The URL for uploading assets to the release, which could be used by GitHub Actions for additional uses, for example the [`@actions/upload-release-asset`](https://www.github.com/actions/upload-release-asset) GitHub Action

### Example workflow - get a release
On every `push` to a tag matching the pattern `v*`

```yaml
on:
  push:

name: Get Release

jobs:
  build:
    name: Get Release
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@master
      - name: Get Release
        id: get_release
        uses: PouuleT/get-release-action@master
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }} # This token is provided by Actions, you do not need to create your own token
        with:
          tag_name: ${{ github.ref }}
```

This will get the release with tag_name "latest", which could be handled by a third party service, or by GitHub Actions for additional uses, for example the [`@actions/upload-release-asset`](https://www.github.com/actions/upload-release-asset) GitHub Action. This uses the `GITHUB_TOKEN` provided by the [virtual environment](https://help.github.com/en/github/automating-your-workflow-with-github-actions/virtual-environments-for-github-actions#github_token-secret), so no new token is needed.
