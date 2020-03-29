
const core = require('@actions/core');
const { GitHub, context } = require('@actions/github');

async function run() {
  try {
    // Get authenticated GitHub client (Ocktokit): https://github.com/actions/toolkit/tree/master/packages/github#usage
    const github = new GitHub(process.env.GITHUB_TOKEN);

    // Get owner and repo from context of payload that triggered the action
    const { owner, repo } = context.repo;

    // Get the inputs from the workflow file: https://github.com/actions/toolkit/tree/master/packages/core#inputsoutputs
    var tagName = core.getInput('tag_name', { required: true });
    if (!tagName) {
      // Default value will be the context ref
      tagName = context.ref
    }
    const tag = tagName.replace('refs/tags/', '');

    // Get the release from its tag name
    // API Documentation: https://developer.github.com/v3/repos/releases/#get-a-release-by-tag-name
    // Octokit Documentation: https://octokit.github.io/rest.js/v16#repos-get-release-by-tag
    const getReleaseReponse = await octokit.repos.getReleaseByTag({
      owner,
      repo,
      tag,
    });

    // Get the ID, html_url, and upload URL for the created Release from the response
    const {
      data: { id: releaseId, html_url: htmlUrl, upload_url: uploadUrl }
    } = getReleaseResponse;

    // Set the output variables for use by other actions: https://github.com/actions/toolkit/tree/master/packages/core#inputsoutputs
    core.setOutput('id', releaseId);
    core.setOutput('html_url', htmlUrl);
    core.setOutput('upload_url', uploadUrl);
  } catch (error) {
    core.setFailed(error.message);
  }
}

module.exports = run;
