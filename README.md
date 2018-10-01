# About

The goal of this project is to create a simple command-line application that, when given a Github user and repository, will download all the avatars of the users who have contributed to the project.

## Concepts
* Get HTML data using the node request module
* Integrate the Github API to access required information
* Pipe the data using fs to download all the images into the desired directory
* Appropriately name the avatar images

## Problems Along the Way
* Requesting headers through a call to the GitHub API leads to a 403 Forbidden status message: our hits for the day have been reached. As such, we need to generate an access token to bypass this limit
 * generating an access token through GitHub and running the following cURL command gets us access to the API

 `curl -u <username>:<token> -I https://api.github.com/users/lighthouse-labs`