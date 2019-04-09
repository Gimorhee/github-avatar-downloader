var request = require('request');
var secret = require('./secrets.js');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'Bearer ' + secret['GITHUB_TOKEN']
    }
  };

  request(options, function(err, res, body) {
    cb(err,JSON.parse(body));
  });
}

function downloadImageByURL(url, filePath) {

}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});

