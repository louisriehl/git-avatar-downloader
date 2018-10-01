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

  request(options, (err, res, body) => {
    var bodyObject = JSON.parse(body);
    var avatarURLS = [];
    for (var n = 0; n < bodyObject.length; n++) {
      avatarURLS.push(bodyObject[n]['avatar_url']);
    }
    cb (err, avatarURLS);
  });

}

getRepoContributors('jquery', 'jquery', (err, result) => {
  console.log("Error:", err);
  console.log("Result:", result);
});