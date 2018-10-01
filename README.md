# About

The goal of this project is to create a simple command-line application that, when given a Github user and repository, will download all the avatars of the users who have contributed to the project.

## Concepts
* Get HTML data using the node request module
* Integrate the Github API to access required information
* Pipe the data using fs to download all the images into the desired directory
* Appropriately name the avatar images

## Usage
* run `node download-avatars.js <username> <repo>` from the command line

## Problems Along the Way
* Requesting headers through a call to the GitHub API leads to a 403 Forbidden status message: our hits for the day have been reached. As such, we need to generate an access token to bypass this limit
 * generating an access token through GitHub and running the following cURL command gets us access to the API

 `curl -u <username>:<token> -I https://api.github.com/users/lighthouse-labs`

* Running `curl https://api.github.com/repos/jquery/jquery/contributors` outputs an object containing all the contributors to the jquery repo in JSON
* When adding an Authorization header to make requests to personal repositories or avoid rate limits, the key value needs to be phrased as `'Authorization': 'token <your token>'`
* Pitfall: when getting an API through request, the response is a JSON string, and needs to be JSON.parse() before it'll print as an actual object
* fs.createWriteStream can't make a directory itself. `use fs.existsSync(directory)` to see if a directory exists, followed by`fs.mkdirSync(directory)` to create the directory.
 * *_WARNING_*:   \*Sync functions should be avoided when possible, as they are blocking functions that keep anything else from happening while they run. For single-purpose scripts, like ours, this isn't serious, but they're expensive operations