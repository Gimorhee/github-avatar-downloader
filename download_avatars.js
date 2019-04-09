var request = require('request');
var secret = require('./secrets.js');
var fs = require('fs');
var args = process.argv;
var repoOnwer = args[2];
var repoName = args[3];

console.log(repoOnwer);
console.log(repoName);

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'Bearer ' + secret['GITHUB_TOKEN']
    }
  };

  request(options, function(err, res, body) {
    cb(err, JSON.parse(body));
  });
}


function downloadImageByURL(url, filePath) {
  request.get(url)
       .on('error', function(err){
         console.log(err);
       })
       .on('response', function (response) {
         console.log('Response Status Code: ', response.statusCode);
       })
       .on('end',function (response) {
        console.log('ended here');
       })
       .pipe(fs.createWriteStream(filePath));
}

getRepoContributors(repoOnwer, repoName, function(err, result) {
  // console.log("Errors:", err);
  // console.log("Result:", result);
  result.forEach(function(element) {
    //console.log(element.avatar_url);
    var filePath = "./avatar/" + element.id + ".jpg";
    //console.log(filePath);
    downloadImageByURL(element.avatar_url, filePath);
  });
});

// downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg")

