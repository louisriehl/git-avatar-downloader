var request = require('request');

console.log('Welcome to the GitHub avatar downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var url = "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors";

  request(url, (err, res, body) => {
    cb(err, body);
  });

}

getRepoContributors('jquery', 'jquery', (err, result) => {
  console.log("Error:", err);
  console.log("Result:", result);
});