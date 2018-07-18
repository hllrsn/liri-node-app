require("dotenv").config();

var keys = require("./keys.js");
var request = require("request");
var fs = require("fs");

var twitter = require("twitter");
var Spotify = require("node-spotify-api");

var liriHello = process.argv[2];

//empty variable for user input
var input = process.argv[3];

// var spotify = new Spotify(keys.spotify);
// var client = new Twitter(keys.twitter);


// * `my-tweets`

// * `spotify-this-song`

// * `movie-this`

// * `do-what-it-says`


//Possible commands and instructions for the user
switch(liriHello) {
    case "my-tweets": myTweets(); break;
    case "spotify-this-song": spotifyThisSong(); break;
    case "movie-this": movieThis(); break;
    case "do-what-it-says": doThing(); break;
    
    default: console.log("\r\n" + "Type one of the following commands after 'node liri.js' : " + "\r\n" +
        "1. my-tweets" + "\r\n" +
        "2. spotify-this-song 'insert any song name' " + "\r\n" +
        "3. movie-this 'insert any movie name' " + "\r\n" +
        "4. do-what-it-says" + "\r\n" +
        "Be sure to put the movie or song name in quotation marks if it's more than one word.");
};


//Twitter function
function myTweets() {
    var client = new twitter(keys.twitter);
    var params = {screen_name: 'KippyTweets'} && {count: 20};

    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {

            console.log("---------------------------------------------------");
            console.log("Recent Tweets: ");

            for (var i = 0; i < tweets.length; i++) {

                console.log("---------------------------------------------------");
                console.log("Tweeted on: " + tweets[i].created_at);
                console.log(tweets[i].text);
            }
        }
    });
}


//Spotify function
function spotifyThisSong() {
    var spotify = new Spotify(keys.spotify);

    if (input != false) {
        
        spotify.search ({
            type: 'track',
            query: input + '&limit=1&'
        }, 

        function(error, data) {
            if (error) {
                console.log("Error occurred: " + error);
                return;
            }
            
            console.log("---------------------------------------------------");
            console.log(" ");
            console.log("The song you entered was " + input + ".");
            console.log(" ");
            console.log("Here is the infromation you requested: ");
            console.log(" ");
            console.log("Track Title: " + data.tracks.items[0].name);
            console.log(" ");
            console.log("Artist Name: " + data.tracks.items[0].artists[0].name);
            console.log(" ");
            console.log("Album Name: " + data.tracks.items[0].album.name);
            console.log(" ");
            console.log("Preview URL: " + data.tracks.items[0].preview_url);
            console.log(" ");
            console.log("---------------------------------------------------");
        });

    } else {

        {spotify.search ({
            type: 'track',
            query: 'ace+of+base+sign' + '&limit=1&'
        },

        function(error, data) {
            if (error) {
                console.log("Error occurred: " + error);
                return;
            }

                console.log("---------------------------------------------------");
                console.log(" ");
                console.log("Since you didnt enter a song, take a look at this one: ");
                console.log(" ");
                console.log("Track Title: " + data.tracks.items[0].name);
                console.log(" ");
                console.log("Artist Name: " + data.tracks.items[0].artists[0].name);
                console.log(" ");
                console.log("Album Name: " + data.tracks.items[0].album.name);
                console.log(" ");
                console.log("Preview URL: " + data.tracks.items[0].preview_url);
                console.log(" ");
                console.log("---------------------------------------------------");
            });
        }
    }
}


//OMDB function
function movieThis() {
    request('http://www.omdbapi.com/?t=' + input + '&y=&plot=short&tomatoes=true&r=json&apikey=trilogy', function(error, response, body) {

    if (input != false) {

        console.log("---------------------------------------------------");
        console.log("Title: " + JSON.parse(body).Title);
        console.log("");
        console.log("This movie was released in: " + JSON.parse(body).Year);
        console.log("");
        console.log("Rating: " + JSON.parse(body).imdbRating);
        console.log("");
        console.log("Rotten Tomatoes Rating: " + JSON.parse(body).tomatoRating);
        console.log("");
        console.log("This movie was produced in: " + JSON.parse(body).Country);
        console.log("");
        console.log("This movie's language is in: " + JSON.parse(body).Language);
        console.log("");
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("");
        console.log("Actors: " + JSON.parse(body).Actors);
        console.log("");

        } else {

            request('http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&tomatoes=true&r=json', function(error, response, body) {

                console.log("---------------------------------------------------");
                console.log("Title: " + JSON.parse(body).Title);
                console.log("");
                console.log("This movie was released in: " + JSON.parse(body).Year);
                console.log("");
                console.log("Rating: " + JSON.parse(body).imdbRating);
                console.log("");
                console.log("Rotten Tomatoes Rating: " + JSON.parse(body).tomatoRating);
                console.log("");
                console.log("This movie was produced in: " + JSON.parse(body).Country);
                console.log("");
                console.log("This movie's language is in: " + JSON.parse(body).Language);
                console.log("");
                console.log("Plot: " + JSON.parse(body).Plot);
                console.log("");
                console.log("Actors: " + JSON.parse(body).Actors);
                console.log("");
            });
        }
    });
}


//Do What It Says function
function doThing() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        
        if (!error) {
            doThingResults = data.split(",");
            spotifyThisSong(doThingResults[0], doThingResults[1]);
        
        } else {
            console.log("Error occurred: " + error);
        }
    });
};
