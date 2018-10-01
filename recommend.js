require('dotenv').config();
var request = require('request');
var fs = require('fs');
// var chalk = require('chalk');
// var errorMessage = chalk.bold.red.bgYellow;
// var working = chalk.bold.inverse;

// set input and tokens
var args = process.argv.slice(2);
var owner = args[0];
var repository = args[1];
var myToken = 'token ' + process.env.AUTH_TOKEN;

function getContributors (repoOwner, repoName, cb) {

  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': myToken
    }
  };

  request(options, (err, res, body) => {
    var bodyObject = JSON.parse(body);
    var arrayOfStarredURLs = [];

    for (var n = 0; n < bodyObject.length; n++) {
      arrayOfStarredURLs.push(bodyObject[n]['starred_url'].replace(/({\/owner}{\/repo})/, ""));
    }
    console.log(arrayOfStarredURLs);
    cb(arrayOfStarredURLs);
  });
}

function getStarredRepos (repoArray) {
  var options = {
    url: repoArray[0],
    headers: {
      'User-Agent': 'request',
      'Authorization': myToken
    }
  };

  request(options, (err, res, body) => {
    console.log(body);
  });
}

function sortMostStarred (starred) {

}

function printArray (array) {
  console.log(array);
}

getContributors(owner, repository, getStarredRepos);
