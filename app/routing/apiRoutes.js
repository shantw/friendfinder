
var friends = require("../data/friends");

// ===============================================================================
// ROUTING
// ===============================================================================
module.exports = function(app) {
  // API GET Requests

  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  // API POST Requests

  app.post("/api/friends", function(req, res) {

    var goodMatch = {
      name: "",
      photo: "",
      friendDiff: Infinity
    };
    // parse the result of the user"s survey POST.
    var userData = req.body;
    var userScores = userData.scores;
    // This variable will calculate the difference between the user"s scores and the scores of
    // each user in the database
    var totDifference;
    
    // loop through all the friend possibilities in the database.
    for (var i = 0; i < friends.length; i++) {
      var curFriend = friends[i];
      totDifference = 0;
      console.log(curFriend.name);

      for (var j = 0; j < curFriend.scores.length; j++) {
        var curFriendScore = curFriend.scores[j];
        var currentUserScore = userScores[j];

        // calculate the difference between the scores 
        totDifference += Math.abs(parseInt(currentUserScore) - parseInt(curFriendScore));
      }
      // If the sum of differences is less then the differences of the current "best match"
      if (totalDifference <= goodMatch.friendDifference) {
      
        goodMatch.name = curFriend.name;
        goodMatch.photo = curFriend.photo;
        goodMatch.friendDifference = totDifference;
      }
    }
    // Finally save the user's data to the database (this has to happen AFTER the check. otherwise,
    // the database will always return that the user is the user's best friend).
    friends.push(userData);

    res.json(goodMatch);
  });

};