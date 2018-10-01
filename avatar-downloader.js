require('dotenv').config();
var request = require('request');
var fs = require('fs');
var chalk = require('chalk');
var errorMessage = chalk.bold.red.bgYellow;
var working = chalk.bold.inverse;




// Take command line input
var args = process.argv.slice(2);
if(args.length !== 2 && args.length !== 0){
  console.log(errorMessage('Incorrect number of arguments! Provide repository owner and name!'));
  process.exit();
}

var owner = args[0];
var repository = args[1];

if(!owner || !repository) {
  console.log(errorMessage('No arguments given! Provide repository owner and name!'));
  process.exit();
}

if(!fs.existsSync('./.env')) {
  console.log(errorMessage('.env file does not exist to read AUTH_TOKEN!'));
  process.exit();
}
if(!process.env.AUTH_TOKEN)
{
  console.log(errorMessage('AUTH_TOKEN in .env is null!'));
  process.exit();
}

var myToken = 'token ' + process.env.AUTH_TOKEN;

console.log(working('Welcome to the GitHub avatar downloader!'));

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

  console.log(working('Getting avatars...'));
  // Now we can make a request, taking our options and a function that returns the error, response, and body of our request
  request(options, (err, res, body) => {

    // The returned body is in a JSON string, we need to parse it to read it as an object
    var bodyObject = JSON.parse(body);
    var avatarURLS = [];
    if (bodyObject.message)
    {
      if (bodyObject.message == "Not Found") {
        console.log(errorMessage('Non-existant user or repository!'));
      } else if (bodyObject.message == "Bad credentials") {
        console.log(errorMessage('Invalid authorization token!'));
      }
      process.exit();
    }

    // Push each of the avatar URLs from the object into an object containing the name and avatar url
    for (var n = 0; n < bodyObject.length; n++) {
      var avatarObject = {
        'name': bodyObject[n]['login'],
        'avatar': bodyObject[n]['avatar_url']
      };
      avatarURLS.push(avatarObject);
    }
    // invoke callback function with our error (if we have one), and give it the array of avatar URLs
    console.log(working('Downloading avatars...'));
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
  })
  .pipe(fs.createWriteStream( filePath + '.jpeg' ));
}

getRepoContributors(owner, repository, (err, result) => {
  if(err) {
    console.log(errorMessage("Error:", err));
  }
  if(!fs.existsSync('./avatars/'))
  {
    fs.mkdirSync('./avatars');
  }
  for(var n = 0; n < result.length; n++) {
    var myPath = 'avatars/' + result[n]['name'];
    var myAvatar = result[n]['avatar'];
    downloadImageByURL(myAvatar, myPath);
  }
});