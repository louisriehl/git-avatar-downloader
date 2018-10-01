var request = require('request');
var authToken = require('./secrets');
var myToken = 'token ' + authToken.GITHUB_TOKEN;

console.log('Welcome to the GitHub avatar downloader!');

function getRepoContributors(repoOwner, repoName, cb) {

  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': myToken
    }
  };

  console.log(options.headers['Authorization']);

  request(options, (err, res, body) => {
    cb(err, body);
  });

}

getRepoContributors('jquery', 'jquery', (err, result) => {
  console.log("Error:", err);
  console.log("Result:", result);
});