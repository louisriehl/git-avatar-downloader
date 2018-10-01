var request = require('request');
var fs = require('fs');
var authToken = require('./secrets');
var myToken = 'token ' + authToken.GITHUB_TOKEN;

console.log('Welcome to the GitHub avatar downloader!');

function getRepoContributors(repoOwner, repoName, cb) {

  // First we generate our options object, containing the URL and the headers required to authenticate a get request with
  // Github's API.
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': myToken
    }
  };

  // Now we can make a request, taking our options and a function that returns the error, response, and body of our request
  request(options, (err, res, body) => {

    // The returned body is in a JSON string, we need to parse it to read it as an object
    var bodyObject = JSON.parse(body);
    var avatarURLS = [];

    // Push each of the avatar URLs from the object into an object containing the name and avatar url
    for (var n = 0; n < bodyObject.length; n++) {
      var avatarObject = {
        'name': bodyObject[n]['login'],
        'avatar': bodyObject[n]['avatar_url']
      };
      avatarURLS.push(avatarObject);
    }
    // launch callback function with our error (if we have one), and give it the array of avatar URLs
    cb (err, avatarURLS);
  });

}

function downloadImageByURL(url, filePath) {

  // Request our URL and start chaining commands to check for errors, see if we get an image, and pipe it to fs and
  // download the image to our filePath
  request.get(url)
  .on('error', err => {
    throw err;
  })
  .on('response', response => {
    console.log('Status code:', response.statusMessage);
    console.log('Content type: ', response.headers['content-type']);
  });
  // .pipe(fs.createWriteStream( filePath ));
}

getRepoContributors('jquery', 'jquery', (err, result) => {
  console.log("Error:", err);
  // console.log("Result:", result);

  for(var n = 0; n < result.length; n++) {
    var myPath = 'avatars/' + result[n]['name'];
    var myAvatar = result[n]['avatar'];
    downloadImageByURL(myAvatar, myPath);
  }
});

// downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg");