var request = require('request');

console.log('Welcome to the GitHub avatar downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  // ...
}

getRepoContributors('jquery', 'jquery', (err, result) => {
  console.log("Error:", err);
  console.log("Result:", result);
});